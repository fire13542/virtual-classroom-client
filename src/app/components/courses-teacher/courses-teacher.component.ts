import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-courses-teacher',
  templateUrl: './courses-teacher.component.html',
  styleUrls: ['./courses-teacher.component.css']
})
export class CoursesTeacherComponent implements OnInit {

  socket;

  teacher;

  courses = [];
  course;

  announcements = [];
  announcementsNumbers = [];
  
  isDropdown: boolean = false;
  waiting: string = '';
  createCourseError: string = '';

  isCourseCodeCollapsed = true;
  
  constructor(public ngZone: NgZone, private cs: CoursesService, private router: Router) {
    this.socket = SocketService.socket;
    this.teacher = AuthService.teacher;
    this.courses = this.teacher.createdCourses;
    this.getAnnouncements();
    this.socket.on('recieveAnnouncement', announcement => {
      ngZone.run(() => {
        this.announcements.push(announcement);
        this.announcementCounter();
        sessionStorage.setItem('announcements', JSON.stringify(this.announcements));
      })
    })
    this.socket.on('announcementDeleted', announcementId => {
      ngZone.run(() => {
        this.announcements = this.announcements.filter(announcement => announcement._id !== announcementId);
        CoursesService.announcements = this.announcements;
        this.announcementCounter();
        sessionStorage.setItem('announcements', JSON.stringify(this.announcements));
      })
    })
   }

  ngOnInit(): void {
    
  }

  getAnnouncements(){
    let coursesIds = this.courses.map(course => course.id);
    this.socket.emit('getAllAnnouncementOfMember', coursesIds);
    this.socket.on('allAnnouncementOfMember', announcements => {
      CoursesService.announcements = announcements;
      this.announcements = announcements;
      this.announcementCounter();
      sessionStorage.setItem('announcements', JSON.stringify(announcements));
    });
  }

  announcementCounter(){
    this.courses.forEach(course => this.announcementsNumbers[course.id] = 0);
    this.announcements.forEach(announcement => {
        this.announcementsNumbers[announcement.courseId]++;
    })
  }

  toggleDropdown(){
    this.isDropdown = !this.isDropdown;
  }

  createNewCourse(form){
    this.waiting = 'waiting.....'
    let data = form.value;
    let CourseName = data.name;
    this.cs.createNewCourse(this.teacher._id, this.teacher.name, CourseName)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.tokenError){
        alert(response.message);
      }
      else {
        if(response.courseCreated){
          AuthService.teacher = response.teacher;
          this.teacher = response.teacher;
          this.courses = this.teacher.createdCourses;
          this.waiting = '';
          this.createCourseError = '';
          this.toggleDropdown();
        }
        else {
          this.createCourseError = response.errMsg;
          this.waiting = '';
        }
      }
    })
  }

  setCourse(course){
    course.image = CoursesService.API_URL + 'courses-images/' + course.image;
    this.course = course;
  }

  goToCoursePage(){
    this.router.navigate(['/teacher-course', this.course.id]);
  }

  deleteCourse(){
    this.cs.deleteCourse(this.teacher._id, this.course)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.courseDeleted){
        AuthService.teacher = response.teacher;
        this.teacher = AuthService.teacher;
        this.courses = this.teacher.createdCourses;
        this.course = null;
        this.router.navigate['/teacher-courses'];
      }
      else {
        console.log(response.errMsg);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

}
