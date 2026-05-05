import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manifiesto, ManifiestoByIdResponse, ManifiestoResponse } from '../models/manifiesto.model.ts';

@Injectable({
  providedIn: 'root'
})
export class ManifiestosService {

  private apiUrl = 'https://carlosjamaica.com/desarrollo/funnels/api-v2/prueba.php';

  constructor(private http: HttpClient) {}

  getManifiestos(): Observable<ManifiestoResponse> {
    return this.http.get<ManifiestoResponse>(this.apiUrl);
  }

  getManifiestoPorId(id: number): Observable<ManifiestoByIdResponse> {
    return this.http.get<ManifiestoByIdResponse>(`${this.apiUrl}?id=${id}`);
  }

  crearManifiesto(data: Omit<Manifiesto, 'id'>): Observable<any> {
    return this.http.post(this.apiUrl, { action: 'create', ...data });
  }

  actualizarManifiesto(data: Manifiesto): Observable<any> {
    return this.http.post(this.apiUrl, { action: 'update', ...data });
  }

  eliminarManifiesto(id: number): Observable<any> {
    return this.http.post(this.apiUrl, { action: 'delete', id });
  }
}