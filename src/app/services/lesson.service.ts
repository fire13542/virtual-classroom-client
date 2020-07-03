import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  public static API_URL = ApiService.API_URL;
  public API_URL = ApiService.API_URL;

  public static lesson;

  constructor() { }

  createNewLesson(courseId, courseName, lessonName, teacherId, teacherName, members) {
    return fetch(this.API_URL+'lesson/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId, courseName, lessonName, teacherId, teacherName, members
      })
    });
  }

  deleteLesson(lessonId, courseId, lessonName, courseName, teacherId){
    return fetch(this.API_URL+'lesson/delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        lessonId, courseId, lessonName, courseName, teacherId
      })
    })
  }

  getLessonById(lessonId){
    return fetch(this.API_URL+'lesson/'+lessonId, {
      method: 'get',
      headers: {token: localStorage.getItem('token')}
    })
  }

  addLink(lessonId, link){
    return fetch(this.API_URL+'lesson/addLink', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        lessonId, link
      })
    })
  }

  rmoveLink(lessonId, link){
    return fetch(this.API_URL+'lesson/removeLink', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        lessonId, link
      })
    })
  }

  getDiscussionComments(discussionId){
    return fetch(this.API_URL+'lesson/comments/'+discussionId, {
      method: 'get',
      headers: {token: localStorage.getItem('token')}
    });
  }
}
