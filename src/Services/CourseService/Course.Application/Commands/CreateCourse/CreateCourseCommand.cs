using Course.Application.DTOs;
using MediatR;

namespace Course.Application.Commands.CreateCourse;

public sealed record CreateCourseCommand(
    string Code,
    string Title,
    string Description,
    Guid TeacherId,
    string TeacherName,
    int Credits,
    string? Faculty,
    string? Department,
    int MaxStudents,
    string? ImageUrl,
    DateTime? StartDate,
    DateTime? EndDate) : IRequest<CourseDto>;
