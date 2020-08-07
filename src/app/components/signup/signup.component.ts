import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  socket;
  signupError: string = AuthService.signupError;

  constructor(private as: AuthService, private router: Router) {
    this.socket = SocketService.socket;
   }

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
            sessionStorage.setItem('character', data.character);
            if(AuthService.isStudent){
              sessionStorage.setItem('characterData', JSON.stringify(res.student));
              this.socket.emit('joinStudentNotificationsRoom', AuthService.student._id)
              this.socket.emit('studentGoOnline', AuthService.student._id)
            }
            if(AuthService.isTeacher){
              sessionStorage.setItem('characterData', JSON.stringify(res.teacher));
              this.socket.emit('joinTeacherNotificationsRoom', AuthService.teacher._id)
              this.socket.emit('teacherGoOnline', AuthService.teacher._id)
            }
            this.router.navigate(['/']);
          }
      })
  }

}
