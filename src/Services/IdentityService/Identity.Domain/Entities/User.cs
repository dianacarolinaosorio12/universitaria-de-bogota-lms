using Identity.Domain.Enums;
using Identity.Domain.ValueObjects;
using UB.SharedKernel.Domain;

namespace Identity.Domain.Entities;

public sealed class User : AggregateRoot<Guid>
{
    public string? ExternalId { get; private set; }
    public Email Email { get; private set; } = null!;
    public string PasswordHash { get; private set; } = string.Empty;
    public string FirstName { get; private set; } = string.Empty;
    public string LastName { get; private set; } = string.Empty;
    public UserRole Role { get; private set; }
    public string? Department { get; private set; }
    public string? Faculty { get; private set; }
    public bool IsActive { get; private set; } = true;
    public bool MfaEnabled { get; private set; }
    public DateTime? LastLoginAt { get; private set; }

    private readonly List<RefreshToken> _refreshTokens = [];
    public IReadOnlyList<RefreshToken> RefreshTokens => _refreshTokens.AsReadOnly();

    private User() { }

    public static User Create(
        string email,
        string passwordHash,
        string firstName,
        string lastName,
        UserRole role,
        string? department = null,
        string? faculty = null)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = Email.Create(email),
            PasswordHash = passwordHash,
            FirstName = firstName,
            LastName = lastName,
            Role = role,
            Department = department,
            Faculty = faculty,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        return user;
    }

    public static User CreateFromSso(
        string externalId,
        string email,
        string firstName,
        string lastName,
        UserRole role)
    {
        var user = new User
        {
            Id = Guid.NewGuid(),
            ExternalId = externalId,
            Email = Email.Create(email),
            FirstName = firstName,
            LastName = lastName,
            Role = role,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        return user;
    }

    public void RecordLogin() => LastLoginAt = DateTime.UtcNow;

    public void Deactivate()
    {
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateProfile(string firstName, string lastName, string? department, string? faculty)
    {
        FirstName = firstName;
        LastName = lastName;
        Department = department;
        Faculty = faculty;
        UpdatedAt = DateTime.UtcNow;
    }

    public void ChangePassword(string newPasswordHash)
    {
        PasswordHash = newPasswordHash;
        UpdatedAt = DateTime.UtcNow;
    }

    public RefreshToken AddRefreshToken(string token, DateTime expiresAt)
    {
        var refreshToken = RefreshToken.Create(Id, token, expiresAt);
        _refreshTokens.Add(refreshToken);
        return refreshToken;
    }

    public void RevokeRefreshToken(string token)
    {
        var refreshToken = _refreshTokens.FirstOrDefault(t => t.Token == token);
        refreshToken?.Revoke();
    }

    public void RevokeAllRefreshTokens()
    {
        foreach (var token in _refreshTokens.Where(t => !t.IsRevoked))
            token.Revoke();
    }

    public string FullName => $"{FirstName} {LastName}";
}
