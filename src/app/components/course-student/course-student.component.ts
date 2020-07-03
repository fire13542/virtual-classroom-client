import { Component, OnInit, NgZone } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { LessonService } from 'src/app/services/lesson.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeworkService } from 'src/app/services/homework.service';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrls: ['./course-student.component.css']
})
export class CourseStudentComponent implements OnInit {

  socket;

  student;
  course;

  courseImage;

  announcements = [];

  isAnnouncementCollapsed = [];

  constructor(public ngZone: NgZone, private cs: CoursesService, private ls: LessonService, private hs: HomeworkService, private router: Router, private route: ActivatedRoute) {
    this.socket = SocketService.socket;
    this.course = {
      _id: '',
      name: '',
      courseCode: '',
      image: '',
      teacherId: '',
      teacherName: '',
      members: [],
      lessons: [],
      homeworks: [],
      quizes: [],
    }
    this.getCourseInfo();
    this.student = AuthService.student;
   }

  ngOnInit(): void {
    this.socket.on('recieveAnnouncement', announcement => {
      this.ngZone.run(() => {
        this.announcements.push(announcement);
        this.isAnnouncementCollapsed[announcement._id] = true;
      })
    })
    this.socket.on('announcementDeleted', announcementId => {
      this.ngZone.run(() => {
        this.announcements = this.announcements.filter(announcement => announcement._id !== announcementId);
      })
    })
  }

  getCourseInfo(){
    this.cs.getCourseInfo(this.route.snapshot.paramMap.get('id'))
    .then(res => {
      return res.json();
    })
    .then(response => {
      this.course = response.course;
      this.courseImage = CoursesService.API_URL + 'courses-images/' + this.course.image;
      this.course.courseCode = '';
      this.announcements = CoursesService.announcements.filter(announcement => announcement.courseId == this.course._id.toString());
      this.announcements.forEach(announcement => this.isAnnouncementCollapsed[announcement._id] = true);
      CoursesService.course = response.course;
      sessionStorage.setItem('course', JSON.stringify(response.course));
    })
  }

  leaveCourse(){
    let student = {
      id: this.student._id,
      name: this.student.name
    }
    let course = {
      id: this.course._id, 
      name: this.course.name, 
      teacherId: this.course.teacherId, 
      teacherName: this.course.teacherName, 
      image: CoursesService.course.image
    }
    fetch(CoursesService.API_URL+'student/leave-course', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        student: student,
        course: course
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.leaved){
        this.student.enrolledCourses = this.student.enrolledCourses.filter(c => c.id != course.id);
        AuthService.student = this.student;
        sessionStorage.setItem('student', JSON.stringify(this.student));
        alert('leaved course successfully');
        this.router.navigate(['/student-courses'])
      }
      else {
        alert('an error occured, try again.....')
      }
    })
  }

  getLessonData(lesson){
    this.ls.getLessonById(lesson.id)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.lesson){
        console.log(response.lesson)
        LessonService.lesson = response.lesson;
        sessionStorage.setItem('lesson', JSON.stringify(response.lesson));
        this.router.navigate(['/student-lesson']);
      }
      else {
        alert(response.errMsg);
      }
    })
  }

  getHomeworkData(homework){
    this.hs.getHomeworkById(homework.id)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.homework){
        HomeworkService.homework = response.homework;
        sessionStorage.setItem('homework', JSON.stringify(response.homework));
        this.router.navigate(['/student-homework']);
      }
      else {
        alert('an error occured, try again ....');
      }
    })
  }

  goToQuizPage(quizId){
    this.router.navigate(['/student-quiz/', quizId]);
  }
}
