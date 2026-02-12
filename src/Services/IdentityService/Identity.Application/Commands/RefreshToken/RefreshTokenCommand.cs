using Identity.Application.DTOs;
using MediatR;

namespace Identity.Application.Commands.RefreshToken;

public sealed record RefreshTokenCommand(string Token) : IRequest<AuthResultDto>;
