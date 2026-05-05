export interface ManifiestoResponse {
  success: boolean;
  status: number;
  message: string;
  data: Manifiesto[];
}

export interface ManifiestoByIdResponse {
  success: boolean;
  status: number;
  message: string;
  data: Manifiesto;
}

export interface Manifiesto {
  id: number;
  manifiesto: string;
  fecha_apertura: string;
  fecha_cierre: string;
  transportista: string;
  tipo_camion: string;
  chofer: string;
  placas: string;
  destino: string;
  estatus: string;
}