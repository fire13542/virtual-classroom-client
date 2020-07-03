import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetNumber: string = '';

  change: boolean = false; // true: display change password section

  resetError: string = '';

  constructor(private router: Router, private as: AuthService) { }

  ngOnInit(): void {
  }

  displayChangePassword(){
    if(this.resetNumber === AuthService.resetPasswordNumber
        && Date.now().valueOf() < AuthService.resetPasswordExpiredDate.valueOf()) {
          this.change = true;
          this.resetError = '';
        } else {
          this.resetError = "Wrong reset number OR reset date expired";
        }
  }

  changePassword(newPassword){
    this.as.changePassword(AuthService.resetPasswordCharacter, AuthService.resetPasswordEmail, newPassword)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.passwordChanged){
        alert('password changed siccessfully');
        this.router.navigate(['/']);
      }
      else {
        alert('an error occured during change password, please try again ...');
        this.router.navigate(['/']);
      }
    })
  }

}
