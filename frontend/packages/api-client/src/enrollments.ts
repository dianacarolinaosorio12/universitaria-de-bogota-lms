import type { EnrollmentDto, CourseDetailDto, StudentGradeDto, ActivityProgressDto } from '@ub-lms/shared-types';
import { apiClient } from './client';

export const enrollmentApi = {
  enroll: (courseId: string) =>
    apiClient.post<EnrollmentDto>('/enrollments', { courseId }),

  getMy: () =>
    apiClient.get<EnrollmentDto[]>('/enrollments/my'),

  getMyCourseDetail: (courseId: string) =>
    apiClient.get<CourseDetailDto>(`/enrollments/my/${courseId}`),

  completeActivity: (enrollmentId: string, activityId: string, grade?: number) =>
    apiClient.post<ActivityProgressDto>(`/enrollments/${enrollmentId}/activities/${activityId}/complete`, { grade }),

  drop: (id: string) =>
    apiClient.delete<void>(`/enrollments/${id}`),

  getMyGrades: () =>
    apiClient.get<StudentGradeDto[]>('/enrollments/my/grades'),
};
