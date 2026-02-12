using Identity.Domain.Entities;
using Identity.Domain.Ports;
using Identity.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Identity.Infrastructure.Repositories;

public sealed class UserRepository(IdentityDbContext context) : IUserRepository
{
    public async Task<User?> GetByIdAsync(Guid id, CancellationToken ct = default) =>
        await context.Users.Include(u => u.RefreshTokens).FirstOrDefaultAsync(u => u.Id == id, ct);

    public async Task<IReadOnlyList<User>> GetAllAsync(CancellationToken ct = default) =>
        await context.Users.ToListAsync(ct);

    public async Task AddAsync(User entity, CancellationToken ct = default) =>
        await context.Users.AddAsync(entity, ct);

    public Task UpdateAsync(User entity, CancellationToken ct = default)
    {
        context.Users.Update(entity);
        return Task.CompletedTask;
    }

    public Task DeleteAsync(User entity, CancellationToken ct = default)
    {
        context.Users.Remove(entity);
        return Task.CompletedTask;
    }

    public async Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        await context.SaveChangesAsync(ct);

    public async Task<User?> GetByEmailAsync(string email, CancellationToken ct = default) =>
        await context.Users.Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync(u => EF.Property<string>(u, "Email") == email.ToLowerInvariant().Trim(), ct);

    public async Task<User?> GetByExternalIdAsync(string externalId, CancellationToken ct = default) =>
        await context.Users.FirstOrDefaultAsync(u => u.ExternalId == externalId, ct);

    public async Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default) =>
        await context.Users.AnyAsync(u => EF.Property<string>(u, "Email") == email.ToLowerInvariant().Trim(), ct);
}
