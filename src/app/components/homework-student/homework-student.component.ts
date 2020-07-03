import { Component, OnInit, NgZone } from '@angular/core';
import { HomeworkService } from 'src/app/services/homework.service';
import { saveAs } from 'file-saver';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-homework-student',
  templateUrl: './homework-student.component.html',
  styleUrls: ['./homework-student.component.css']
})
export class HomeworkStudentComponent implements OnInit {

  socket;

  student;
  course;
  homework;
  comments;

  isUploadSolution;
  canUploadSolution;

  constructor(public ngZone: NgZone, private hs: HomeworkService) {
    this.socket = SocketService.socket;
    
    this.student = JSON.parse(sessionStorage.getItem('characterData'));
    if(!this.student){
      this.student = AuthService.student;
    }
    this.course = JSON.parse(sessionStorage.getItem('course'));
    if(!this.course){
      this.course = CoursesService.course;
    }
    this.homework = JSON.parse(sessionStorage.getItem('homework'));
    if(!this.homework){
      this.homework = HomeworkService.homework;
    }

    this.isUploadSolution = this.homework.solutions.filter(solution => solution.studentId == this.student._id)[0];
    this.canUploadSolution = new Date(this.homework.toDate).getTime() > Date.now();

    this.getDiscussionComments();
    
    this.socket.emit('joinHomeworkRoom', this.homework._id);
    this.socketOn();
   }

  ngOnInit(): void {
  }

  getDiscussionComments(){
    this.hs.getDiscussionComments(this.homework.discussionId)
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

  downloadFile(filename){
    let body = {
      teacherId: this.course.teacherId,
      courseName: this.course.name,
      homeworkName: this.homework.name,
      filename: filename,
      homework: true
    }
    fetch(HomeworkService.API_URL+'download-file', {
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

  solutionFile;
  setFile(file){
    this.solutionFile = file;
  }

  uploadSolution(){
    let formData = new FormData();
    formData.append('teacherId', this.course.teacherId);
    formData.append('courseName', this.course.name);
    formData.append('homeworkId', this.homework._id);
    formData.append('homeworkName', this.homework.name);
    formData.append('studentId', this.student._id);
    formData.append('studentName', this.student.name);
    formData.append('solutionFile', this.solutionFile);
    fetch(HomeworkService.API_URL+'homework/upload-solution', {
      method: 'POST',
      headers: {token: localStorage.getItem('token')},
      body: formData
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.solution){
        this.isUploadSolution = true;
        this.homework.solutions.push(response.solution);
        sessionStorage.setItem('homework', JSON.parse(this.homework));
      }
      else {
        alert('an error occured, try again ....')
      }
    })
  }

  commentContent;
  sendComment(){
    let comment = {
      discussionId: this.homework.discussionId,
      content: this.commentContent,
      sender: {id: this.student._id, name: this.student.name, character: 'student'},
      timestamp: Date.now()
    }
    let data = {
      roomId: this.homework._id,
      comment: comment
    }
    this.socket.emit('newComment', data);
    this.commentContent = '';
  }

}
