using FluentValidation;

namespace Course.Application.Commands.CreateCourse;

public sealed class CreateCourseCommandValidator : AbstractValidator<CreateCourseCommand>
{
    public CreateCourseCommandValidator()
    {
        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("El código del curso es requerido.")
            .MaximumLength(20).WithMessage("El código no puede exceder 20 caracteres.");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("El título del curso es requerido.")
            .MaximumLength(200).WithMessage("El título no puede exceder 200 caracteres.");

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("La descripción del curso es requerida.")
            .MaximumLength(2000).WithMessage("La descripción no puede exceder 2000 caracteres.");

        RuleFor(x => x.TeacherId)
            .NotEqual(Guid.Empty).WithMessage("El docente es requerido.");

        RuleFor(x => x.TeacherName)
            .NotEmpty().WithMessage("El nombre del docente es requerido.");

        RuleFor(x => x.Credits)
            .GreaterThan(0).WithMessage("Los créditos deben ser mayores a 0.")
            .LessThanOrEqualTo(10).WithMessage("Los créditos no pueden exceder 10.");

        RuleFor(x => x.MaxStudents)
            .GreaterThan(0).WithMessage("El número máximo de estudiantes debe ser mayor a 0.")
            .LessThanOrEqualTo(500).WithMessage("El número máximo de estudiantes no puede exceder 500.");
    }
}
