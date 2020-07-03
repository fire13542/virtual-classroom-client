import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = ApiService.API_URL;

  public static student;
  public static teacher;

  public static isStudent: boolean = false;
  public static isTeacher: boolean = false;
  public static isAdmin: boolean = false;

  public static loginError: string = '';
  public static signupError: string = '';
  public static adminLoginError: string = '';

  public static resetPasswordCharacter: string = '';
  public static resetPasswordEmail: string = '';
  public static resetPasswordNumber: string = '';
  public static resetPasswordExpiredDate: Date;

  constructor() { }

  login(email, password, character) {
    return fetch(this.API_URL + 'login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: email,
              password: password,
              isStudent: character === 'student',
              isTeacher: character === 'teacher'
            })
          })
  }

  signup(name, email, password, character) {
    return fetch(this.API_URL + 'signup', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              isStudent: character === 'student',
              isTeacher: character === 'teacher'
            })
          })
  }

  adminLogin(adminName, password) {
    return fetch(this.API_URL + 'admin/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        adminName: adminName,
        password: password
      })
    });
  }

  resetPassword(email, character){
    return fetch(this.API_URL+"reset-password", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        character: character,
        email: email
      })
    })
  }

  changePassword(character, email, newPassword){
    if(character==='student'){
      return fetch(this.API_URL + 'student/change-password', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          newPassword: newPassword
        })
      })
    }
    if(character==='teacher'){
      return fetch(this.API_URL + 'teacher/change-password', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          newPassword: newPassword
        })
      })
    }
  }

}
