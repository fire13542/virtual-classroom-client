import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualClassroomRoutingModule } from './virtual-classroom-routing.module';
import { VirtualClassroomComponent } from './virtual-classroom.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { QuizReviewComponent } from '../components/quiz-review/quiz-review.component';
import { CoursesStudentComponent } from '../components/courses-student/courses-student.component';
import { CoursesTeacherComponent } from '../components/courses-teacher/courses-teacher.component';
import { CoursesCarouselComponent } from '../components/course.components/courses-carousel/courses-carousel.component';
import { CourseTeacherComponent } from '../components/course-teacher/course-teacher.component';
import { CourseStudentComponent } from '../components/course-student/course-student.component';
import { LessonStudentComponent } from '../components/lesson-student/lesson-student.component';
import { LessonTeacherComponent } from '../components/lesson-teacher/lesson-teacher.component';
import { HomeworkTeacherComponent } from '../components/homework-teacher/homework-teacher.component';
import { HomeworkStudentComponent } from '../components/homework-student/homework-student.component';
import { QuizStudentComponent } from '../components/quiz-student/quiz-student.component';
import { QuizTeacherComponent } from '../components/quiz-teacher/quiz-teacher.component';
import { StudentsOfCourseComponent } from '../components/students-of-course/students-of-course.component';
import { MessageBoxComponent } from '../components/message-box/message-box.component';
import { ReciveContactUsComponent } from '../components/recive-contact-us/recive-contact-us.component';
import { GradesQuizComponent } from '../components/grades-quiz/grades-quiz.component';
import { GradesStudentComponent } from '../components/grades-student/grades-student.component';


@NgModule({
  declarations: [
    ProfileComponent,
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
    CommonModule,
    VirtualClassroomRoutingModule
  ]
})
export class VirtualClassroomModule { }
