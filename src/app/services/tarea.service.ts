import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  myAppUrl = 'https://localhost:44320/';
  myApiUrl = 'api/Tarea/';
  list: Tarea[];

  constructor(private http: HttpClient) { }

  obtenerTareas() {
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise()
      .then(data => {
        this.list = data as Tarea[];
      });
  }

  guardarTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.myAppUrl + this.myApiUrl, tarea)
  }

  actualizarTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(this.myAppUrl + this.myApiUrl + id, tarea);
  }

  eliminarTarea(id: number): Observable<Tarea> {
    return this.http.delete<Tarea>(this.myAppUrl + this.myApiUrl + id);
  }
}

