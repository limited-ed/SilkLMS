using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using SilkLMS.Api;
using SilkLMS.Api.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SilkLMS.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connection = builder.Configuration.GetSection("Data:PostgreSQL").Value;

builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(connection));
builder.Services.AddIdentity<User, IdentityRole>(options => {
        options.SignIn.RequireConfirmedAccount = false;
        
        
    }).AddEntityFrameworkStores<DataContext>();


builder.Services.AddControllers().AddJsonOptions(o => {
   o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
   o.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
   o.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
   o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
   o.JsonSerializerOptions.WriteIndented = true;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( setup => {
    var jwtScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

        Reference = new OpenApiReference()
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtScheme.Reference.Id, jwtScheme);
    setup.AddSecurityRequirement(new OpenApiSecurityRequirement {
        { jwtScheme, Array.Empty<string>()}
    });
});

builder.Services.AddAuthentication( options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer( 
        options => {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration["JWTKey:ValidAudience"],
                    ValidIssuer = builder.Configuration["JWTKey:ValidIssuer"],
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTKey:Secret"]))
                };
});
builder.Services.AddTransient<JwtUtils>();
builder.Services.Configure<JWTKey>(builder.Configuration.GetSection("JWTKey"));
builder.Services.AddAuthorization( options => {
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<DataContext>();    
    context.Database.Migrate();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<User>>();
    await context.Seed(userManager, roleManager);
}

app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();



public partial class Program { }