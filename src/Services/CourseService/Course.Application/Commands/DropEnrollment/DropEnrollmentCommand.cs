using MediatR;

namespace Course.Application.Commands.DropEnrollment;

public sealed record DropEnrollmentCommand(Guid EnrollmentId) : IRequest<Unit>;
