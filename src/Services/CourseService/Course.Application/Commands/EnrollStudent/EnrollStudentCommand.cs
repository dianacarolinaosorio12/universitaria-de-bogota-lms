using Course.Application.DTOs;
using MediatR;

namespace Course.Application.Commands.EnrollStudent;

public sealed record EnrollStudentCommand(Guid StudentId, Guid CourseId) : IRequest<EnrollmentDto>;
