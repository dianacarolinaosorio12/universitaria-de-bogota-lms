namespace UB.SharedKernel.Application.Exceptions;

public class AppException(string message, int statusCode = 400) : Exception(message)
{
    public int StatusCode { get; } = statusCode;
}

public class NotFoundException(string message) : AppException(message, 404);
public class UnauthorizedException(string message) : AppException(message, 401);
public class ForbiddenException(string message) : AppException(message, 403);
public class ConflictException(string message) : AppException(message, 409);
