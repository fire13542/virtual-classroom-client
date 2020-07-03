import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-courses-student',
  templateUrl: './courses-student.component.html',
  styleUrls: ['./courses-student.component.css']
})
export class CoursesStudentComponent implements OnInit {

  socket;

  student;

  courses = [];
  course;

  announcements = [];
  announcementsNumbers = [];
  
  isDropdown: boolean = false;
  waiting: string = '';
  enrollCourseError: string = '';

  constructor(public ngZone: NgZone, private cs: CoursesService, private router: Router) { 
    this.socket = SocketService.socket;
    this.student = AuthService.student;
    this.courses = this.student.enrolledCourses;
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

  enrollCourse(form){
    this.waiting = 'waiting.....'
    let data = form.value;
    let courseCode = data.courseCode;
    fetch(CoursesService.API_URL+'student/enroll-course', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        studentId: this.student._id,
        studentName: this.student.name,
        studentImage: this.student.image,
        courseCode: courseCode
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.course){
        this.waiting = '';
        this.toggleDropdown();
        this.student.enrolledCourses.push(response.course);
      }
      else {
        alert(response.errMsg);
        this.waiting = '';
        this.toggleDropdown();
      }
    })
    .catch(err => {
      alert(err);
    })
  }

  setCourse(course){
    course.image = CoursesService.API_URL + 'courses-images/' + course.image;
    this.course = course;
    CoursesService.course = course;
  }

  goToCoursePage(){
    this.router.navigate(['/student-course', this.course.id]);
  }

}
