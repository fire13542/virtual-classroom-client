import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeworkService {

  public static API_URL = ApiService.API_URL;
  public API_URL = ApiService.API_URL;

  public static homework;

  constructor() { }

  createNewHomework(courseId, courseName, homeworkName, toDate, teacherId, teacherName, members) {
    return fetch(this.API_URL+'homework/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId, courseName, homeworkName, toDate, teacherId, teacherName, members
      })
    });
  }

  deleteHomework(homeworkId, courseId, homeworkName, courseName, teacherId){
    return fetch(this.API_URL+'homework/delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        homeworkId, courseId, homeworkName, courseName, teacherId
      })
    })
  }

  getHomeworkById(homeworkId){
    return fetch(this.API_URL+'homework/'+homeworkId, {
      method: 'get',
      headers: {token: localStorage.getItem('token')}
    })
  }

  addLink(homeworkId, link){
    return fetch(this.API_URL+'homework/addLink', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        homeworkId, link
      })
    })
  }

  rmoveLink(homeworkId, link){
    return fetch(this.API_URL+'homework/rmoveLink', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        homeworkId, link
      })
    })
  }

  getDiscussionComments(discussionId){
    return fetch(this.API_URL+'homework/comments/'+discussionId, {
      method: 'get',
      headers: {token: localStorage.getItem('token')}
    });
  }
}
