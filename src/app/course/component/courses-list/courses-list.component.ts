import { Component, OnInit } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Course } from '../../domain/course.model';
import { CourseService } from '../../services/course.service';
import { courseActionTypes } from '../../store/course.actions';
import { getAllCourses } from '../../store/course.selectors';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;

  courseToBeUpdate: Course;

  isUpdateActivated = false;

  constructor(
    private courseService: CourseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.courses$ = this.store.select(getAllCourses);
  }

  deleteCourse(courseId: string) {
    this.store.dispatch(courseActionTypes.deleteCourse({ courseId }));
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdate = { ...course };
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    const update: Update<Course> = {
      id: this.courseToBeUpdate.id,
      changes: {
        ...this.courseToBeUpdate,
        ...updateForm.value,
      },
    };

    this.store.dispatch(courseActionTypes.updateCourse({ update }));

    this.isUpdateActivated = false;
    this.courseToBeUpdate = null;
  }
}
