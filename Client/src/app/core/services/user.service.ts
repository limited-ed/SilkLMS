import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'app.config';
import { IdentityUser } from 'models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private path;
  
  constructor(
    private http: HttpClient
  ) { 
    this.path=Configuration.apiHost+Configuration.apiEndpoints["users"];
  }

  public getAll():  Observable<IdentityUser[]> {
    return this.http.get(this.path) as Observable<IdentityUser[]>
  }


}
