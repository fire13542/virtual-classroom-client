import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtualClassroomComponent } from './virtual-classroom.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from '../services/guards/auth-guard.service';
import { MessageBoxComponent } from '../components/message-box/message-box.component';
import { CoursesStudentComponent } from '../components/courses-student/courses-student.component';
import { StudentGuard } from '../services/guards/student-guard.service';
import { CoursesTeacherComponent } from '../components/courses-teacher/courses-teacher.component';
import { TeacherGuard } from '../services/guards/teacher-guard.service';
import { CourseStudentComponent } from '../components/course-student/course-student.component';
import { CourseTeacherComponent } from '../components/course-teacher/course-teacher.component';
import { LessonStudentComponent } from '../components/lesson-student/lesson-student.component';
import { LessonTeacherComponent } from '../components/lesson-teacher/lesson-teacher.component';
import { HomeworkStudentComponent } from '../components/homework-student/homework-student.component';
import { HomeworkTeacherComponent } from '../components/homework-teacher/homework-teacher.component';
import { QuizStudentComponent } from '../components/quiz-student/quiz-student.component';
import { QuizReviewComponent } from '../components/quiz-review/quiz-review.component';
import { QuizTeacherComponent } from '../components/quiz-teacher/quiz-teacher.component';
import { StudentsOfCourseComponent } from '../components/students-of-course/students-of-course.component';
import { start } from 'repl';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages-box', component: MessageBoxComponent, canActivate: [AuthGuard] },
  { path: 'student-courses', component: CoursesStudentComponent, canActivate: [StudentGuard] },
  { path: 'teacher-courses', component: CoursesTeacherComponent, canActivate: [TeacherGuard] },
  { path: 'student-course/:id', component: CourseStudentComponent, canActivate: [StudentGuard] },
  { path: 'teacher-course/:id', component: CourseTeacherComponent, canActivate: [TeacherGuard] },
  { path: 'student-lesson', component: LessonStudentComponent, canActivate: [StudentGuard] },
  { path: 'teacher-lesson', component: LessonTeacherComponent, canActivate: [TeacherGuard] },
  { path: 'student-homework', component: HomeworkStudentComponent, canActivate: [StudentGuard] },
  { path: 'teacher-homework', component: HomeworkTeacherComponent, canActivate: [TeacherGuard] },
  { path: 'student-quiz/:id', component: QuizStudentComponent, canActivate: [StudentGuard] },
  { path: 'quiz-review/:id', component: QuizReviewComponent, canActivate: [TeacherGuard] },
  { path: 'teacher-quiz', component: QuizTeacherComponent, canActivate: [TeacherGuard] },
  { path: 'students-of-course', component: StudentsOfCourseComponent, canActivate: [TeacherGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualClassroomRoutingModule { }
