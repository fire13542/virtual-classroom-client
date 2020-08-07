import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  API_URL ='http://localhost:3000/';

  student;
  teacher;

  characterData;
  name = '';
  email = '';
  image = '';
  character = '';

  readOnly: boolean = true;

  updateErrorMsg: string = '';

  waiting: string = '';

  constructor(private as: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(AuthService.isStudent){
      this.character = 'student';
      this.student = AuthService.student;
      this.characterData = this.student;
      this.image = this.API_URL + 'students-images/' + this.characterData.image;
    }
    if(AuthService.isTeacher){
      this.character = 'teacher';
      this.teacher = AuthService.teacher;
      this.characterData = this.teacher;
      this.image = this.API_URL + 'teachers-images/' + this.characterData.image;
    }
    this.name = this.characterData.name;
    this.email = this.characterData.email;
  }

  edit(){
    this.readOnly = false;
  }

  imageFile;

  selectFile(file){
    this.imageFile = file;
  }
  
  changeImage(){
    const formData = new FormData();
    //-------------------if is student---------------------
    if(AuthService.isStudent){
      formData.append('studentId', this.student._id);
      formData.append('image', this.imageFile);
      fetch(this.API_URL+'student/image', {
        method: 'post', 
        headers: {token: localStorage.getItem('token')},
        body: formData
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.imageChanged){
          this.student.image = response.imageName;
          this.characterData.image = response.imageName;
          this.image = this.API_URL + 'students-images/' + response.imageName;
          this.updateErrorMsg = '';
          AuthService.student = this.student;
          sessionStorage.setItem('characterData', JSON.stringify(this.student));
        }
        else {
          this.updateErrorMsg = response.errMsg;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    // --------------if is teacher---------------
    if(AuthService.isTeacher){
      formData.append('teacherId', this.teacher._id);
      formData.append('image', this.imageFile);
      fetch(this.API_URL+'teacher/image', {
        method: 'post', 
        headers: {token: localStorage.getItem('token')},
        body: formData
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.imageChanged){
          this.teacher.image = response.imageName;
          this.characterData.image = response.imageName;
          this.image = this.API_URL + 'teachers-images/' + response.imageName;
          this.updateErrorMsg = '';
          AuthService.teacher = this.teacher;
          sessionStorage.setItem('characterData', JSON.stringify(this.teacher));
        }
        else {
          this.updateErrorMsg = response.errMsg;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  changeNameAndEmail(){
    // -------------if is student-------------
    if(AuthService.isStudent){
      fetch(this.API_URL+'student/update', {
        method: 'put', 
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
        body: JSON.stringify({
          studentId: this.student._id,
          name: this.name,
          email: this.email
        })
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.update){
          this.student = response.student;
          this.student.name = this.name,
          this.student.email = this.email,
          AuthService.student = this.student,
          sessionStorage.setItem('student', JSON.stringify(this.student));
          this.readOnly = true;
        }
        else {
          this.updateErrorMsg = response.errMsg;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    // -----------if is teacher------------
    if(AuthService.isTeacher){
      fetch(this.API_URL+'teacher/update', {
        method: 'put', 
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
        body: JSON.stringify({
          teacherId: this.teacher._id,
          name: this.name,
          email: this.email
        })
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.update){
          this.teacher = response.teacher;
          this.teacher.name = this.name,
          this.teacher.email = this.email,
          AuthService.teacher = this.teacher,
          sessionStorage.setItem('teacher', JSON.stringify(this.teacher));
          this.readOnly = true;
        }
        else {
          this.updateErrorMsg = response.errMsg;
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  resetPassword(){
    if(this.email && this.character){
      this.waiting = "Waiting...."
      this.as.resetPassword(this.email, this.character)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.reset){
          this.waiting = '';
          AuthService.resetPasswordCharacter = this.character;
          AuthService.resetPasswordEmail = this.email;
          AuthService.resetPasswordNumber = response.resetNumber;
          AuthService.resetPasswordExpiredDate = response.expiredDate;
          this.router.navigate(['/reset-password']);
        }
        else {
          this.waiting = '';
          this.updateErrorMsg = response.errMsg;
        }
      })
      .catch(err => {
        this.waiting = '';
        this.updateErrorMsg = err;
      })
    }
    else {
      this.updateErrorMsg = 'enter your email';
    }
  }

  deleteAccount(){
    let sure = confirm('are you sure you want to delete your Account in O-class???');
    if(!sure) return;
      // -------------if is student-------------
    if(AuthService.isStudent){
      fetch(this.API_URL+'student/delete', {
        method: 'delete', 
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
        body: JSON.stringify({
          studentId: this.student._id
        })
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.delete){
          alert('account deleted');
          this.router.navigate(['/']);
        }
        else {
          alert('an error occured, try again....');
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    // -----------if is teacher------------
    if(AuthService.isTeacher){
      fetch(this.API_URL+'teacher/delete', {
        method: 'delete', 
        headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
        body: JSON.stringify({
          teacherId: this.teacher._id,
          name: this.teacher.name,
          email: this.teacher.email
        })
      })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.delete){
          alert('account deleted');
          this.router.navigate(['/']);
        }
        else {
          alert('an error occured, try again....')
        }
      })
      .catch(err => {
        console.log(err);
      })
    }    
  }
}

