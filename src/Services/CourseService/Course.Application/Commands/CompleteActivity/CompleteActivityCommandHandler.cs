using Course.Application.DTOs;
using Course.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Course.Application.Commands.CompleteActivity;

public sealed class CompleteActivityCommandHandler(
    IEnrollmentRepository enrollmentRepository,
    ICourseRepository courseRepository)
    : IRequestHandler<CompleteActivityCommand, ActivityProgressDto>
{
    public async Task<ActivityProgressDto> Handle(CompleteActivityCommand request, CancellationToken cancellationToken)
    {
        var enrollment = await enrollmentRepository.GetWithProgressAsync(request.EnrollmentId, cancellationToken)
            ?? throw new NotFoundException("La inscripción no fue encontrada.");

        var course = await courseRepository.GetWithSectionsAsync(enrollment.CourseId, cancellationToken)
            ?? throw new NotFoundException("El curso no fue encontrado.");

        var totalActivities = course.Sections.Sum(s => s.Activities.Count);

        enrollment.RecordActivityCompletion(request.ActivityId, request.Grade);
        enrollment.RecalculateProgress(totalActivities);

        await enrollmentRepository.UpdateAsync(enrollment, cancellationToken);
        await enrollmentRepository.SaveChangesAsync(cancellationToken);

        var progress = enrollment.ActivityProgresses.First(p => p.ActivityId == request.ActivityId);

        return new ActivityProgressDto(
            progress.Id,
            progress.ActivityId,
            progress.IsCompleted,
            progress.Grade,
            progress.CompletedAt,
            progress.TimeSpentMinutes);
    }
}
