namespace UB.SharedKernel.Contracts.IntegrationEvents;

public abstract record IntegrationEvent
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public DateTime OccurredOn { get; init; } = DateTime.UtcNow;
}

public sealed record XpEarnedEvent(Guid UserId, int Points, string Source) : IntegrationEvent;
public sealed record LevelUpEvent(Guid UserId, int NewLevel, string LevelName) : IntegrationEvent;
public sealed record BadgeUnlockedEvent(Guid UserId, string BadgeId, string BadgeName) : IntegrationEvent;
public sealed record StudentAtRiskEvent(Guid StudentId, double RiskScore, string Reason) : IntegrationEvent;
public sealed record TaskGradedEvent(Guid StudentId, Guid TaskId, double Grade) : IntegrationEvent;
public sealed record VideoCompletedEvent(Guid StudentId, Guid VideoId, TimeSpan WatchTime) : IntegrationEvent;
public sealed record ForumPostCreatedEvent(Guid UserId, Guid PostId, Guid ForumId) : IntegrationEvent;
public sealed record ClassStartedEvent(Guid TeacherId, Guid ClassId, string MeetingUrl) : IntegrationEvent;
public sealed record UserLoggedInEvent(Guid UserId, string IpAddress) : IntegrationEvent;
