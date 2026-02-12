using Identity.Domain.Entities;
using Identity.Domain.Ports;
using Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Identity.Infrastructure.Repositories;

public sealed class RefreshTokenRepository(IdentityDbContext context) : IRefreshTokenRepository
{
    public async Task<RefreshToken?> GetByTokenAsync(string token, CancellationToken ct = default) =>
        await context.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == token, ct);

    public async Task AddAsync(RefreshToken refreshToken, CancellationToken ct = default) =>
        await context.RefreshTokens.AddAsync(refreshToken, ct);

    public async Task RevokeAllForUserAsync(Guid userId, CancellationToken ct = default)
    {
        var tokens = await context.RefreshTokens
            .Where(rt => rt.UserId == userId && rt.RevokedAt == null)
            .ToListAsync(ct);

        foreach (var token in tokens)
            token.Revoke();
    }

    public async Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        await context.SaveChangesAsync(ct);
}
