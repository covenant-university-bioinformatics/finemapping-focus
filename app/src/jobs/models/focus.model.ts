import * as mongoose from 'mongoose';

export enum TrueFalseOptions {
  TRUE = 'true',
  FALSE = 'false',
}

export enum LocationsType {
  EUR37 = '37:EUR',
  AFR37 = '37:AFR',
  EAS37 = '37:EAS',
  EURAFR37 = '37:EUR-AFR',
  EUREAS37 = '37:EUR-EAS',
  EASAFR37 = '37:EAS-AFR',
  EUREASAFR37 = '37:EUR-EAS-AFR',
  EUR38 = '38:EUR',
  AFR38 = '38:AFR',
  EAS38 = '38:EAS',
  EURAFR38 = '38:EUR-EAS',
  EUREASAFR38 = '38:EUR-EAS-AFR',
}

export enum Populations {
  AFR = 'afr',
  AMR = 'amr',
  EUR = 'eur',
  EAS = 'eas',
  SAS = 'sas',
}

export enum Chromosomes {
  CHR1 = '1',
  CHR2 = '2',
  CHR3 = '3',
  CHR4 = '4',
  CHR5 = '5',
  CHR6 = '6',
  CHR7 = '7',
  CHR8 = '8',
  CHR9 = '9',
  CHR10 = '10',
  CHR11 = '11',
  CHR12 = '12',
  CHR13 = '13',
  CHR14 = '14',
  CHR15 = '15',
  CHR16 = '16',
  CHR17 = '17',
  CHR18 = '18',
  CHR19 = '19',
  CHR20 = '20',
  CHR21 = '21',
  CHR22 = '22',
}

export enum TISSUEOptions {
  NONE = 'none',
  Adipose_Subcutaneous = 'Adipose_Subcutaneous',
  Adipose_Visceral_Omentum = 'Adipose_Visceral_Omentum',
  Adrenal_Gland = 'Adrenal_Gland',
  Artery_Aorta = 'Artery_Aorta',
  Artery_Coronary = 'Artery_Coronary',
  Artery_Tibial = 'Artery_Tibial',
  Brain_Amygdala = 'Brain_Amygdala',
  Brain_Anterior_cingulate_cortex_BA24 = 'Brain_Anterior_cingulate_cortex_BA24',
  Brain_Caudate_basal_ganglia = 'Brain_Caudate_basal_ganglia',
  Brain_Cerebellar_Hemisphere = 'Brain_Cerebellar_Hemisphere',
  Brain_Cerebellum = 'Brain_Cerebellum',
  Brain_Cortex = 'Brain_Cortex',
  Brain_Frontal_Cortex_BA9 = 'Brain_Frontal_Cortex_BA9',
  Brain_Hippocampus = 'Brain_Hippocampus',
  Brain_Hypothalamus = 'Brain_Hypothalamus',
  Brain_Nucleus_accumbens_basal_ganglia = 'Brain_Nucleus_accumbens_basal_ganglia',
  Brain_Putamen_basal_ganglia = 'Brain_Putamen_basal_ganglia',
  Brain_Spinal_cord_cervical_c_1 = 'Brain_Spinal_cord_cervical_c-1',
  Brain_Substantia_nigra = 'Brain_Substantia_nigra',
  Breast_Mammary_Tissue = 'Breast_Mammary_Tissue',
  Cells_Cultured_fibroblasts = 'Cells_Cultured_fibroblasts',
  Cells_EBV_transformed_lymphocytes = 'Cells_EBV_transformed_lymphocytes',
  Colon_Sigmoid = 'Colon_Sigmoid',
  Colon_Transverse = 'Colon_Transverse',
  Esophagus_Gastroesophageal_Junction = 'Esophagus_Gastroesophageal_Junction',
  Esophagus_Mucosa = 'Esophagus_Mucosa',
  Esophagus_Muscularis = 'Esophagus_Muscularis',
  Heart_Atrial_Appendage = 'Heart_Atrial_Appendage',
  Heart_Left_Ventricle = 'Heart_Left_Ventricle',
  Kidney_Cortex = 'Kidney_Cortex',
  Liver = 'Liver',
  Lung = 'Lung',
  Minor_Salivary_Gland = 'Minor_Salivary_Gland',
  Muscle_Skeletal = 'Muscle_Skeletal',
  Nerve_Tibial = 'Nerve_Tibial',
  Ovary = 'Ovary',
  Pancreas = 'Pancreas',
  Pituitary = 'Pituitary',
  Prostate = 'Prostate',
  Skin_Not_Sun_Exposed_Suprapubic = 'Skin_Not_Sun_Exposed_Suprapubic',
  Skin_Sun_Exposed_Lower_leg = 'Skin_Sun_Exposed_Lower_leg',
  Small_Intestine_Terminal_Ileum = 'Small_Intestine_Terminal_Ileum',
  Spleen = 'Spleen',
  Stomach = 'Stomach',
  Testis = 'Testis',
  Thyroid = 'Thyroid',
  Uterus = 'Uterus',
  Vagina = 'Vagina',
  Whole_Blood = 'Whole_Blood',
}

