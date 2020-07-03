import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  public API_URL = ApiService.API_URL;

  grades = [];

  static studentGrades = [];

  constructor() { }

  // newGrade(gradeData){
  //   return fetch(this.API_URL+'grade/new', {
  //     method: 'post',
  //     headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
  //     body: JSON.stringify({
  //       gradeData
  //     })
  //   })
  // }

  getStudentGrades(studentId){
    return fetch(this.API_URL+'grade/student', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        studentId
      })
    })
  }

  getQuizGrades(quizId){
    return fetch(this.API_URL+'grade/quiz', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        quizId
      })
    })
  }
}
