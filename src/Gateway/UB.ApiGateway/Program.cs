using UB.ApiGateway.Middleware;

var builder = WebApplication.CreateBuilder(args);

// YARP Reverse Proxy
builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? ["http://localhost:3000"])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseMiddleware<CorrelationIdMiddleware>();
app.UseCors("AllowFrontend");

app.MapReverseProxy();
app.MapHealthChecks("/health");

app.MapGet("/", () => Results.Ok(new
{
    Service = "UB LMS API Gateway",
    Status = "Running",
    Timestamp = DateTime.UtcNow
}));

await app.RunAsync();
