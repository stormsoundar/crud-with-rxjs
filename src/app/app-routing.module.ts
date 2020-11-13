import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './course/component/courses-list/courses-list.component';
import { CreateCourseComponent } from './course/component/create-course/create-course.component';
import { CourseResolver } from './course/course.resolver';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesListComponent,
    resolve: { courses: CourseResolver },
  },
  { path: 'create-course', component: CreateCourseComponent },
  { path: '**', redirectTo: 'courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
