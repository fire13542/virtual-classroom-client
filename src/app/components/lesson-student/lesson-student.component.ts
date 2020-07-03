import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LessonService } from 'src/app/services/lesson.service';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { SocketService } from 'src/app/services/socket.service';


@Component({
  selector: 'app-lesson-student',
  templateUrl: './lesson-student.component.html',
  styleUrls: ['./lesson-student.component.css']
})
export class LessonStudentComponent implements OnInit {

  socket;

  student;
  course;
  lesson;
  comments;

  constructor(public ngZone: NgZone, private ls: LessonService) {
    this.socket = SocketService.socket;
    this.student = JSON.parse(sessionStorage.getItem('characterData'));
    if(!this.student){
      this.student = AuthService.student;
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
      console.log(this.comments)
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

  commentContent;
  sendComment(){
    let comment = {
      discussionId: this.lesson.discussionId,
      content: this.commentContent,
      sender: {id: this.student._id, name: this.student.name, character: 'student'},
      timestamp: Date.now()
    }
    let data = {
      roomId: this.lesson._id,
      comment: comment
    }
    this.socket.emit('newComment', data);
    this.commentContent = '';
  }

}
