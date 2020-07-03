import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {

  socket;

  isStudent = false;
  isTeacher = false;

  student;
  teacher;

  students = [];
  teachers = [];

  studentImage = '';
  teacherImage = '';

  person;

  courses = [];

  messages = [];
  messagesDisplay = [];

  isMessageCollapsed = [];

  constructor(public ngZone: NgZone, private cs: CoursesService) {
    this.socket = SocketService.socket;
    this.isStudent = AuthService.isStudent;
    this.isTeacher = AuthService.isTeacher;
    this.student = AuthService.student;
    this.teacher = AuthService.teacher;
    if(this.isStudent){
      this.courses = this.student.enrolledCourses;
      this.person = {
        id: this.student._id,
        name: this.student.name,
        image: this.student.image,
        character: 'student'
      }
    }
    else if(this.isTeacher){
      this.courses = this.teacher.createdCourses;
      this.person = {
        id: this.teacher._id,
        name: this.teacher.name,
        image: this.teacher.image,
        character: 'teacher'
      }
    }
    this.setStudents();
    this.setTeachers();
    this.socket.emit('getMessages', this.person);
    this.socket.on('messages', messages => {
      ngZone.run(() => {
        this.messages = messages.reverse();
        this.filterMessages('all');
        messages.forEach(message => this.isMessageCollapsed[message._id] = true)
      })
    });
    this.socket.on('newMessage', (msg) => {
      ngZone.run(() => {
        this.messages.unshift(msg); 
        this.isMessageCollapsed[msg._id] = true;
        if(msg.reciever.id === this.person.id){
          alert('you recieved message from ' + msg.sender.name);
        }
      })
    })
   }

   ngOnInit(): void {
  }

   setStudents(){
    let coursesIds = this.courses.map(course => course.id);
    this.cs.getStudentsOfCourses(coursesIds)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.students){
        this.students = response.students;
      }
    })
    .catch(err => {
      console.log(err);
    })
   }

   setTeachers(){
     let teachersIds = this.courses.map(course => course.teacherId);
    this.cs.getTeachersOfCourses(teachersIds)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.teachers){
        this.teachers = response.teachers;
      }
    })
    .catch(err => {
      console.log(err);
    })
   }

  setStudentImage(studentId){
    this.studentImage = this.students.filter(student => student.id === studentId)[0].image;
  }

  setTeacherImage(teacherId){
    this.teacherImage = this.teachers.filter(teacher => teacher.id === teacherId)[0].image;
  }

  messagesFilter = ''; 

  filterMessages(filter){
    this.messagesFilter = filter;
    if(filter === 'all'){
      this.messagesDisplay = this.messages;
    } 
    else if(filter === 'sent') {
      this.messagesDisplay = this.messages.filter(message => message.sender.id === this.person.id);
    }
    else if(filter === 'recieved') {
      this.messagesDisplay = this.messages.filter(message => message.reciever.id === this.person.id);
    }
  }

  send(form){
    let data = form.value;
    let reciever;
    if(this.person.character === 'student') {
      reciever = this.teachers.filter(teacher => teacher.id === data.teacher)[0];
      reciever.character = 'teacher';
    }
    if(this.person.character === 'teacher') {
      reciever = this.students.filter(student => student.id === data.student)[0];
      reciever.character = 'student';
    }
    let message = {
      subject: data.subject,
      content: data.content, 
      sender: this.person, 
      reciever: {id: reciever.id, name: reciever.name, image: reciever.image, character: reciever.character},
      timestamp: Date.now()
    }
    this.socket.emit('sendMessage', message);
  }
}
