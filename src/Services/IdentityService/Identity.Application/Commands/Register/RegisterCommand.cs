using Identity.Application.DTOs;
using MediatR;

namespace Identity.Application.Commands.Register;

public sealed record RegisterCommand(
    string Email,
    string Password,
    string FirstName,
    string LastName,
    string Role,
    string? Department = null,
    string? Faculty = null) : IRequest<AuthResultDto>;
