using Identity.Application.DTOs;
using Identity.Application.Services;
using Identity.Domain.Entities;
using Identity.Domain.Enums;
using Identity.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Identity.Application.Commands.Register;

public sealed class RegisterCommandHandler(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher passwordHasher)
    : IRequestHandler<RegisterCommand, AuthResultDto>
{
    public async Task<AuthResultDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (await userRepository.ExistsByEmailAsync(request.Email, cancellationToken))
            throw new ConflictException("Ya existe un usuario con ese email.");

        var role = Enum.Parse<UserRole>(request.Role);
        var passwordHash = passwordHasher.Hash(request.Password);

        var user = User.Create(
            request.Email,
            passwordHash,
            request.FirstName,
            request.LastName,
            role,
            request.Department,
            request.Faculty);

        await userRepository.AddAsync(user, cancellationToken);
        await userRepository.SaveChangesAsync(cancellationToken);

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user);
        var refreshTokenValue = jwtTokenGenerator.GenerateRefreshToken();
        var expiresAt = jwtTokenGenerator.GetAccessTokenExpiration();

        var refreshToken = user.AddRefreshToken(refreshTokenValue, DateTime.UtcNow.AddDays(7));
        await refreshTokenRepository.AddAsync(refreshToken, cancellationToken);
        await refreshTokenRepository.SaveChangesAsync(cancellationToken);

        return new AuthResultDto(
            accessToken,
            refreshTokenValue,
            expiresAt,
            new UserDto(
                user.Id,
                user.Email.Value,
                user.FirstName,
                user.LastName,
                user.Role.ToString(),
                user.Department,
                user.Faculty));
    }
}
