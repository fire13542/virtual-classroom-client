import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  adminLoginError: string = AuthService.adminLoginError;

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  adminLogin(form) {
    let data = form.value;
    this.as.adminLogin(data.adminName, data.password)
      .then(response => {
        return response.json()
      })
      .then(res => {
        if(!res.login) {
                this.adminLoginError = AuthService.adminLoginError = res.errMsg;
              } else {
                localStorage.setItem('token', res.token);
                sessionStorage.setItem('character', 'admin');
                AuthService.isAdmin = true;
                AuthService.adminLoginError = '';
                this.router.navigate(['/']);
              }
      })
  }

}
