using Course.Application.DTOs;
using Course.Domain.Entities;
using Course.Domain.Ports;
using MediatR;

namespace Course.Application.Commands.CreateCourse;

public sealed class CreateCourseCommandHandler(
    ICourseRepository courseRepository)
    : IRequestHandler<CreateCourseCommand, CourseDto>
{
    public async Task<CourseDto> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        var course = CourseEntity.Create(
            request.Code,
            request.Title,
            request.Description,
            request.TeacherId,
            request.TeacherName,
            request.Credits,
            request.Faculty,
            request.Department,
            request.MaxStudents,
            request.ImageUrl,
            request.StartDate,
            request.EndDate);

        await courseRepository.AddAsync(course, cancellationToken);
        await courseRepository.SaveChangesAsync(cancellationToken);

        return new CourseDto(
            course.Id,
            course.Code,
            course.Title,
            course.Description,
            course.ImageUrl,
            course.TeacherId,
            course.TeacherName,
            course.Status.ToString(),
            course.Credits,
            course.Faculty,
            course.Department,
            course.StartDate,
            course.EndDate,
            course.MaxStudents,
            EnrolledCount: 0,
            course.CreatedAt);
    }
}
