import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category, Cource } from 'models';
import { from, Observable } from 'rxjs';
import { Configuration as config } from 'app.config';


@Injectable({
  providedIn: 'root'
})
export class CourcesService {

  http=inject(HttpClient)

  getAll(): Observable<Cource[]> {
    return this.http.get(config.apiHost+config.apiEndpoints["cource"]) as Observable<Cource[]>
  } 

}
