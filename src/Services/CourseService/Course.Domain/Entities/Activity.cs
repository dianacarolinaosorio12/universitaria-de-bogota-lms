using Course.Domain.Enums;
using UB.SharedKernel.Domain;

namespace Course.Domain.Entities;

public sealed class Activity : Entity<Guid>
{
    public Guid SectionId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public ActivityType Type { get; private set; }
    public string? ContentUrl { get; private set; }
    public int Order { get; private set; }
    public int XpReward { get; private set; }
    public int? DurationMinutes { get; private set; }
    public bool IsRequired { get; private set; } = true;
    public DateTime? DueDate { get; private set; }

    private Activity() { }

    public static Activity Create(
        Guid sectionId,
        string title,
        ActivityType type,
        string? contentUrl,
        string? description,
        int order,
        int xpReward,
        int? durationMinutes) =>
        new()
        {
            Id = Guid.NewGuid(),
            SectionId = sectionId,
            Title = title,
            Type = type,
            ContentUrl = contentUrl,
            Description = description,
            Order = order,
            XpReward = xpReward,
            DurationMinutes = durationMinutes,
            CreatedAt = DateTime.UtcNow
        };
}
