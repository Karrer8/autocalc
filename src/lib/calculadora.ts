import {
  obtenerTramo,
  DEDUCCION_GASTOS_PERSONA_FISICA,
  DEDUCCION_GASTOS_SOCIETARIO,
  IVA_GENERAL,
  IRPF_PAGO_FRACCIONADO,
  IRPF_RETENCION_GENERAL,
  IRPF_RETENCION_NUEVOS,
  TARIFA_PLANA_CON_MEI,
  type Tramo,
} from "./datos-fiscales";

// ─── Calculadora 1: ¿Cuánto me queda limpio? ───

export interface ResultadoBeneficio {
  ingresosAnuales: number;
  gastosMensuales: number;
  rendimientoNetoMensual: number;
  tramo: Tramo;
  cuotaSS: number;
  ivaTrimestral: number;
  irpfTrimestral: number;
  beneficioNetoMensual: number;
  beneficioNetoAnual: number;
}

export function calcularBeneficio(
  facturacionMensual: number,
  gastosMensuales: number,
  opciones: { nuevoAutonomo?: boolean; societario?: boolean } = {}
): ResultadoBeneficio {
  const ingresosAnuales = facturacionMensual * 12;
  const gastosAnuales = gastosMensuales * 12;
  const deduccion = opciones.societario
    ? DEDUCCION_GASTOS_SOCIETARIO
    : DEDUCCION_GASTOS_PERSONA_FISICA;

  // Estimación inicial de cuota SS para calcular rendimiento neto
  // Se necesita iteración porque la cuota depende del rendimiento y viceversa
  let cuotaSS: number;
  if (opciones.nuevoAutonomo) {
    cuotaSS = TARIFA_PLANA_CON_MEI;
  } else {
    // Primera estimación sin contar cuota
    const rendimientoEstimado =
      (ingresosAnuales - gastosAnuales) * (1 - deduccion) / 12;
    const tramoEstimado = obtenerTramo(rendimientoEstimado);
    cuotaSS = tramoEstimado.cuotaMensual;
  }

  // Rendimiento neto mensual con cuota
  const rendimientoNetoMensual =
    (ingresosAnuales - gastosAnuales - cuotaSS * 12) * (1 - deduccion) / 12;

  const tramo = opciones.nuevoAutonomo
    ? obtenerTramo(rendimientoNetoMensual) // Informativo, pero paga tarifa plana
    : obtenerTramo(rendimientoNetoMensual);

  if (!opciones.nuevoAutonomo) {
    cuotaSS = tramo.cuotaMensual;
  }

  // IVA trimestral = IVA repercutido - IVA soportado
  const ivaRepercutidoTrimestral = facturacionMensual * 3 * IVA_GENERAL;
  const ivaSoportadoTrimestral = gastosMensuales * 3 * IVA_GENERAL;
  const ivaTrimestral = ivaRepercutidoTrimestral - ivaSoportadoTrimestral;

  // IRPF trimestral (Modelo 130 - estimación directa simplificada)
  const ingresosTrimestral = facturacionMensual * 3;
  const gastosTrimestral = gastosMensuales * 3 + cuotaSS * 3;
  const irpfTrimestral =
    (ingresosTrimestral - gastosTrimestral) * IRPF_PAGO_FRACCIONADO;

  // Beneficio neto mensual
  const beneficioNetoMensual =
    facturacionMensual - gastosMensuales - cuotaSS - ivaTrimestral / 3 - irpfTrimestral / 3;

  return {
    ingresosAnuales,
    gastosMensuales,
    rendimientoNetoMensual,
    tramo,
    cuotaSS,
    ivaTrimestral,
    irpfTrimestral,
    beneficioNetoMensual,
    beneficioNetoAnual: beneficioNetoMensual * 12,
  };
}

// ─── Calculadora 2: ¿En qué tramo estoy? ───

