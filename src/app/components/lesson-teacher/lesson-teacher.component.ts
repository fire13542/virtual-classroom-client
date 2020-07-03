import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LessonService } from 'src/app/services/lesson.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-lesson-teacher',
  templateUrl: './lesson-teacher.component.html',
  styleUrls: ['./lesson-teacher.component.css']
})
export class LessonTeacherComponent implements OnInit {

  socket;

  teacher;
  course;
  lesson;
  comments;

  isFileDropdown: boolean = false;
  isLinkDropdown: boolean = false;
  waitingFile: string = '';
  waitingLink: string = '';

  constructor(public ngZone: NgZone, private ls: LessonService, private router: Router) {
    this.socket = SocketService.socket;  
    this.teacher = JSON.parse(sessionStorage.getItem('characterData'));
    if(!this.teacher){
      this.teacher = AuthService.teacher;
    }
    this.course = JSON.parse(sessionStorage.getItem('course'));
    if(!this.course){
      this.course = CoursesService.course;
    }
    this.lesson = JSON.parse(sessionStorage.getItem('lesson'));
    if(!this.lesson){
      this.lesson = LessonService.lesson;
    }

    this.getDiscussionComments();
    
    this.socket.emit('joinLessonRoom', this.lesson._id);
    this.socketOn();
   }

  ngOnInit(): void { 
  }

  deleteLesson(){
    this.ls.deleteLesson(this.lesson._id, this.course._id, this.lesson.name, this.course.name, this.course.teacherId)
    .then(res => {
      return res.json()
    })
    .then(response => {
      if(response.lessonDeleted){
        this.course.lessons = this.course.lessons.filter(l => l.id !== this.lesson._id)
        CoursesService.course = this.course;
        sessionStorage.setItem('course', JSON.stringify(this.course));
        sessionStorage.removeItem('lesson');
        alert('lesson deleted successfully');
        this.router.navigate(['/teacher-course', this.course._id]);
      }
      else {
        alert('an error occured, try again ....');
      }
    })
    .catch(err => {
      alert('an error occured, try again ....');
    })
  }

  getDiscussionComments(){
    this.ls.getDiscussionComments(this.lesson.discussionId)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.error){
        alert(response.errMsg);
      }
      else {
        this.comments = response.comments;
      }
    })
    .catch(err => {
      alert(err);
    })
  }

  socketOn(){
    this.socket.on('recieveComment', (comment) => {
      this.ngZone.run(() => {
        this.comments.push(comment);
      })
    });
    
  }

  @ViewChild('video') video: ElementRef

  async showVideo(){
        let mediaDevices = navigator.mediaDevices as any;
        try {
          // let stream = await mediaDevices.getDisplayMedia({ video: true, audio: true });
          // this.video.nativeElement.srcObject = stream;
          // console.log(stream)
          // let u = URL.createObjectURL(stream);
          // console.log(u);
          // this.socket.emit('video', )
        } catch (error) {
          
        }
  }


  toggleFileDropdown(){
    this.isFileDropdown = !this.isFileDropdown;
  }

  file;

  setFile(file){
    this.file = file;
  }

  addFile(){
    this.waitingFile = 'waiting.....'
    const formData = new FormData();
    formData.append('lessonId', this.lesson._id);
    formData.append('teacherId', AuthService.teacher._id);
    formData.append('courseName', CoursesService.course.name);
    formData.append('lessonName',this.lesson.name);
    formData.append('file', this.file);
    
    fetch(LessonService.API_URL + 'lesson/uploadFile', {
      method: 'POST',
      headers: {token: localStorage.getItem('token')},
      body: formData
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.fileUploaded){
        this.lesson.files.push(response.filename);
        LessonService.lesson = this.lesson;
        sessionStorage.setItem('lesson', this.lesson);
      }
      else {
        alert(response.errMsg);
      }
      this.waitingFile = '';
      this.toggleFileDropdown();
    })
    .catch(err => {
      alert(err)
    })
  }

  downloadFile(filename){
    let body = {
      teacherId: this.course.teacherId,
      courseName: this.course.name,
      lessonName: this.lesson.name,
      filename: filename
    }
    fetch(LessonService.API_URL+'download-file', {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    .then(res => res.blob())
    .then(data => {
      saveAs(data, filename);
    })
    .catch(err => {
      alert('an error occured, try again....')
    })
  }

  removeFile(filename){
    let lessonData = {
        lessonId: this.lesson._id,
        teacherId: this.course.teacherId,
        courseName: this.course.name,
        lessonName: this.lesson.name
    }
    fetch(LessonService.API_URL + 'lesson/removeFile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' ,token: localStorage.getItem('token')},
      body: JSON.stringify({
        lessonData, filename
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.fileRemoved){
        this.lesson.files.filter(file => file !== filename);
        LessonService.lesson = this.lesson;
        sessionStorage.setItem('lesson', this.lesson);
      }
      else {
        alert(response.errMsg);
      }
    })
    .catch(err => {
      console.log(err);
      alert(err)
    })
  }
  
  toggleLinkDropdown(){
    this.isLinkDropdown = !this.isLinkDropdown;
  }

  statement;
  linkUrl;
  addLink(){
    this.waitingLink = 'waiting';
    let link = {statement: this.statement, link: this.linkUrl};
    this.ls.addLink(this.lesson._id, link)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.link){
        this.lesson.links.push(link);
        sessionStorage.setItem('lesson', JSON.stringify(this.lesson));
      }
      else {
        alert(response.errMsg);
      }
      this.toggleLinkDropdown();
      this.waitingLink = '';
    })
    .catch(err => {
      alert(err);
    })
  }

  removeLink(link){
    this.ls.rmoveLink(this.lesson._id, link)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.linkRemoved){
        this.lesson.links = this.lesson.links.filter(l => l !== link);
        sessionStorage.setItem('lesson', JSON.stringify(this.lesson));
      }
      else {
        console.log(response.errMsg)
        alert('an error occured, try again.....');
      }
    })
    .catch(err => {
      console.log(err)
      alert('an error occured, try again.....');
    });
  }


  commentContent;
  sendComment(){
    let comment = {
      discussionId: this.lesson.discussionId,
      content: this.commentContent,
      sender: {id: this.teacher._id, name: this.teacher.name, character: 'teacher'},
      timestamp: Date.now()
    }
    let data = {
      roomId: this.lesson._id,
      comment: comment
    }
    this.socket.emit('newComment', data);
  }

}
