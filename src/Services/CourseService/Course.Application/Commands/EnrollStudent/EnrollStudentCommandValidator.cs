using FluentValidation;

namespace Course.Application.Commands.EnrollStudent;

public sealed class EnrollStudentCommandValidator : AbstractValidator<EnrollStudentCommand>
{
    public EnrollStudentCommandValidator()
    {
        RuleFor(x => x.StudentId)
            .NotEqual(Guid.Empty).WithMessage("El estudiante es requerido.");

        RuleFor(x => x.CourseId)
            .NotEqual(Guid.Empty).WithMessage("El curso es requerido.");
    }
}