export interface ResultadoTramo {
  rendimientoNetoMensual: number;
  tramo: Tramo;
  cuotaMensual: number;
  cuotaAnual: number;
}

export function calcularTramo(
  ingresosAnuales: number,
  gastosAnuales: number,
  opciones: { societario?: boolean } = {}
): ResultadoTramo {
  const deduccion = opciones.societario
    ? DEDUCCION_GASTOS_SOCIETARIO
    : DEDUCCION_GASTOS_PERSONA_FISICA;

  const rendimientoNetoMensual =
    (ingresosAnuales - gastosAnuales) * (1 - deduccion) / 12;

  const tramo = obtenerTramo(rendimientoNetoMensual);

  return {
    rendimientoNetoMensual,
    tramo,
    cuotaMensual: tramo.cuotaMensual,
    cuotaAnual: tramo.cuotaMensual * 12,
  };
}

// ─── Calculadora 3: ¿Cuánto cobrar por hora? ───

export interface ResultadoTarifa {
  tarifaMinima: number;
  tarifaRecomendada: number;
  horasFacturablesMes: number;
  cuotaSS: number;
  irpfEstimadoMensual: number;
  desglose: {
    gastosFijos: number;
    cuotaSS: number;
    irpf: number;
    beneficioDeseado: number;
    total: number;
  };
}

export function calcularTarifa(
  salarioNetoDeseado: number,
  horasSemana: number,
  diasVacaciones: number
): ResultadoTarifa {
  const semanasAnuales = 52 - diasVacaciones / 5;
  const horasAnuales = horasSemana * semanasAnuales;
  const horasFacturablesMes = (horasAnuales * 0.65) / 12; // 65% facturable

  // Estimación de cuota SS basada en el salario deseado
  const tramo = obtenerTramo(salarioNetoDeseado);
  const cuotaSS = tramo.cuotaMensual;

  // IRPF estimado mensual
  const irpfEstimadoMensual = salarioNetoDeseado * IRPF_PAGO_FRACCIONADO;

  // Tarifa mínima
  const costoMensualTotal = salarioNetoDeseado + cuotaSS + irpfEstimadoMensual;
  const tarifaMinima = costoMensualTotal / horasFacturablesMes;
  const tarifaRecomendada = tarifaMinima * 1.2; // +20% margen

  return {
    tarifaMinima,
    tarifaRecomendada,
    horasFacturablesMes,
    cuotaSS,
    irpfEstimadoMensual,
    desglose: {
      gastosFijos: 0,
      cuotaSS,
      irpf: irpfEstimadoMensual,
      beneficioDeseado: salarioNetoDeseado,
      total: costoMensualTotal,
    },
  };
}

// ─── Calculadora 4: Simulador de factura ───

export interface ResultadoFactura {
  importeBase: number;
  iva: number;
  retencionIRPF: number;
  totalFactura: number;
  totalIngresa: number;
  tipoIva: number;
  tipoRetencion: number;
}

export function calcularFactura(
  importeBase: number,
  opciones: {
    tipoIva?: number;
    aplicarRetencion?: boolean;
    nuevoAutonomo?: boolean;
  } = {}
): ResultadoFactura {
  const tipoIva = opciones.tipoIva ?? IVA_GENERAL;
  const aplicarRetencion = opciones.aplicarRetencion ?? true;
  const tipoRetencion = opciones.nuevoAutonomo
    ? IRPF_RETENCION_NUEVOS
    : IRPF_RETENCION_GENERAL;

  const iva = importeBase * tipoIva;
  const retencionIRPF = aplicarRetencion ? importeBase * tipoRetencion : 0;
  const totalFactura = importeBase + iva - retencionIRPF;
  const totalIngresa = importeBase + iva - retencionIRPF;

  return {
    importeBase,
    iva,
    retencionIRPF,
    totalFactura: importeBase + iva,
    totalIngresa,
    tipoIva,
    tipoRetencion: aplicarRetencion ? tipoRetencion : 0,
  };
}
