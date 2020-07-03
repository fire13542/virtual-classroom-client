import { Component, OnInit, NgZone } from '@angular/core';
import { HomeworkService } from 'src/app/services/homework.service';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-homework-teacher',
  templateUrl: './homework-teacher.component.html',
  styleUrls: ['./homework-teacher.component.css']
})
export class HomeworkTeacherComponent implements OnInit {

  socket;

  teacher;
  course;
  homework;
  comments;

  isFileDropdown: boolean = false;
  isLinkDropdown: boolean = false;
  waitingFile: string = '';
  waitingLink: string = '';

  constructor(public ngZone: NgZone, private hs: HomeworkService, private router: Router) {
    this.socket = SocketService.socket;
    this.teacher = JSON.parse(sessionStorage.getItem('characterData'));
    if(!this.teacher){
      this.teacher = AuthService.teacher;
    }
    this.course = JSON.parse(sessionStorage.getItem('course'));
    if(!this.course){
      this.course = CoursesService.course;
    }
    this.homework = JSON.parse(sessionStorage.getItem('homework'));
    if(!this.homework){
      this.homework = HomeworkService.homework;
    }

    this.getDiscussionComments();
    
    this.socket.emit('joinHomeworkRoom', this.homework._id);
    this.socketOn();
   }

  ngOnInit(): void { 
  }

  deleteHomework(){
    this.hs.deleteHomework(this.homework._id, this.course._id, this.homework.name, this.course.name, this.course.teacherId)
    .then(res => {
      return res.json()
    })
    .then(response => {
      if(response.homeworkDeleted){
        this.course.homeworks = this.course.homeworks.filter(l => l.id !== this.homework._id)
        CoursesService.course = this.course;
        sessionStorage.setItem('course', JSON.stringify(this.course));
        sessionStorage.removeItem('homework');
        alert('homework deleted successfully');
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
    formData.append('homeworkId', this.homework._id);
    formData.append('teacherId', AuthService.teacher._id);
    formData.append('courseName', CoursesService.course.name);
    formData.append('homeworkName',this.homework.name);
    formData.append('file', this.file);
    
    fetch(HomeworkService.API_URL + 'homework/uploadFile', {
      method: 'POST',
      headers: {token: localStorage.getItem('token')},
      body: formData
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.fileUploaded){
        this.homework.files.push(response.filename);
        HomeworkService.homework = this.homework;
        sessionStorage.setItem('homework', this.homework);
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

  removeFile(filename){
    let homeworkData = {
        homeworkId: this.homework._id,
        teacherId: this.course.teacherId,
        courseName: this.course.name,
        homeworkName: this.homework.name
    }
    fetch(HomeworkService.API_URL + 'homework/removeFile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' ,token: localStorage.getItem('token')},
      body: JSON.stringify({
        homeworkData, filename
      })
    })
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.fileRemoved){
        this.homework.files.filter(file => file !== filename);
        HomeworkService.homework = this.homework;
        sessionStorage.setItem('homework', this.homework);
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
    this.hs.addLink(this.homework._id, link)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.link){
        this.homework.links.push(link);
        sessionStorage.setItem('homework', JSON.stringify(this.homework));
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
    this.hs.rmoveLink(this.homework._id, link)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.linkRemoved){
        this.homework.links = this.homework.links.filter(l => l !== link);
        sessionStorage.setItem('homework', JSON.stringify(this.homework));
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

  downloadSolutionFile(filename){
    let body = {
      teacherId: this.course.teacherId,
      courseName: this.course.name,
      homeworkName: this.homework.name,
      filename: filename
    }
    fetch(HomeworkService.API_URL+'download-solution', {
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
      discussionId: this.homework.discussionId,
      content: this.commentContent,
      sender: {id: this.teacher._id, name: this.teacher.name, character: 'teacher'},
      timestamp: Date.now()
    }
    let data = {
      roomId: this.homework._id,
      comment: comment
    }
    this.socket.emit('newComment', data);
  }

}
