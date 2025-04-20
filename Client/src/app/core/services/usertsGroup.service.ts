import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration as config } from 'app.config';
import { Group } from 'models';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class usersGroupService {

  private path;
  
  constructor(
    private http: HttpClient
  ) { 
    this.path=config.apiHost+config.apiEndpoints["usersGroup"];
  }

  public getAll():  Observable<Group[]> {
    return this.http.get(this.path) as Observable<Group[]>
  }

}
