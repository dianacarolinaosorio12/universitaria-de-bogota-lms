using Course.Application.DTOs;
using MediatR;

namespace Course.Application.Commands.CompleteActivity;

public sealed record CompleteActivityCommand(
    Guid EnrollmentId, Guid ActivityId, double? Grade) : IRequest<ActivityProgressDto>;
