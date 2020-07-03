import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HelpComponent } from './components/help/help.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogAdminComponent } from './components/blog-admin/blog-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ArticleComponent } from './components/article/article.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { CourseStudentComponent } from './components/course-student/course-student.component';
import { CourseTeacherComponent } from './components/course-teacher/course-teacher.component';
import { LessonStudentComponent } from './components/lesson-student/lesson-student.component';
import { LessonTeacherComponent } from './components/lesson-teacher/lesson-teacher.component';
import { HomeworkStudentComponent } from './components/homework-student/homework-student.component';
import { HomeworkTeacherComponent } from './components/homework-teacher/homework-teacher.component';
import { NotAuthGuard } from './services/guards/not-auth-guard.service';
import { AdminGuard } from './services/guards/admin-guard.service';
import { AuthGuard } from './services/guards/auth-guard.service';
import { StudentGuard } from './services/guards/student-guard.service';
import { TeacherGuard } from './services/guards/teacher-guard.service';
import { QuizStudentComponent } from './components/quiz-student/quiz-student.component';
import { QuizTeacherComponent } from './components/quiz-teacher/quiz-teacher.component';
import { StudentsOfCourseComponent } from './components/students-of-course/students-of-course.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ReciveContactUsComponent } from './components/recive-contact-us/recive-contact-us.component';
import { QuizReviewComponent } from './components/quiz-review/quiz-review.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'admin', component: LoginAdminComponent, canActivate: [NotAuthGuard] },
  { path: 'help', component: HelpComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'recieve-contact-us', component: ReciveContactUsComponent, canActivate: [AdminGuard] },
  { path: 'blog', component: BlogComponent },
  { path: 'article/:id/:title', component: ArticleComponent },
  { path: 'blog-admin', component: BlogAdminComponent, canActivate: [AdminGuard] },
  { path: 'upload-images', component: UploadImagesComponent, canActivate: [AdminGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'messages-box', component: MessageBoxComponent, canActivate: [AuthGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] },
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
  { path: 'students-of-course', component: StudentsOfCourseComponent, canActivate: [TeacherGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
