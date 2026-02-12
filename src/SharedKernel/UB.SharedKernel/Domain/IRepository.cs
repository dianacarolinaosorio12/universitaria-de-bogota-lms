namespace UB.SharedKernel.Domain;

public interface IRepository<T, in TId> where T : AggregateRoot<TId> where TId : notnull
{
    Task<T?> GetByIdAsync(TId id, CancellationToken ct = default);
    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken ct = default);
    Task AddAsync(T entity, CancellationToken ct = default);
    Task UpdateAsync(T entity, CancellationToken ct = default);
    Task DeleteAsync(T entity, CancellationToken ct = default);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
