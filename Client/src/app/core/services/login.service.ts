import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration  as conf} from 'app.config';
import { LoginModel } from 'models/login';
import { Observable } from 'rxjs';
import { AuthResponse } from 'models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginModel: LoginModel): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(conf.apiHost+conf.apiEndpoints['login'], loginModel) as Observable<AuthResponse>;
  } 
}
