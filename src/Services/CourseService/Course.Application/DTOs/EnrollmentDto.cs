namespace Course.Application.DTOs;

public sealed record EnrollmentDto(
    Guid Id, Guid StudentId, Guid CourseId, string CourseTitle, string CourseCode,
    string Status, double ProgressPercentage,
    double? FinalGrade, DateTime EnrolledAt, DateTime? CompletedAt);

public sealed record EnrollmentDetailDto(
    Guid Id, Guid StudentId, Guid CourseId,
    string Status, double ProgressPercentage,
    double? FinalGrade, DateTime EnrolledAt,
    List<ActivityProgressDto> ActivityProgresses);

public sealed record ActivityProgressDto(
    Guid Id, Guid ActivityId, bool IsCompleted,
    double? Grade, DateTime? CompletedAt, int? TimeSpentMinutes);

public sealed record StudentGradeDto(
    Guid CourseId, string CourseTitle, string CourseCode,
    double ProgressPercentage, double? FinalGrade,
    List<ActivityGradeDto> ActivityGrades);

public sealed record ActivityGradeDto(
    Guid ActivityId, string ActivityTitle, string ActivityType,
    bool IsCompleted, double? Grade);
