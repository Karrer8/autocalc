// Datos fiscales actualizados 2026
// Fuente: Real Decreto-ley 16/2025 (cuotas congeladas respecto a 2025, MEI sube a 0,9%)

export interface Tramo {
  id: number;
  min: number;
  max: number;
  baseCotizacion: number;
  cuotaMensual: number;
  tabla: "reducida" | "general";
}

// Tipo de cotización total: 31,3% sobre la base de cotización
export const TIPO_COTIZACION = 0.313;

// MEI 2026: 0,9%
export const MEI = 0.009;

// Tarifa plana nuevos autónomos: 80€/mes (88,64€ con MEI)
export const TARIFA_PLANA = 80;
export const TARIFA_PLANA_CON_MEI = 88.64;

// Deducción gastos difícil justificación
export const DEDUCCION_GASTOS_PERSONA_FISICA = 0.07;
export const DEDUCCION_GASTOS_SOCIETARIO = 0.03;

// IVA
export const IVA_GENERAL = 0.21;
export const IVA_REDUCIDO = 0.10;
export const IVA_SUPERREDUCIDO = 0.04;

// IRPF
export const IRPF_RETENCION_GENERAL = 0.15;
export const IRPF_RETENCION_NUEVOS = 0.07;
export const IRPF_PAGO_FRACCIONADO = 0.20;

export const TRAMOS: Tramo[] = [
  // Tabla reducida (rendimientos netos < SMI)
  { id: 1, min: 0, max: 670, baseCotizacion: 653.59, cuotaMensual: 200, tabla: "reducida" },
  { id: 2, min: 670.01, max: 900, baseCotizacion: 718.95, cuotaMensual: 220, tabla: "reducida" },
  { id: 3, min: 900.01, max: 1166.70, baseCotizacion: 849.67, cuotaMensual: 260, tabla: "reducida" },
  { id: 4, min: 1166.71, max: 1300, baseCotizacion: 950.98, cuotaMensual: 291, tabla: "reducida" },
  { id: 5, min: 1300.01, max: 1500, baseCotizacion: 960.78, cuotaMensual: 294, tabla: "reducida" },
  { id: 6, min: 1500.01, max: 1700, baseCotizacion: 960.78, cuotaMensual: 294, tabla: "reducida" },
  // Tabla general (rendimientos netos ≥ SMI)
  { id: 7, min: 1700.01, max: 1850, baseCotizacion: 1045.75, cuotaMensual: 320, tabla: "general" },
  { id: 8, min: 1850.01, max: 2030, baseCotizacion: 1062.09, cuotaMensual: 325, tabla: "general" },
  { id: 9, min: 2030.01, max: 2330, baseCotizacion: 1078.43, cuotaMensual: 330, tabla: "general" },
  { id: 10, min: 2330.01, max: 2760, baseCotizacion: 1111.11, cuotaMensual: 340, tabla: "general" },
  { id: 11, min: 2760.01, max: 3190, baseCotizacion: 1176.47, cuotaMensual: 360, tabla: "general" },
  { id: 12, min: 3190.01, max: 3620, baseCotizacion: 1241.83, cuotaMensual: 380, tabla: "general" },
  { id: 13, min: 3620.01, max: 4050, baseCotizacion: 1307.19, cuotaMensual: 400, tabla: "general" },
  { id: 14, min: 4050.01, max: 6000, baseCotizacion: 1454.25, cuotaMensual: 445, tabla: "general" },
  { id: 15, min: 6000.01, max: Infinity, baseCotizacion: 1732.03, cuotaMensual: 530, tabla: "general" },
];

export function obtenerTramo(rendimientoNetoMensual: number): Tramo {
  const tramo = TRAMOS.find(
    (t) => rendimientoNetoMensual >= t.min && rendimientoNetoMensual <= t.max
  );
  return tramo || TRAMOS[0];
}
