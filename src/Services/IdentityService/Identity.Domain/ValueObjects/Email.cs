using System.Text.RegularExpressions;
using UB.SharedKernel.Domain;

namespace Identity.Domain.ValueObjects;

public sealed partial class Email : ValueObject
{
    public string Value { get; }

    private Email(string value) => Value = value.ToLowerInvariant().Trim();

    public static Email Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Email cannot be empty.");

        if (!EmailRegex().IsMatch(value))
            throw new ArgumentException($"Invalid email format: {value}");

        return new Email(value);
    }

    protected override IEnumerable<object?> GetEqualityComponents()
    {
        yield return Value;
    }

    public override string ToString() => Value;

    public static implicit operator string(Email email) => email.Value;

    [GeneratedRegex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled)]
    private static partial Regex EmailRegex();
}
