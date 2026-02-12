using System.Net;
using System.Text.Json;
using FluentValidation;
using UB.SharedKernel.Application.Exceptions;

namespace Identity.API.Middleware;

public sealed class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var (statusCode, message) = exception switch
        {
            AppException appEx => (appEx.StatusCode, appEx.Message),
            ValidationException valEx => (400, string.Join("; ", valEx.Errors.Select(e => e.ErrorMessage))),
            _ => (500, "Ocurrió un error interno del servidor.")
        };

        if (statusCode >= 500)
            logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);
        else
            logger.LogWarning("Handled exception: {StatusCode} - {Message}", statusCode, message);

        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";

        var response = JsonSerializer.Serialize(new
        {
            status = statusCode,
            message,
            timestamp = DateTime.UtcNow
        }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });

        await context.Response.WriteAsync(response);
    }
}
