import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grades-student',
  templateUrl: './grades-student.component.html',
  styleUrls: ['./grades-student.component.css']
})
export class GradesStudentComponent implements OnInit {

  API_URL = 'http://localhost:3000/';

  grades;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQuizGrades();
  }

  getQuizGrades(){
    fetch(this.API_URL+'grade/quiz', {
      method: 'post', 
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        studentId: this.route.snapshot.paramMap.get('studentId')
      })
    })
    .then(grades => {
      this.grades = grades;
    })
    .catch(err => {
      alert('an error occured, try again ....')
    })
  }

}
