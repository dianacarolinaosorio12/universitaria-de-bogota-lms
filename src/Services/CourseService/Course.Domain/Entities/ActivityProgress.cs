using UB.SharedKernel.Domain;

namespace Course.Domain.Entities;

public sealed class ActivityProgress : Entity<Guid>
{
    public Guid EnrollmentId { get; private set; }
    public Guid ActivityId { get; private set; }
    public bool IsCompleted { get; private set; }
    public double? Grade { get; private set; }
    public DateTime? CompletedAt { get; private set; }
    public int? TimeSpentMinutes { get; private set; }

    private ActivityProgress() { }

    public static ActivityProgress Create(Guid enrollmentId, Guid activityId) =>
        new()
        {
            Id = Guid.NewGuid(),
            EnrollmentId = enrollmentId,
            ActivityId = activityId,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

    public void MarkCompleted(double? grade = null, int? timeSpentMinutes = null)
    {
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
        Grade = grade;
        TimeSpentMinutes = timeSpentMinutes;
        UpdatedAt = DateTime.UtcNow;
    }
}
