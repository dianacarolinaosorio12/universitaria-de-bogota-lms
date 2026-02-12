using Course.Domain.Entities;
using UB.SharedKernel.Domain;

namespace Course.Domain.Ports;

public interface IEnrollmentRepository : IRepository<Enrollment, Guid>
{
    Task<IReadOnlyList<Enrollment>> GetByStudentIdAsync(Guid studentId, CancellationToken ct = default);
    Task<Enrollment?> GetByStudentAndCourseAsync(Guid studentId, Guid courseId, CancellationToken ct = default);
    Task<IReadOnlyList<Enrollment>> GetByCourseIdAsync(Guid courseId, CancellationToken ct = default);
    Task<Enrollment?> GetWithProgressAsync(Guid id, CancellationToken ct = default);
}
