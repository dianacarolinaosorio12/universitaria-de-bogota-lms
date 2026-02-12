using Identity.Domain.Entities;

namespace Identity.Application.Services;

public interface IJwtTokenGenerator
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    DateTime GetAccessTokenExpiration();
}
