import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { describe, beforeEach, it, expect } from 'vitest'; // 👈 Adicione esta linha
import { Course } from '../model/course';
import { courseResolver } from './course-resolver';

describe('courseResolver', () => {
  const executeResolver: ResolveFn<Course> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => courseResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
