import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { Configuration } from 'app.configuration';
import { LoginModel } from 'models/login';


const mockResponse = {
  token: "This is token"
}

describe('LoginService', () => {
  let service: LoginService;
  let conf: Configuration;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LoginService);
    conf = TestBed.inject(Configuration);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    const loginMoidel: LoginModel = { username:"user", password: "password"};
    service.login(loginMoidel).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    })

    const request = http.expectOne({
      method: 'POST',
      url: conf.apiHost+conf.apiEndpoints["login"]
    });

    request.flush(mockResponse);
  })


});
