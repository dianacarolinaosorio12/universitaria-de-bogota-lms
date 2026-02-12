using Identity.Application.DTOs;
using Identity.Application.Services;
using Identity.Domain.Ports;
using MediatR;
using UB.SharedKernel.Application.Exceptions;

namespace Identity.Application.Commands.RefreshToken;

public sealed class RefreshTokenCommandHandler(
    IUserRepository userRepository,
    IRefreshTokenRepository refreshTokenRepository,
    IJwtTokenGenerator jwtTokenGenerator)
    : IRequestHandler<RefreshTokenCommand, AuthResultDto>
{
    public async Task<AuthResultDto> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var existingToken = await refreshTokenRepository.GetByTokenAsync(request.Token, cancellationToken)
            ?? throw new UnauthorizedException("Token inválido.");

        if (!existingToken.IsActive)
            throw new UnauthorizedException("Token expirado o revocado.");

        var user = await userRepository.GetByIdAsync(existingToken.UserId, cancellationToken)
            ?? throw new UnauthorizedException("Usuario no encontrado.");

        if (!user.IsActive)
            throw new UnauthorizedException("La cuenta está desactivada.");

        existingToken.Revoke();
        await refreshTokenRepository.SaveChangesAsync(cancellationToken);

        var accessToken = jwtTokenGenerator.GenerateAccessToken(user);
        var newRefreshTokenValue = jwtTokenGenerator.GenerateRefreshToken();
        var expiresAt = jwtTokenGenerator.GetAccessTokenExpiration();

        var newRefreshToken = user.AddRefreshToken(newRefreshTokenValue, DateTime.UtcNow.AddDays(7));
        await refreshTokenRepository.AddAsync(newRefreshToken, cancellationToken);
        await refreshTokenRepository.SaveChangesAsync(cancellationToken);

        return new AuthResultDto(
            accessToken,
            newRefreshTokenValue,
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
