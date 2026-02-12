using Course.Domain.Enums;
using UB.SharedKernel.Domain;

namespace Course.Domain.Entities;

public sealed class CourseEntity : AggregateRoot<Guid>
{
    public string Code { get; private set; } = string.Empty;
    public string Title { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string? ImageUrl { get; private set; }
    public Guid TeacherId { get; private set; }
    public string TeacherName { get; private set; } = string.Empty;
    public CourseStatus Status { get; private set; }
    public int Credits { get; private set; }
    public string? Faculty { get; private set; }
    public string? Department { get; private set; }
    public DateTime? StartDate { get; private set; }
    public DateTime? EndDate { get; private set; }
    public int MaxStudents { get; private set; } = 40;

    private readonly List<Section> _sections = [];
    public IReadOnlyList<Section> Sections => _sections.AsReadOnly();

    private CourseEntity() { }

    public static CourseEntity Create(
        string code,
        string title,
        string description,
        Guid teacherId,
        string teacherName,
        int credits,
        string? faculty = null,
        string? department = null,
        int maxStudents = 40,
        string? imageUrl = null,
        DateTime? startDate = null,
        DateTime? endDate = null)
    {
        var course = new CourseEntity
        {
            Id = Guid.NewGuid(),
            Code = code,
            Title = title,
            Description = description,
            TeacherId = teacherId,
            TeacherName = teacherName,
            Credits = credits,
            Faculty = faculty,
            Department = department,
            MaxStudents = maxStudents,
            ImageUrl = imageUrl,
            StartDate = startDate,
            EndDate = endDate,
            Status = CourseStatus.Draft,
            CreatedAt = DateTime.UtcNow
        };

        return course;
    }

    public void Publish()
    {
        Status = CourseStatus.Published;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Archive()
    {
        Status = CourseStatus.Archived;
        UpdatedAt = DateTime.UtcNow;
    }

    public Section AddSection(string title, string? description, int order)
    {
        var section = Section.Create(Id, title, description, order);
        _sections.Add(section);
        return section;
    }

    public void UpdateInfo(string title, string description, int credits)
    {
        Title = title;
        Description = description;
        Credits = credits;
        UpdatedAt = DateTime.UtcNow;
    }
}
