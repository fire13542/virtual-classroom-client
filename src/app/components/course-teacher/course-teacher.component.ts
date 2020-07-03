import { Component, OnInit, NgZone } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { AuthService } from 'src/app/services/auth.service';
import { LessonService } from 'src/app/services/lesson.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeworkService } from 'src/app/services/homework.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-course-teacher',
  templateUrl: './course-teacher.component.html',
  styleUrls: ['./course-teacher.component.css']
})
export class CourseTeacherComponent implements OnInit {

  socket;

  teacher;
  course;

  announcements = [];

  isLessonDropdown: boolean = false;
  isHomeworkDropdown: boolean = false;
  isAnnouncementDropDown: boolean = false;
  waiting: string = '';

  changeCourseCodeWaiting: string = '';
  
  isCourseCodeCollapsed = true;

  isAnnouncementCollapsed = [];

  constructor(public ngZone: NgZone, private cs: CoursesService, private ls: LessonService, private hs: HomeworkService, private qs: QuizService, private router: Router, private route: ActivatedRoute) {
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
    this.teacher = AuthService.teacher;
   }

  ngOnInit(): void {
    this.socket.on('recieveAnnouncement', announcement => {
      this.ngZone.run(() => {
        this.waiting = '';
        this.toggleAnnouncementDropdown();
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
      this.course.image = CoursesService.API_URL + 'courses-images/' + this.course.image;
      this.announcements = CoursesService.announcements.filter(announcement => announcement.courseId == this.course._id.toString());
      this.announcements.forEach(announcement => this.isAnnouncementCollapsed[announcement._id] = true);
      CoursesService.course = response.course;
      sessionStorage.setItem('course', JSON.stringify(response.course));
    })
  }

  image;
  setImage(file){
    this.image = file;
  }

  changeCourseImage(){
    const formData = new FormData();
    formData.append('courseId', this.course._id);
    formData.append('image', this.image);

    fetch(CoursesService.API_URL + 'course/image', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if(res.imageChanged){
        CoursesService.course.image = res.image;
        sessionStorage.setItem('course', CoursesService.course);
        this.course.image = CoursesService.API_URL + 'courses-images/' + this.course.image;
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  changeCourseCode(){
    this.changeCourseCodeWaiting = 'waiting.....';
    fetch(CoursesService.API_URL+'course/courseCode', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId: this.course._id
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.courseCode){
        this.course.courseCode = response.courseCode;
        CoursesService.course = this.course;
        sessionStorage.setItem('course', JSON.stringify(this.course));
        this.changeCourseCodeWaiting = '';
        this.isCourseCodeCollapsed = false;
      }
      else {
        this.changeCourseCodeWaiting = '';
        alert('an error occured, try again...');
      }
    })
  }

  toggleLessonDropdown(){
    this.isLessonDropdown = !this.isLessonDropdown;
  }

  toggleHomeworkDropdown(){
    this.isHomeworkDropdown = !this.isHomeworkDropdown;
  }

  toggleAnnouncementDropdown(){
    this.isAnnouncementDropDown = !this.isAnnouncementDropDown;
  }

  createNewLesson(form){
    this.waiting = 'waiting.....'
    let data = form.value;
    let lessonName = data.name;
    this.ls.createNewLesson(this.course._id, this.course.name, lessonName, this.teacher._id, this.teacher.name, this.course.members)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.lesson){
        CoursesService.course.lessons.push({id: response.lesson._id, name: response.lesson.name});
        this.course = CoursesService.course;
        this.waiting = ''
        this.toggleLessonDropdown();
      }
      else {
        this.toggleLessonDropdown();
        this.waiting = '';
        alert('an error occured during creating lesson, try again....');
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
        LessonService.lesson = response.lesson;
        sessionStorage.setItem('lesson', JSON.stringify(response.lesson));
        this.router.navigate(['/teacher-lesson']);
      }
      else {
        alert(response.errMsg);
      }
    })
  }

  createNewHomework(form){
    this.waiting = 'waiting.....'
    let data = form.value;
    let homeworkName = data.name;
    this.hs.createNewHomework(this.course._id, this.course.name, homeworkName, new Date(data.toDate), this.teacher._id, this.teacher.name, this.course.members)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.homework){
        CoursesService.course.homeworks.push({id: response.homework._id, name: response.homework.name});
        this.course = CoursesService.course;
        this.waiting = ''
        this.toggleHomeworkDropdown();
      }
      else {
        this.toggleHomeworkDropdown();
        this.waiting = '';
        alert('an error occured during creating homework, try again....');
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
        this.router.navigate(['/teacher-homework']);
      }
      else {
        alert('an error occured, try again ....');
      }
    })
  }

  goToCreateQuiz(){
    this.router.navigate(['/teacher-quiz'])
  }

  goToQuizReview(quizId){
    this.router.navigate(['/quiz-review/', quizId]);
  }

  addAnnouncement(form){
    let data = form.value;
    let announcement = {
      courseId: this.course._id, 
      courseName: this.course.name,
      title: data.title, 
      description: data.description, 
      fromDate: data.fromDate, 
      toDate: data.toDate
    }
    this.waiting = 'waiting.....'
    this.socket.emit('newAnnouncement', {courseId: this.course._id, announcement});
  }

  deleteAnnouncement(announcementId){
    this.socket.emit('deleteAnnouncement', ({courseId: this.course._id, announcementId}));
  }

}
