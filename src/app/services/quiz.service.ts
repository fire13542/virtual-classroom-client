import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public API_URL = ApiService.API_URL;

  constructor() { }

  newQuiz(quizData){
    return fetch(this.API_URL+'quiz/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        quizData
      })
    })
  }

  deleteQuiz(courseId, quizId){
    return fetch(this.API_URL+'quiz/delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId,
        quizId
      })
    })
  }

  getQuizById(quizId){
    return fetch(this.API_URL+'quiz/'+quizId, {
      method: 'get',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')}
    })
  }

  getTeacherQuizQuestions(quizId){
    return fetch(this.API_URL+'quiz/teacher-questions', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        quizId
      })
    })
  }

  getStudentQuizQuestions(quizId){
    let attendantStudent = {
      id: AuthService.student._id,
      name: AuthService.student.name
    }
    return fetch(this.API_URL+'quiz/student-questions', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        quizId, 
        attendantStudent
      })
    })
  }

  finishQuiz(quiz, student, answers){
    return fetch(this.API_URL+'quiz/finish-quiz', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        quiz, student, answers
      })
    })
  }
}
