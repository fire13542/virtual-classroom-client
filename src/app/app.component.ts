import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Title } from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';
import { CoursesService } from './services/courses.service';
import { GradeService } from './services/grade.service';
import * as io from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { SocketService } from './services/socket.service';
// import * as youtube from 'youtube-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private title: Title, private meta: Meta, private gs: GradeService, public ngZone: NgZone) {
    title.setTitle('O-Class');
    meta.updateTag({name: 'description', content: 'O-Class is a web application that help teacher to create virtual classroom environment to make education process easier, more efficiant and more entertaining'})
    // this.socket = io(SocketService.API_URL);
    this.ngZone.runOutsideAngular(() => {
      this.initSocket()
      .then(socket => {
        SocketService.socket = socket;
        this.socket = socket;
        this.init();
      })
      .catch(console.log)
    })
  }

  async initSocket(){
    return new Promise((resolve, rejects) => {
      let socket = io(SocketService.API_URL);
      if(!socket) rejects('socket error')
      resolve(socket)
    })
  }

  runInitSocket(){
    this.ngZone.runOutsideAngular(() => {
      this.initSocket()
      .then(socket => SocketService.socket = socket)
      .catch(console.log)
    })
  }


  ngOnInit(){
    // SocketService.socket = this.socket;
    // this.ngZone.runOutsideAngular(() => {
    //   this.initSocket()
    //   .then(socket => {
    //     SocketService.socket = socket;
    //     this.socket = socket;
    //     this.init();
    //   })
    //   .catch(console.log)
    // })
  }

  init(){
    if(isPlatformBrowser(this.platformId)){
      if(sessionStorage.length){
        AuthService.isAdmin = sessionStorage.getItem('character') === 'admin';
        AuthService.isStudent = sessionStorage.getItem('character') === 'student';
        AuthService.isTeacher = sessionStorage.getItem('character') === 'teacher';
        if(AuthService.isStudent){
          AuthService.student = JSON.parse(sessionStorage.getItem('characterData'));
          // this.socket.emit('joinStudentNotificationsRoom', AuthService.student._id)
          // this.socket.emit('studentGoOnline', AuthService.student._id)
          // AuthService.student.enrolledCourses.forEach(course => SocketService.socket.emit('joinCourseRoom', course.id));
          this.gs.getStudentGrades(AuthService.student._id)
          .then(res => res.json())
          .then(response => {GradeService.studentGrades = response.grades})
          .catch(err => {console.log(err)})
        }
        if(AuthService.isTeacher){
          AuthService.teacher = JSON.parse(sessionStorage.getItem('characterData'));
          // this.socket.emit('joinTeacherNotificationsRoom', AuthService.teacher._id)
          // this.socket.emit('teacherGoOnline', AuthService.teacher._id)
          // AuthService.teacher.createdCourses.forEach(course => SocketService.socket.emit('joinCourseRoom', course.id));
        }
        CoursesService.course = JSON.parse(sessionStorage.getItem('course'));
        CoursesService.announcements = sessionStorage.getItem('announcements') ? JSON.parse(sessionStorage.getItem('announcements')) : [];
      }
    }
  }

}
