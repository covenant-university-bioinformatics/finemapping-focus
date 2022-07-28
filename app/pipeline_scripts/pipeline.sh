#!/usr/bin/env bash

##./script.sh UK_focus.0.05_rs.txt output2 37:EUR eur 2 False 0.5 0.1 false 3 1e-3 0.9 0.7 0.5 true none 10583 1892607
#  At a minimum, FOCUS requires CHR, SNP, BP, A1 (effect allele), A2, BETA (or OR), and P to produce a munged GWAS data file.
#  CHR, SNP, BP, A1 (effect allele), A2, BETA/OR, and P
set -x;
binary_dir='/local/datasets/fmapping';
db_dir='/local/datasets/fmapping';

gwas_summary=$1;
outdir=$2;
locations=$3;   ## {'37:EUR', '37:AFR', '37:EAS', '37:EUR-AFR', '37:EUR-EAS', '37:EAS-AFR', '37:EUR-EAS-AFR', or '38:'-prefix}
population=$4        # {AFR, AMR, SAS, EAS, EUR } all lowercase
population=${population,,} ## to ensure all are in lowercase
chr=$5               ## {1-22}
all_gwas_sig=$6      ## {defaut False; True, False} ## case sensitive
p_threshold=$7        ## {default=5e-8}
ridge_term=$8         ##  {default=0.1, type=float}
intercept=$9          ## {true, false; default=false,}
max_genes=${10}       ## {default=3} 
prior_prob=${11}      ##  {default gencode38 ; gencode38, gencode37 or numeric 1e-3}
credible_level=${12}  ## {default=0.9}
min_r2pred=${13}      ## {type=float, default=0.7}
max_impute=${14}      ## {type=float, default=0.5}
options=" --locations ${locations} \
--chr ${chr} --all-gwas-sig ${all_gwas_sig} \
--p-threshold ${p_threshold} \
--ridge-term ${ridge_term} \
--max-genes ${max_genes} \
--prior-prob ${prior_prob} \
--credible-level ${credible_level} \
--min-r2pred  ${min_r2pred} \
--max-impute  ${max_impute}  " ;

optional=' ';
### optinal

if [[ ${intercept} = 'true' ]]; then
optional=" ${optional}  --intercept "
fi
plot=${15}   ## {true false}
if [[ ${plot} = 'true' ]]; then
optional=" ${optional}  --plot "
fi
tissue=${16} ## default none

if [[ ("$tissue" -ne "none" )]]; then
optional=" ${optional}  --tissue ${tissue} "
fi

start=${17}  ## default none
stop=${18}   ## default none 
#if [[ (-n "$start") && (-n "$stop") ]]; then
if [[ ("$start" -ne "none" ) &&  ("$stop" -ne "none") ]]; then
optional="${optional} --chr ${chr} --start ${start} --stop ${stop} "
fi


## Manhattan plot

Rscript --vanilla ${binary_dir}/plot_qq_manhattan.R ${gwas_summary} ${outdir}

## step 1
##--frq freq --snp rsid --N-col n
##cloumns: CHR, SNP, BP, A1, A2, BETA/OR, FRQ 
focus munge ${gwas_summary} --output ${outdir}/GWAS.cleaned 
## step 2

focus finemap ${outdir}/GWAS.cleaned.sumstats.gz  ${db_dir}/g1000_${population}/g1000_${population} ${db_dir}/weights/focus.db ${options} ${optional} --output ${outdir}/finemapping

### generate empty file in case no results
if [[ -f ${outdir}/finemapping.focus.tsv ]]; then
 echo " Results is generated";
  else
    touch ${outdir}/finemapping.focus.tsv
fi    


### How to Run
## ---> focus finemap {Options} gwas_summary plinkref weights
# options:
#
# 1-locations LOCATIONS {7:EUR', '37:AFR', '37:EAS', '37:EUR-AFR', '37:EUR-EAS', '37:EAS-AFR', '37:EUR-EAS-AFR', or '38:'-prefix}
# 2. trait TRAIT         Trait name for fine-mapping.
# 3.chr CHR             Perform imputation for specific chromosome.
# 4 start START         Perform imputation starting at specific location (in base pairs). Accepts kb/mb modifiers. Requires --chr to be specified.
# 5.stop STOP           Perform imputation until at specific location (in base pairs). Accepts kb/mb modifiers. Requires --chr to be specified.
# 6 all-gwas-sig ALL_GWAS_SIG {defaut false; true, false} Boolean indicator for whether fine-mapping regions that contains GWAS signal for all population; False means GWAS signal for at least one population.
# 7 tissue TISSUE       Name of tissue for tissue-prioritized fine-mapping. Relaxed matching. E.g., 'adipose' matches 'Adipose_subcutaneous'.
# 8 p-threshold {default=5e-8}  Minimum GWAS p-value required to perform TWAS fine-mapping.
# 9- ridge-term RIDGE_TERM {default=0.1, type=float}  Diagonal adjustment for linkage-disequilibrium (LD) estimate.
# 10- intercept  {true, false; default=False,}          Whether to include an intercept term in the model.
# 11- max-genes {default=3} MAX_GENES Maximum number of genes that can be causal.
# 12- prior-prob PRIOR_PROB {default=1e-3, also can be gencode38 or gencode37}
#                         Type names of prior probability for a gene to be causal. 'gencode37': use one over the number of all genes in the region based on gencode v37 (to
#                         use your own file, specify the path instead). 'gencode38': use one over the number of all genes in the region based on gencode v38. 'numeric': use
#                         a numeric number as fixed probability, just directly specify it e.g. 1e-3.
#13 credible-level  {default=0.9 } Probability value to determine the credible gene set.
#11 min-r2pred {type=float, default=0.7} Minimum average LD-based imputation accuracy allowed for expression weight SNP Z-scores.
#14 max-impute {type=float, default=0.5} Maximum fraction of SNPs allowed to be missing per gene, and will be imputed using LD.
#15 -p, --plot            Generate fine-mapping plots.#   --verbose             Verbose logging. Includes debug info.
#16 -o OUTPUT, --output OUTPUT                          Prefix for output data.