export enum PriorProbType {
  GENECODE38 = 'genecode38',
  GENECODE37 = 'genecode37',
  NUMERIC = 0.001,
}

//Interface that describe the properties that are required to create a new job
interface FocusAttrs {
  job: string;
  useTest: string;
  marker_name: string;
  chr: string;
  position: string;
  effect_allele: string;
  alternate_allele: string;
  freq: string;
  beta: string;
  se: string;
  p_value: string;
  sample_size: string;
  locations: LocationsType;
  population: Populations;
  chromosome: Chromosomes;
  all_gwas_sig: TrueFalseOptions;
  p_threshold: string;
  ridge_term: string;
  intercept: TrueFalseOptions;
  max_genes: string;
  prior_prob: string;
  credible_level: string;
  min_r2pred: string;
  max_impute: string;
  plot: TrueFalseOptions;
  tissue: TISSUEOptions;
  start: string;
  stop: string;
}

// An interface that describes the extra properties that a eqtl model has
//collection level methods
interface FocusModel extends mongoose.Model<FocusDoc> {
  build(attrs: FocusAttrs): FocusDoc;
}

//An interface that describes a properties that a document has
export interface FocusDoc extends mongoose.Document {
  id: string;
  version: number;
  useTest: boolean;
  marker_name: number;
  chr: number;
  position: number;
  effect_allele: number;
  alternate_allele: number;
  freq: number;
  beta: number;
  se: number;
  p_value: number;
  sample_size: number;
  locations: LocationsType;
  population: Populations;
  chromosome: Chromosomes;
  all_gwas_sig: TrueFalseOptions;
  p_threshold: number;
  ridge_term: number;
  intercept: TrueFalseOptions;
  max_genes: number;
  prior_prob: string;
  credible_level: number;
  min_r2pred: number;
  max_impute: number;
  plot: TrueFalseOptions;
  tissue: TISSUEOptions;
  start: string;
  stop: string;
}

const FocusSchema = new mongoose.Schema<FocusDoc, FocusModel>(
  {
    useTest: {
      type: Boolean,
      trim: true,
    },
    marker_name: {
      type: Number,
      trim: true,
    },
    chr: {
      type: Number,
      trim: true,
    },
    position: {
      type: Number,
      trim: true,
    },
    effect_allele: {
      type: Number,
      trim: true,
    },
    alternate_allele: {
      type: Number,
      trim: true,
    },
    freq: {
      type: Number,
      trim: true,
    },
    beta: {
      type: Number,
      trim: true,
    },
    se: {
      type: Number,
      trim: true,
    },
    p_value: {
      type: Number,
      trim: true,
    },
    sample_size: {
      type: Number,
      trim: true,
    },
    locations: {
      type: String,
      enum: [...Object.values(LocationsType)],
      trim: true,
    },
    population: {
      type: String,
      enum: [
        Populations.EAS,
        Populations.EUR,
        Populations.AMR,
        Populations.AFR,
        Populations.SAS,
      ],
      trim: true,
    },
    chromosome: {
      type: String,
      enum: [...Object.values(Chromosomes)],
      trim: true,
    },
    all_gwas_sig: {
      type: String,
      enum: [TrueFalseOptions.TRUE, TrueFalseOptions.FALSE],
      trim: true,
      default: TrueFalseOptions.FALSE,
    },
    p_threshold: {
      type: Number,
      trim: true,
    },
    ridge_term: {
      type: Number,
      trim: true,
    },
    intercept: {
      type: String,
      enum: [TrueFalseOptions.TRUE, TrueFalseOptions.FALSE],
      trim: true,
      default: TrueFalseOptions.FALSE,
    },
    max_genes: {
      type: Number,
      trim: true,
    },
    prior_prob: {
      type: String,
      trim: true,
      default: PriorProbType.GENECODE38,
    },
    credible_level: {
      type: Number,
      trim: true,
    },
    min_r2pred: {
      type: Number,
      trim: true,
    },
    max_impute: {
      type: Number,
      trim: true,
    },
    plot: {
      type: String,
      enum: [TrueFalseOptions.TRUE, TrueFalseOptions.FALSE],
      trim: true,
      default: TrueFalseOptions.FALSE,
    },
    tissue: {
      type: String,
      enum: [...Object.values(TISSUEOptions)],
      trim: true,
    },
    start: {
      type: String,
      trim: true,
    },
    stop: {
      type: String,
      trim: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FocusJob',
      required: true,
    },
    version: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        // delete ret._id;
        // delete ret.__v;
      },
    },
  },
);

//increments version when document updates
FocusSchema.set('versionKey', 'version');

//collection level methods
FocusSchema.statics.build = (attrs: FocusAttrs) => {
  return new FocusModel(attrs);
};

//create mongoose model
const FocusModel = mongoose.model<FocusDoc, FocusModel>(
  'Focus',
  FocusSchema,
  'focus',
);

export { FocusModel };
