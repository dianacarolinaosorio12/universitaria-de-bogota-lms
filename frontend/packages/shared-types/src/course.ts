// Course types
export type CourseStatus = 'Draft' | 'Published' | 'Archived';
export type ActivityType = 'Video' | 'Document' | 'Quiz' | 'Assignment' | 'Forum' | 'LiveSession' | 'ExternalLink';
export type EnrollmentStatus = 'Active' | 'Completed' | 'Dropped' | 'Suspended';

export interface CourseDto {
  id: string;
  code: string;
  title: string;
  description: string;
  imageUrl?: string;
  teacherId: string;
  teacherName: string;
  status: CourseStatus;
  credits: number;
  faculty?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  maxStudents: number;
  enrolledCount: number;
  createdAt: string;
}

export interface CourseSummaryDto {
  id: string;
  code: string;
  title: string;
  imageUrl?: string;
  teacherName: string;
  status: string;
  credits: number;
  progressPercentage: number;
}

export interface CourseDetailDto {
  id: string;
  code: string;
  title: string;
  description: string;
  imageUrl?: string;
  teacherId: string;
  teacherName: string;
  status: string;
  credits: number;
  faculty?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  sections: SectionDto[];
}

export interface SectionDto {
  id: string;
  title: string;
  description?: string;
  order: number;
  activities: ActivityDto[];
}

export interface ActivityDto {
  id: string;
  title: string;
  description?: string;
  type: ActivityType;
  contentUrl?: string;
  order: number;
  xpReward: number;
  durationMinutes?: number;
  isRequired: boolean;
  dueDate?: string;
  isCompleted: boolean;
  grade?: number;
}

export interface EnrollmentDto {
  id: string;
  studentId: string;
  courseId: string;
  courseTitle: string;
  courseCode: string;
  status: EnrollmentStatus;
  progressPercentage: number;
  finalGrade?: number;
  enrolledAt: string;
  completedAt?: string;
}

export interface EnrollmentDetailDto {
  id: string;
  studentId: string;
  courseId: string;
  status: string;
  progressPercentage: number;
  finalGrade?: number;
  enrolledAt: string;
  activityProgresses: ActivityProgressDto[];
}

export interface ActivityProgressDto {
  id: string;
  activityId: string;
  isCompleted: boolean;
  grade?: number;
  completedAt?: string;
  timeSpentMinutes?: number;
}

export interface StudentGradeDto {
  courseId: string;
  courseTitle: string;
  courseCode: string;
  progressPercentage: number;
  finalGrade?: number;
  activityGrades: ActivityGradeDto[];
}

export interface ActivityGradeDto {
  activityId: string;
  activityTitle: string;
  activityType: string;
  isCompleted: boolean;
  grade?: number;
}

// Gamification types (mock for now - will be real when Gamification Service exists)
export interface GamificationStats {
  xp: number;
  level: number;
  levelName: string;
  xpForCurrentLevel: number;
  xpToNextLevel: number;
  streak: number;
  streakMultiplier: number;
  ranking: number;
  totalStudents: number;
  badges: Badge[];
  weeklyGoals: WeeklyGoal[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  requirement?: number;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  isCompleted: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  isCompleted: boolean;
  expiresAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'class' | 'assignment' | 'quiz' | 'exam';
  courseTitle: string;
  courseCode: string;
}
