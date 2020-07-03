import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketService } from 'src/app/services/socket.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  socket;

  isOpen: boolean = false;
  isClose: boolean = true;
  isDropdown: boolean = false;

  isStudent: boolean = false;
  isTeacher: boolean = false;
  isAdmin: boolean = false;

  waiting: string = '';

  constructor(public ngZone: NgZone, private router: Router, private as: AuthService) {
    this.socket = SocketService.socket;
   }

  ngOnInit(): void {
    this.isStudent = AuthService.isStudent;
    this.isTeacher = AuthService.isTeacher;
    this.isAdmin = AuthService.isAdmin;
  }

  ngDoCheck(): void {
    this.isStudent = AuthService.isStudent;
    this.isTeacher = AuthService.isTeacher;
    this.isAdmin = AuthService.isAdmin;
  }


  toggleNavbar(){
    this.isOpen = !this.isOpen;
    this.isClose = !this.isClose;
  }

  toggleDropdown(){
    this.isDropdown = !this.isDropdown;
  }

  loginError: string = AuthService.loginError;

  login(form){
    let data = form.value;
    this.as.login(data.email, data.password, data.character)
      .then(response => response.json())
      .then(res => {
        if(!res.login) {
                this.loginError = AuthService.loginError = res.errMsg;
              } else {
                localStorage.setItem('token', res.token);
                AuthService.student = res.student;
                AuthService.teacher = res.teacher;
                this.isStudent = AuthService.isStudent = data.character === "student";
                this.isTeacher = AuthService.isTeacher = data.character === "teacher";
                this.loginError = AuthService.loginError = '';
                sessionStorage.setItem('character', data.character);
                if(this.isStudent){
                  sessionStorage.setItem('characterData', JSON.stringify(res.student));
                  this.socket.emit('joinStudentNotificationsRoom', AuthService.student._id)
                  this.socket.emit('studentGoOnline', AuthService.student._id)
                }
                if(this.isTeacher){
                  sessionStorage.setItem('characterData', JSON.stringify(res.teacher));
                  this.socket.emit('joinTeacherNotificationsRoom', AuthService.teacher._id)
                  this.socket.emit('teacherGoOnline', AuthService.teacher._id)
                }
                this.router.navigate(['/']);
              }
      })
  }

  logout(){
    AuthService.isStudent = false;
    AuthService.isTeacher = false;
    AuthService.isAdmin = false;
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  resetPassword(form){
    if(form.value.email && form.value.character){
      this.waiting = "Waiting...."
      this.as.resetPassword(form.value.email, form.value.character)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.reset){
          this.waiting = '';
          AuthService.resetPasswordCharacter = form.value.character;
          AuthService.resetPasswordEmail = form.value.email;
          AuthService.resetPasswordNumber = response.resetNumber;
          AuthService.resetPasswordExpiredDate = response.expiredDAte;
          this.toggleDropdown();
          this.router.navigate(['/reset-password']);
        }
        else {
          this.waiting = '';
          this.loginError = response.errMsg;
        }
      })
      .catch(err => {
        this.waiting = '';
        this.loginError = err;
      })
    }
    else {
      this.loginError = 'enter your email';
    }
  }

  refresh(){
    if(this.isStudent){
      fetch(this.as.API_URL+'student/refresh/'+AuthService.student._id, {
        method: 'get', 
        headers: {token: localStorage.getItem('token')}
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        AuthService.student = response.student;
        sessionStorage.setItem('student', JSON.stringify(response.student));
      })
    }
    if(this.isTeacher){
      fetch(this.as.API_URL+'teacher/refresh/'+AuthService.teacher._id, {
        method: 'get', 
        headers: {token: localStorage.getItem('token')}
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        AuthService.teacher = response.teacher;
        sessionStorage.setItem('teacher', JSON.stringify(response.teacher));
      })
    }
  }
}
