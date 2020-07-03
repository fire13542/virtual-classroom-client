import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { CoursesService } from 'src/app/services/courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-teacher',
  templateUrl: './quiz-teacher.component.html',
  styleUrls: ['./quiz-teacher.component.css']
})
export class QuizTeacherComponent implements OnInit {

  quiz;
  questions = [];

  answers = [];
  
  constructor(private qs: QuizService, private router: Router) {
    this.quiz = {
      quizName: ' ',
      maxGrade: 0,
      courseId: CoursesService.course._id,
      quizDate: '',
      quizEnd: '',
      questions: [],
      attendants: []
    }
   }

  ngOnInit(): void {
    
  }

  addQuestion(form){
    let data = form.value;
    let question = {
      questionText: '',
      choices: [],
      trueAnswer: '',
      grades: 1
    };
    question.questionText = data.questionText
    let choices = [];
    if(data.choice1) choices.push(data.choice1);
    if(data.choice2) choices.push(data.choice2);
    if(data.choice3) choices.push(data.choice3);
    if(data.choice4) choices.push(data.choice4);
    question.choices = choices;
    let answer = '';
    switch(data.answer){
      case 'choice1': {answer = data.choice1; break;}
      case 'choice2': {answer = data.choice2; break;}
      case 'choice3': {answer = data.choice3; break;}
      case 'choice4': {answer = data.choice4; break;}
    }
    question.trueAnswer = answer;
    question.grades = data.grades;
    this.questions.push(question);
    form.resetForm();
  }

  setAnswer(question, answer){
    this.answers[question] = answer;
  }

  createQuiz(form){
    let data = form.value;
    let maxGrade = this.questions.reduce((total, question) => {
      return total + question.grades;
    }, 0);
    let quizDate = new Date(data.quizDate);
    quizDate.setHours(data.quizTime.split(':')[0], data.quizTime.split(':')[1]);
    let quizEnd = new Date(data.quizEndDate);
    quizEnd.setHours(data.quizEndTime.split(':')[0], data.quizEndTime.split(':')[1])
    this.quiz.maxGrade = maxGrade;
    this.quiz.quizDate = quizDate;
    this.quiz.quizEnd = quizEnd;
    this.quiz.questions = this.questions;
    this.quiz.attendants = [];
    this.qs.newQuiz(this.quiz)
    .then(res => {
       return res.json();
    })
    .then(response => {
      if(response.quiz){
        alert('quiz created successfully .....');
        CoursesService.course.quizes.push({id: response.quiz.id, name: response.quiz.name});
        sessionStorage.setItem('course', JSON.stringify(CoursesService.course));
        this.router.navigate(['/teacher-course', CoursesService.course._id])
      }
      else {
        alert('an error occured, try again ....')
      }
    })
    .catch(err => {
      alert('an error occured, try again ....')
    })
  }
}

