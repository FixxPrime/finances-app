using Microsoft.EntityFrameworkCore;
using Minio;
using System.Net;
using Web_API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Minio using the custom endpoint and configure additional settings for default MinioClient initialization
var minioConfig = builder.Configuration.GetSection("MinioSettings");

builder.Services.AddMinio(configureClient => configureClient
    .WithEndpoint(minioConfig["Endpoint"])
    .WithCredentials(minioConfig["AccessKey"], minioConfig["SecretKey"])
    .WithProxy(new WebProxy(minioConfig["Proxy"], int.Parse(minioConfig["ProxyPort"])))
    .WithSSL(bool.Parse(minioConfig["Secure"])));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();
