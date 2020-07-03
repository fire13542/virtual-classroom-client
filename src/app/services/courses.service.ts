import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  public static API_URL = ApiService.API_URL;
  public API_URL = ApiService.API_URL;

  public static course;
  public static announcements;

  constructor() { }

  createNewCourse(teacherId, teacherName, courseName){
    return fetch(this.API_URL+'course/new', {
      method: 'post',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        teacherId: teacherId,
        teacherName: teacherName,
        courseName: courseName
      })
    });
  }

  deleteCourse(teacherId, courseData){
    return fetch(this.API_URL+'course/delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        teacherId: teacherId,
        courseData: courseData
      })
    })
  }

  getCourseInfo(courseId){
    return fetch(this.API_URL+'course/get', {
      method: 'post', 
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId: courseId
      })
    })
  }

  removeStudentFromCourse(courseId, student){
    return fetch(this.API_URL+'course/remove-student', {
      method: 'put',
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        courseId, student
      })
    })
  }

  getStudentsOfCourses(coursesIds){
    return fetch(this.API_URL+'course/students', {
      method: 'post', 
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        coursesIds: coursesIds
      })
    })
  }

  getTeachersOfCourses(teachersIds){
    return fetch(this.API_URL+'course/teachers', {
      method: 'post', 
      headers: {'Content-Type': 'application/json', token: localStorage.getItem('token')},
      body: JSON.stringify({
        teachersIds: teachersIds
      })
    })
  }
}
