using Identity.Domain.Entities;
using UB.SharedKernel.Domain;

namespace Identity.Domain.Ports;

public interface IUserRepository : IRepository<User, Guid>
{
    Task<User?> GetByEmailAsync(string email, CancellationToken ct = default);
    Task<User?> GetByExternalIdAsync(string externalId, CancellationToken ct = default);
    Task<bool> ExistsByEmailAsync(string email, CancellationToken ct = default);
}
