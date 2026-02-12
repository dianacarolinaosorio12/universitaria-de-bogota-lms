using Course.Domain.Enums;
using UB.SharedKernel.Domain;

namespace Course.Domain.Entities;

public sealed class Enrollment : AggregateRoot<Guid>
{
    public Guid StudentId { get; private set; }
    public Guid CourseId { get; private set; }
    public EnrollmentStatus Status { get; private set; }
    public double ProgressPercentage { get; private set; }
    public double? FinalGrade { get; private set; }
    public DateTime EnrolledAt { get; private set; }
    public DateTime? CompletedAt { get; private set; }

    private readonly List<ActivityProgress> _activityProgresses = [];
    public IReadOnlyList<ActivityProgress> ActivityProgresses => _activityProgresses.AsReadOnly();

    private Enrollment() { }

    public static Enrollment Create(Guid studentId, Guid courseId)
    {
        var enrollment = new Enrollment
        {
            Id = Guid.NewGuid(),
            StudentId = studentId,
            CourseId = courseId,
            Status = EnrollmentStatus.Active,
            ProgressPercentage = 0,
            EnrolledAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow
        };

        return enrollment;
    }

    public void RecordActivityCompletion(Guid activityId, double? grade = null)
    {
        var progress = _activityProgresses.FirstOrDefault(p => p.ActivityId == activityId);

        if (progress is null)
        {
            progress = ActivityProgress.Create(Id, activityId);
            _activityProgresses.Add(progress);
        }

        progress.MarkCompleted(grade);
    }

    public void RecalculateProgress(int totalActivities)
    {
        if (totalActivities <= 0)
        {
            ProgressPercentage = 0;
            return;
        }

        var completedCount = _activityProgresses.Count(p => p.IsCompleted);
        ProgressPercentage = Math.Round((double)completedCount / totalActivities * 100, 2);
    }

    public void Complete()
    {
        Status = EnrollmentStatus.Completed;
        CompletedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Drop()
    {
        Status = EnrollmentStatus.Dropped;
        UpdatedAt = DateTime.UtcNow;
    }
}
