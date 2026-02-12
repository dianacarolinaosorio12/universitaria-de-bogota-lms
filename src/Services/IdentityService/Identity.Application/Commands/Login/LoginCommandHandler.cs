using Identity.Application.DTOs;
using Identity.Application.Services;
using Identity.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Identity.Application.Commands.Login;

public sealed class LoginCommandHandler(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IJwtTokenGenerator jwtTokenGenerator,
    IPasswordHasher passwordHasher)
    : IRequestHandler<LoginCommand, AuthResultDto>
{
    public async Task<AuthResultDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByEmailAsync(request.Email, cancellationToken)
            ?? throw new UnauthorizedException("Credenciales inválidas.");

        if (!user.IsActive)
            throw new UnauthorizedException("La cuenta está desactivada.");

        if (!passwordHasher.Verify(request.Password, user.PasswordHash))
            throw new UnauthorizedException("Credenciales inválidas.");

        user.RecordLogin();
        await userRepository.UpdateAsync(user, cancellationToken);

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
