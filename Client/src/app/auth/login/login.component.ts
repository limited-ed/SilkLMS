import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';


import { Store } from '@ngxs/store';
import { Application } from 'state/application/application.actions';
import { LoginService } from 'core/services/login.service';

import { LoginModel } from 'models/login';
import { GlobalState } from 'state/models/globalState.enum';
import { UserInfo } from 'models';
import { jwtDecode } from 'core';




@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[
        ButtonModule,
        CheckboxModule,
        FormsModule,
        PasswordModule,
        InputTextModule
  ]

})
export class LoginComponent {

  model: LoginModel = { email: '', password: '' };
  error = '';
  inProgress = false;

  constructor(private store: Store, private router: Router, private service: LoginService) {

  }


  private isTokenExpired(token: string){



  }

  login() {
    this.service.login(this.model).subscribe({
      next: (res) => {
        let decoded = jwtDecode(res.token)
        this.store.dispatch(new Application.SetToken(res.token));
        if (true) {
          let userinfo: UserInfo = {
            userName: decoded["unique_name"],
            fullName: decoded["fullName"],
            roles: decoded["roles"],
            email: '',
            groupId: 0,
            group: decoded["group"]
          };
          this.store.dispatch(new Application.SetGlobalState(GlobalState.Logged));
          this.store.dispatch(new Application.SetUserInfo(userinfo));
          if (userinfo.roles.indexOf("Admin")!==-1) this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.error = $localize`Error!!!!`;
      }
    })

  }


}
