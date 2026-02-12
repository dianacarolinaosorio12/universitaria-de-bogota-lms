using Course.Domain.Enums;
using UB.SharedKernel.Domain;

namespace Course.Domain.Entities;

public sealed class Section : Entity<Guid>
{
    public Guid CourseId { get; private set; }
    public string Title { get; private set; } = string.Empty;
    public string? Description { get; private set; }
    public int Order { get; private set; }
    public bool IsVisible { get; private set; } = true;

    private readonly List<Activity> _activities = [];
    public IReadOnlyList<Activity> Activities => _activities.AsReadOnly();

    private Section() { }

    public static Section Create(
        Guid courseId,
        string title,
        string? description,
        int order) =>
        new()
        {
            Id = Guid.NewGuid(),
            CourseId = courseId,
            Title = title,
            Description = description,
            Order = order,
            CreatedAt = DateTime.UtcNow
        };

    public Activity AddActivity(
        string title,
        ActivityType type,
        string? contentUrl,
        string? description,
        int order,
        int xpReward,
        int? durationMinutes)
    {
        var activity = Activity.Create(Id, title, type, contentUrl, description, order, xpReward, durationMinutes);
        _activities.Add(activity);
        return activity;
    }
}
