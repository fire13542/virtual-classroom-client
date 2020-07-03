import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-grades-quiz',
  templateUrl: './grades-quiz.component.html',
  styleUrls: ['./grades-quiz.component.css']
})
export class GradesQuizComponent implements OnInit {

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
        quizId: this.route.snapshot.paramMap.get('quizId')
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
