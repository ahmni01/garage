import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-container',
  directives: [
    ...FORM_DIRECTIVES
  ],
  providers: [AuthService],
  styles: [`
    .auth {
      height: 100%;
    }
    input {
      border-bottom: 1px solid lightgrey;
    }
    .ng-invalid.ng-dirty {
      border-bottom: 1px solid red;
    }
    form {
      width: 100%;
      border-radius: 2px;
      background-color: light-grey;
      padding: 20px;
      height: 200px;
    }
    .inputs {
      height: 100%;
      position: relative;
    }
    .link {
      color: lightblue;
    }
    .link:hover {
      background-color: transparent;
    }
    .title {
      font-size: 36px;
      font-weight: 300;
      text-transform: capitalize;
    }
    .error {
      color: red;
      position: absolute;
      right: 30px;
    }
  `],
  template: `
  <div class="auth row center-xs middle-xs">
   <h3 class="col-md-12 text-center">CA Garage</h3>
  <div class="col-xs-offset-1 col-xs-10 col-md-offset-4 col-md-4">
    <form class="signin form-horizontal" autocomplete="off" (ngSubmit)="authenticate()" #authForm="ngForm">
        <fieldset>
            <div class="form-group">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        <i class="text-muted glyphicon glyphicon-user"></i>
                    </span>
                    <input type="text" class="form-control" id="username" name="username" placeholder="username"
                    required [(ngModel)]="user.username" #username="ngModel" >
                </div>
                <div class="error" [hidden]="username.valid || username.pristine">username is invalid</div>
            </div>
            <div class="form-group">
                <div class="input-group input-group-lg">
                    <span class="input-group-addon">
                        <i class="text-muted glyphicon glyphicon-asterisk"></i>
                    </span>
                    <input type="password" class="form-control" id="password" name="password" placeholder="password" 
                    required [(ngModel)]="user.password" #password="ngModel" >
                </div>
                <div class="error" [hidden]="password.valid || password.pristine">password is required</div>
            </div>
            <div class="text-center form-group">
                <button type="submit" class="btn btn-success btn-lg btn-block" [disabled]="!authForm.form.valid">Login</button>
            </div>
        </fieldset>
    </form>
</div>
</div>
  `
})
export class Auth {
  user = {
    password: '',
    username: ''
  };
  mode: string = 'signin';

constructor(private auth: AuthService, private router: Router) {

}

authenticate() {
    this.auth.authenticate(this.mode, this.user)
    .subscribe(() => this.router.navigate(['']))
  }
}