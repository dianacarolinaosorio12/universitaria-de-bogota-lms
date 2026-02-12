import type { CourseDetailDto, CourseSummaryDto } from '@ub-lms/shared-types';
import { apiClient } from './client';

export const courseApi = {
  getPublished: () =>
    apiClient.get<CourseSummaryDto[]>('/courses'),

  getById: (id: string) =>
    apiClient.get<CourseDetailDto>(`/courses/${id}`),
};
