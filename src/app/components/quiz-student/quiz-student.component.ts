import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { GradeService } from 'src/app/services/grade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.css']
})
export class QuizStudentComponent implements OnInit {

  course;
  quiz; 

  quizRunning: boolean = false;

  answers = [];

  quizMessage = '';

  studentGrade;

  constructor(private qs: QuizService, private gs: GradeService, private router: Router, private route: ActivatedRoute) {
    // window.addEventListener('beforeunload', e => {
    //   var confirmationMessage = "\o/";
    //   e.returnValue = confirmationMessage; 
    //   return confirmationMessage;   
    // })
    this.course = CoursesService.course;
    this.quiz = {
      _id: '',
      quizName: '',
      maxGrade: '',
      courseId: '',
      quizDate: '',
      quizEnd: '',
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

    this.quizRunning = Date.now() > new Date(this.quiz.quizDate).getTime() && Date.now() < new Date(this.quiz.quizEnd).getTime();
    if(this.quizRunning){
      window.addEventListener('beforeunload', e => {
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage; 
        return confirmationMessage;   
      })
      await this.qs.getStudentQuizQuestions(quizId)
      .then(res => {
        return res.json();
      })
      .then(response => {
        if(response.questions){
          this.quiz.questions = response.questions;
          setTimeout(() => {this.finishQuiz()}, new Date(this.quiz.quizEnd).getTime() - Date.now());
          setTimeout(() => {console.log('finish')}, new Date(this.quiz.quizEnd).getTime() - Date.now());
        }
        else {
          this.getGrade();
          alert(response.errMsg);
        }
      }).catch(err => {
        alert('an error occured, try again ....');
      });
    }
    else if(Date.now() > new Date(this.quiz.quizEnd).getTime()){
      this.quizMessage = 'this quiz is terminated';
      this.getGrade();
    }
    else if(Date.now() < new Date(this.quiz.quizDate).getTime()){
      this.quizMessage = 'this quiz is not started';
    }
  }

  setAnswer(question, answer){
    this.answers[question] = answer;
  }

  finishQuiz(){
    let q = {
      id: this.quiz._id,
      name: this.quiz.quizName, 
      courseName: this.course.name
    }
    let student = {
      id: AuthService.student._id,
      name: AuthService.student.name
    }
    console.log(q, student)
    this.qs.finishQuiz(q, student, this.answers)
    .then(res => {
      return res.json();
    })
    .then(response => {
      if(response.grade){
        this.studentGrade = response.grade.grade;
        this.quiz.questions = [];
        this.quizMessage = 'this quiz is terminated';
      } 
      else {
        alert('an error occured, try again ....')
      }
    })
  }

  getGrade(){
    let grade = GradeService.studentGrades.filter(g => g.quizId === this.quiz._id)[0];
    if(grade){
      this.studentGrade = grade.grade;
    }
  }
}
