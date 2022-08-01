import {
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBooleanString,
} from 'class-validator';
import {
  Chromosomes,
  LocationsType,
  Populations,
  TISSUEOptions,
  TrueFalseOptions,
} from '../models/focus.model';

export class CreateJobDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  job_name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsBooleanString()
  useTest: string;

  @IsNumberString()
  marker_name: string;

  @IsNumberString()
  chr: string;

  @IsNumberString()
  position: string;

  @IsNumberString()
  effect_allele: string;

  @IsNumberString()
  alternate_allele: string;

  @IsNumberString()
  freq: string;

  @IsNumberString()
  beta: string;

  @IsNumberString()
  se: string;

  @IsNumberString()
  p_value: string;

  @IsNumberString()
  sample_size: string;

  @IsNotEmpty()
  @IsEnum(LocationsType)
  locations: LocationsType;

  @IsNotEmpty()
  @IsEnum(Populations)
  population: Populations;

  @IsNotEmpty()
  @IsEnum(Chromosomes)
  chromosome: Chromosomes;

  @IsNotEmpty()
  @IsEnum(TrueFalseOptions)
  all_gwas_sig: TrueFalseOptions;

  @IsNumberString()
  p_threshold: string;

  @IsNumberString()
  ridge_term: string;

  // @IsNotEmpty()
  // @IsEnum(TrueFalseOptions)
  // intercept: TrueFalseOptions;

  @IsNumberString()
  max_genes: string;

  @IsString()
  prior_prob: string;

  @IsNumberString()
  credible_level: string;

  @IsNumberString()
  min_r2pred: string;

  @IsNumberString()
  max_impute: string;

  @IsNotEmpty()
  @IsEnum(TrueFalseOptions)
  plot: TrueFalseOptions;

  @IsNotEmpty()
  @IsEnum(TISSUEOptions)
  tissue: TISSUEOptions;

  @IsNumberString()
  start: string;

  @IsNumberString()
  stop: string;
}
