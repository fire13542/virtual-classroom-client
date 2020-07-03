import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { CoursesService } from 'src/app/services/courses.service';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-quiz-review',
  templateUrl: './quiz-review.component.html',
  styleUrls: ['./quiz-review.component.css']
})
export class QuizReviewComponent implements OnInit {

  course;
  quiz; 

  answers = [];

  grades = [];

  constructor(private qs: QuizService, private gs: GradeService, private router: Router, private route: ActivatedRoute) {
    this.course = CoursesService.course;
    this.quiz = {
      _id: '',
      quizName: '',
      maxGrade: '',
      courseId: '',
      quizDate: '',
      quizEnd: '',
      status: '', // Waiting | Running | Terminating 
      questions: [],
      attendants: []
    }
    this.getQuizData(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    
  }

  async getQuizData(quizId){
    await this.qs.getQuizById(quizId)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.quiz){
        this.quiz = response.quiz;
      }
      else {
        alert('an error occured, try again ....');
      }
    })
    .catch(err => {
      alert('an error occured, try again ....');
    })

    await this.qs.getTeacherQuizQuestions(quizId)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.questions){
        this.quiz.questions = response.questions;
      }
      else {
        alert('an error occured, try again ....');
      }
    }).catch(err => {
      alert('an error occured, try again ....');
    });
    
    if(Date.now() > new Date(this.quiz.quizEnd).getTime()){
      await this.gs.getQuizGrades(quizId)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.grades){
          this.grades = response.grades;
        }
        else {
          alert('an error occured, try again ....');
        }
      })
      .catch(err => {
        alert('an error occured, try again ....');
      })
    }
  }

  setAnswer(question, answer){
    this.answers[question] = answer;
  }

  deleteQuiz(){
    this.qs.deleteQuiz(this.course._id, this.quiz._id)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.quizDeleted){
        CoursesService.course.quizes = CoursesService.course.quizes.filter(q => q.id != this.quiz._id);
        sessionStorage.setItem('course', JSON.stringify(CoursesService.course));
        alert('quiz deleted successfully');
        this.router.navigate(['/teacher-course/', this.course._id]);
      }
      else {
        alert('an error occured, try again ....');
      }
    })
  }
}
