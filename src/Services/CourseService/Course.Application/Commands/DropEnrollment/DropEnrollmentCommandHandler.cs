using Course.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Course.Application.Commands.DropEnrollment;

public sealed class DropEnrollmentCommandHandler(
    IEnrollmentRepository enrollmentRepository)
    : IRequestHandler<DropEnrollmentCommand, Unit>
{
    public async Task<Unit> Handle(DropEnrollmentCommand request, CancellationToken cancellationToken)
    {
        var enrollment = await enrollmentRepository.GetByIdAsync(request.EnrollmentId, cancellationToken)
            ?? throw new NotFoundException("La inscripción no fue encontrada.");

        enrollment.Drop();

        await enrollmentRepository.UpdateAsync(enrollment, cancellationToken);
        await enrollmentRepository.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
