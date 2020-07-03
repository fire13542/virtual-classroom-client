import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ɵɵstylePropInterpolate8 } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
 
// const config: SocketIoConfig = {url: 'http://localhost:3000'}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HelpComponent } from './components/help/help.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogAdminComponent } from './components/blog-admin/blog-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeCarouselComponent } from './components/home.components/home-carousel/home-carousel.component';
import { AboutComponent } from './components/home.components/about/about.component';
import { FooterComponent } from './components/home.components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';
import { ArticleComponent } from './components/article/article.component';
import { BlogService } from './services/blog.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CoursesStudentComponent } from './components/courses-student/courses-student.component';
import { CoursesTeacherComponent } from './components/courses-teacher/courses-teacher.component';
import { CoursesCarouselComponent } from './components/course.components/courses-carousel/courses-carousel.component';
import { CourseTeacherComponent } from './components/course-teacher/course-teacher.component';
import { CourseStudentComponent } from './components/course-student/course-student.component';
import { LessonStudentComponent } from './components/lesson-student/lesson-student.component';
import { LessonTeacherComponent } from './components/lesson-teacher/lesson-teacher.component';
import { HomeworkTeacherComponent } from './components/homework-teacher/homework-teacher.component';
import { HomeworkStudentComponent } from './components/homework-student/homework-student.component';
import { QuizStudentComponent } from './components/quiz-student/quiz-student.component';
import { QuizTeacherComponent } from './components/quiz-teacher/quiz-teacher.component';
import { StudentsOfCourseComponent } from './components/students-of-course/students-of-course.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { ReciveContactUsComponent } from './components/recive-contact-us/recive-contact-us.component';
import { GradesQuizComponent } from './components/grades-quiz/grades-quiz.component';
import { GradesStudentComponent } from './components/grades-student/grades-student.component';
import { QuizReviewComponent } from './components/quiz-review/quiz-review.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
    BlogComponent,
    BlogAdminComponent,
    NotFoundComponent,
    NavbarComponent,
    HomeCarouselComponent,
    AboutComponent,
    FooterComponent,
    LoginAdminComponent,
    UploadImagesComponent,
    ArticleComponent,
    ProfileComponent,
    ResetPasswordComponent,
    CoursesStudentComponent,
    CoursesTeacherComponent,
    CoursesCarouselComponent,
    CourseTeacherComponent,
    CourseStudentComponent,
    LessonStudentComponent,
    LessonTeacherComponent,
    HomeworkTeacherComponent,
    HomeworkStudentComponent,
    QuizStudentComponent,
    QuizTeacherComponent,
    StudentsOfCourseComponent,
    MessageBoxComponent,
    ReciveContactUsComponent,
    GradesQuizComponent,
    GradesStudentComponent,
    QuizReviewComponent
  ],
  imports: [
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    // SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
