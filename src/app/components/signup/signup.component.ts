import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupError: string = AuthService.signupError;

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  signup(form) {
    let data = form.value;
    this.as.signup(data.name, data.email, data.password, data.character)
      .then(response => response.json())
      .then(res => {
        if(!res.signup) {
                this.signupError = AuthService.signupError = res.errMsg;
              } else {
                localStorage.setItem('token', res.token);
                AuthService.isStudent = data.character === "student";
                AuthService.student = res.student;
                AuthService.isTeacher = data.character === "teacher";
                AuthService.teacher = res.teacher;
                AuthService.signupError = '';
                this.router.navigate(['/']);
              }
      })
  }

}
