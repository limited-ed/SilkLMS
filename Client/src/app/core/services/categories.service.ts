import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration as config } from 'app.config';
import { Category } from 'models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  public getAll():  Observable<Category[]> {
    return this.http.get(config.apiHost+config.apiEndpoints["categories"]) as Observable<Category[]>
  }

  public add(category: Category): Observable<Category>{
    return this.http.post(config.apiHost+config.apiEndpoints["categories"], category) as Observable<Category>
  }

  public update(category: Category): Observable<Category>{
    return this.http.put(config.apiHost+config.apiEndpoints["categories"]+category.id, category) as Observable<Category>
  }

  public delete(category: Category): Observable<Category>{
    return this.http.delete(config.apiHost+config.apiEndpoints["categories"]+category.id) as Observable<Category>
  }

}

