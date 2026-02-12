namespace Course.Application.DTOs;

public sealed record CourseDto(
    Guid Id, string Code, string Title, string Description, string? ImageUrl,
    Guid TeacherId, string TeacherName, string Status,
    int Credits, string? Faculty, string? Department,
    DateTime? StartDate, DateTime? EndDate,
    int MaxStudents, int EnrolledCount, DateTime CreatedAt);

public sealed record CourseSummaryDto(
    Guid Id, string Code, string Title, string? ImageUrl,
    string TeacherName, string Status, int Credits, double ProgressPercentage);

public sealed record CourseDetailDto(
    Guid Id, string Code, string Title, string Description, string? ImageUrl,
    Guid TeacherId, string TeacherName, string Status,
    int Credits, string? Faculty, string? Department,
    DateTime? StartDate, DateTime? EndDate,
    List<SectionDto> Sections);

public sealed record SectionDto(
    Guid Id, string Title, string? Description, int Order,
    List<ActivityDto> Activities);

public sealed record ActivityDto(
    Guid Id, string Title, string? Description, string Type,
    string? ContentUrl, int Order, int XpReward,
    int? DurationMinutes, bool IsRequired, DateTime? DueDate,
    bool IsCompleted, double? Grade);
