using Course.Application.DTOs;
using Course.Domain.Entities;
using Course.Domain.Enums;
using Course.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Course.Application.Commands.EnrollStudent;

public sealed class EnrollStudentCommandHandler(
    ICourseRepository courseRepository,
    IEnrollmentRepository enrollmentRepository)
    : IRequestHandler<EnrollStudentCommand, EnrollmentDto>
{
    public async Task<EnrollmentDto> Handle(EnrollStudentCommand request, CancellationToken cancellationToken)
    {
        var course = await courseRepository.GetByIdAsync(request.CourseId, cancellationToken)
            ?? throw new NotFoundException("El curso no fue encontrado.");

        if (course.Status != CourseStatus.Published)
            throw new AppException("Solo se puede inscribir en cursos publicados.");

        var existingEnrollment = await enrollmentRepository.GetByStudentAndCourseAsync(
            request.StudentId, request.CourseId, cancellationToken);

        if (existingEnrollment is not null)
            throw new ConflictException("El estudiante ya está inscrito en este curso.");

        var enrollment = Enrollment.Create(request.StudentId, request.CourseId);

        await enrollmentRepository.AddAsync(enrollment, cancellationToken);
        await enrollmentRepository.SaveChangesAsync(cancellationToken);

        return new EnrollmentDto(
            enrollment.Id,
            enrollment.StudentId,
            enrollment.CourseId,
            course.Title,
            course.Code,
            enrollment.Status.ToString(),
            enrollment.ProgressPercentage,
            enrollment.FinalGrade,
            enrollment.EnrolledAt,
            enrollment.CompletedAt);
    }
}
