using MediatR;

namespace UB.SharedKernel.Domain;

public interface IDomainEvent : INotification
{
    Guid EventId => Guid.NewGuid();
    DateTime OccurredOn => DateTime.UtcNow;
}
