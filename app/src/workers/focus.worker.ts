import { SandboxedJob } from 'bullmq';
import * as fs from 'fs';
import { FocusJobsModel, JobStatus } from '../jobs/models/focus.jobs.model';
import { FocusDoc, FocusModel } from '../jobs/models/focus.model';
import appConfig from '../config/app.config';
import { spawnSync } from 'child_process';
import connectDB, { closeDB } from '../mongoose';
import {
  deleteFileorFolder,
  fileOrPathExists,
  writeFocusFile,
} from '@cubrepgwas/pgwascommon';

function sleep(ms) {
  console.log('sleeping');
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getJobParameters(parameters: FocusDoc) {
  return [
    String(parameters.locations),
    String(parameters.population),
    String(parameters.chromosome),
    capitalizeFirstLetter(String(parameters.all_gwas_sig)),
    String(parameters.p_threshold),
    String(parameters.ridge_term),
    String(parameters.intercept),
    String(parameters.max_genes),
    String(parameters.prior_prob),
    String(parameters.credible_level),
    String(parameters.min_r2pred),
    String(parameters.max_impute),
    String(parameters.plot),
    String(parameters.tissue),
    String(parameters.start),
    String(parameters.stop),
  ];
}

export default async (job: SandboxedJob) => {
  //executed for each job
  console.log(
    'Worker ' +
      ' processing job ' +
      JSON.stringify(job.data.jobId) +
      ' Job name: ' +
      JSON.stringify(job.data.jobName),
  );

  await connectDB();
  await sleep(2000);

  //fetch job parameters from database
  const parameters = await FocusModel.findOne({
    job: job.data.jobId,
  }).exec();

  const jobParams = await FocusJobsModel.findById(job.data.jobId).exec();

  //create input file and folder
  let filename;

  //extract file name
  const name = jobParams.inputFile.split(/(\\|\/)/g).pop();

  if (parameters.useTest === false) {
    filename = `/pv/analysis/${jobParams.jobUID}/input/${name}`;
  } else {
    filename = `/pv/analysis/${jobParams.jobUID}/input/test.txt`;
  }

  //write the exact columns needed by the analysis
  writeFocusFile(jobParams.inputFile, filename, {
    marker_name: parameters.marker_name - 1,
    chr: parameters.chr - 1,
    pos: parameters.position - 1,
    effect_allele: parameters.effect_allele - 1,
    alternate_allele: parameters.alternate_allele - 1,
    freq: parameters.freq - 1,
    beta: parameters.beta - 1,
    se: parameters.se - 1,
    p: parameters.p_value - 1,
    n: parameters.sample_size - 1,
  });

  if (parameters.useTest === false) {
    deleteFileorFolder(jobParams.inputFile).then(() => {
      // console.log('deleted');
    });
  }

  //assemble job parameters
  const pathToInputFile = filename;
  const pathToOutputDir = `/pv/analysis/${job.data.jobUID}/${appConfig.appName}/output`;
  const jobParameters = getJobParameters(parameters);
  jobParameters.unshift(pathToInputFile, pathToOutputDir);

  console.log(jobParameters);
  //make output directory
  fs.mkdirSync(pathToOutputDir, { recursive: true });

  // save in mongo database
  await FocusJobsModel.findByIdAndUpdate(
    job.data.jobId,
    {
      status: JobStatus.RUNNING,
      inputFile: filename,
    },
    { new: true },
  );

  await sleep(3000);
  //spawn process
  const jobSpawn = spawnSync(
    // './pipeline_scripts/pascal.sh &>/dev/null',
    './pipeline_scripts/pipeline.sh',
    jobParameters,
    { maxBuffer: 1024 * 1024 * 1024 },
  );

  console.log('Spawn command log');
  console.log(jobSpawn?.stdout?.toString());
  console.log('=====================================');
  console.log('Spawn error log');
  const error_msg = jobSpawn?.stderr?.toString();
  console.log(error_msg);

  const resultsFile = await fileOrPathExists(
    `${pathToOutputDir}/finemapping.focus.tsv`,
  );
  const manhattanPlot = await fileOrPathExists(
    `${pathToOutputDir}/manhattan.png`,
  );
  const qqPlot = await fileOrPathExists(`${pathToOutputDir}/qq.png`);

  //close database connection
  closeDB();

  if (resultsFile && manhattanPlot && qqPlot) {
    return true;
  } else {
    throw new Error(error_msg || 'Job failed to successfully complete');
  }

  return true;
};
