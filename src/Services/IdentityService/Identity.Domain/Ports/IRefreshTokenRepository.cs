using Identity.Domain.Entities;

namespace Identity.Domain.Ports;

public interface IRefreshTokenRepository
{
    Task<RefreshToken?> GetByTokenAsync(string token, CancellationToken ct = default);
    Task AddAsync(RefreshToken refreshToken, CancellationToken ct = default);
    Task RevokeAllForUserAsync(Guid userId, CancellationToken ct = default);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
