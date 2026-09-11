export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

export interface PrescriptionInput {
  clembuterolDoseMcg: number;
  omega3Mg: number;
  magnesiumMg: number;
  proteinScoops: number;
  fastingHours: number;
  waterOz: number;
}

export interface BloodworkInput {
  totalTestosteroneNgDl: number;
  freeTestosteronePgMl: number;
  estradiolPgMl: number;
  shbgNmolL: number;
  hba1cPercent: number;
}

/**
 * Administrative data-integrity rule validator for protocol entry fields.
 * Note: These are software boundary checks configured for administrative safety,
 * not autonomous medical diagnosis.
 */
export function validatePrescriptionDosages(input: PrescriptionInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Administrative Rule: Clembuterol Upper Registry Bound
  if (input.clembuterolDoseMcg > 40) {
    errors.push(
      `REGLA ADMINISTRATIVA DE REGISTRO: La dosis ingresada de Clembuterol (${input.clembuterolDoseMcg} mcg/día) supera el límite máximo configurado de 40 mcg/día.`
    );
  } else if (input.clembuterolDoseMcg > 20) {
    warnings.push(
      `Aviso de Protocolo: Dosis de Clembuterol (${input.clembuterolDoseMcg} mcg/día) requiere verificación médica previa.`
    );
  }

  // Fasting Window Check
  if (input.fastingHours > 16) {
    warnings.push(
      `Aviso de Protocolo: Ventana de ayuno (${input.fastingHours} horas) excede la recomendación estándar del programa.`
    );
  }

  // Hydration target
  if (input.waterOz < 60) {
    warnings.push(
      `Aviso de Registro: Objetivo de agua (${input.waterOz} oz) por debajo del parámetro habitual.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Administrative range evaluator for clinical laboratory input.
 * Note: If no official reference range is configured for a marker, default metadata should state REFERENCE RANGE NOT CONFIGURED.
 */
export function validateBloodworkMarkers(input: BloodworkInput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Total Testosterone physiological sanity bound
  if (input.totalTestosteroneNgDl < 50 || input.totalTestosteroneNgDl > 2000) {
    errors.push(
      `Rango de Datos Inválido: Valor de Testosterona Total (${input.totalTestosteroneNgDl} ng/dL) fuera de los límites de captura permitidos (50 - 2000 ng/dL).`
    );
  }

  // Estradiol high threshold warning
  if (input.estradiolPgMl > 55) {
    warnings.push(
      `Aviso Clínico: Estradiol registrado (${input.estradiolPgMl} pg/mL) por encima del rango de referencia del laboratorio.`
    );
  }

  // HbA1c threshold
  if (input.hba1cPercent >= 5.7) {
    warnings.push(
      `Aviso de Laboratorio: HbA1c registrado (${input.hba1cPercent}%) fuera de rango óptimo.`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

