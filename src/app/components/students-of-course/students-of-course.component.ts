import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-students-of-course',
  templateUrl: './students-of-course.component.html',
  styleUrls: ['./students-of-course.component.css']
})
export class StudentsOfCourseComponent implements OnInit {

  students = [];

  constructor(private cs: CoursesService) { }

  ngOnInit(): void {
    this.students = CoursesService.course.members;
    this.students = this.students.map(student => {
      return {
        id: student.id, 
        name: student.name, 
        image: CoursesService.API_URL+'studentsImages/'+student.images
      }
    })
  }

  removeStudentFromCourse(student){
    this.cs.removeStudentFromCourse(CoursesService.course._id, student)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.studentRemoved){
        alert('student removed successfully');
        this.students = this.students.filter(s => s !== student);
      }
      else {
        alert('an error occured, try again....');
      }
    })
  }

}
