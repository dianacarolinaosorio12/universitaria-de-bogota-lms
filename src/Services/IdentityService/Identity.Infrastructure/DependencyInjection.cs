using Identity.Application.Services;
using Identity.Domain.Ports;
using Identity.Infrastructure.Persistence;
using Identity.Infrastructure.Repositories;
using Identity.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Identity.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var useInMemory = configuration.GetValue<bool>("UseInMemoryDatabase");

        if (useInMemory)
        {
            services.AddDbContext<IdentityDbContext>(options =>
                options.UseInMemoryDatabase("UbLmsIdentityDb"));
        }
        else
        {
            services.AddDbContext<IdentityDbContext>(options =>
                options.UseNpgsql(
                    configuration.GetConnectionString("IdentityDb"),
                    npgsql => npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "identity")));
        }

        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddSingleton<IPasswordHasher, BcryptPasswordHasher>();

        return services;
    }
}
