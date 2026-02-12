using Course.Domain.Entities;
using UB.SharedKernel.Domain;

namespace Course.Domain.Ports;

public interface ICourseRepository : IRepository<CourseEntity, Guid>
{
    Task<CourseEntity?> GetByCodeAsync(string code, CancellationToken ct = default);
    Task<IReadOnlyList<CourseEntity>> GetByTeacherIdAsync(Guid teacherId, CancellationToken ct = default);
    Task<IReadOnlyList<CourseEntity>> GetPublishedCoursesAsync(CancellationToken ct = default);
    Task<CourseEntity?> GetWithSectionsAsync(Guid id, CancellationToken ct = default);
}
