import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'app.config';
import { Question } from 'models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient) { }

  public getAll(): Observable<Question[]>{
    return this.http.get(Configuration.apiHost+Configuration.apiEndpoints["question"]) as Observable<Question[]>
  }

}
