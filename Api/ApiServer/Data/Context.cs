using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SilkLMS.Api.Models;
using SilkLMS.Api.Models.Parts;

namespace SilkLMS.Api;

using Microsoft.EntityFrameworkCore;
using Api.Models;
using System;

public class DataContext: IdentityDbContext<User>
{
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Group> UsersGroups { get; set; }
    public virtual DbSet<Question> Questions { get; set; }
    public virtual DbSet<Answer> Answers { get; set; }
    public virtual DbSet<Cource> Cources { get; set; }
    public virtual DbSet<PartItem> PartItems { get; set; }
    
    public DataContext()
    {
    }
    public DataContext(DbContextOptions<DataContext> options): base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Cource>().HasMany(m => m.PartItems).WithMany( p=>p.Cources);
        modelBuilder.ApplyConfiguration(new PartItemConfiguration());

    }

    internal async Task Seed(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
    {
        
        
        if (!UsersGroups.Any()) {
            UsersGroups.Add(new Group() {Id=1, Title="Администраторы", ParentId=0, CanDelete = false});
            UsersGroups.Add(new Group() {Id=2, Title="Группа 1", ParentId=0});
            UsersGroups.Add(new Group() {Id=3, Title="Подгруппа", ParentId=2});
            UsersGroups.Add(new Group() {Id=4, Title="Группа 2", ParentId=0});
            SaveChanges();
        }

        if (!roleManager.Roles.Any())
        {
            await roleManager.CreateAsync(new IdentityRole() {Name = Models.Auth.UserRoles.Admin, NormalizedName = Models.Auth.UserRoles.Admin});
            await roleManager.CreateAsync(new IdentityRole() {Name = Models.Auth.UserRoles.User, NormalizedName = Models.Auth.UserRoles.User});
        }
        
        if(!userManager.Users.Any())
        {
            
            var admin = new User() {Id=Guid.NewGuid().ToString(), UserName = "Administrator", Email = "admin@test.no", Fullname  = "Administrator",CanDelete = false};
            await userManager.CreateAsync(admin, "Qq-12345" );
            await userManager.AddToRoleAsync(admin, "Admin");
            var user = new User() {Id=Guid.NewGuid().ToString(), UserName = "User", Fullname  = "User", Email = "user@test.no",CanDelete = true};
            await userManager.CreateAsync(user, "Qq-12345" );
            await userManager.AddToRoleAsync(user, "User");
        }

        if(!Categories.Any())
        {
            Categories.Add( new Category(){ Id=1, Title="Категория 1"});
            Categories.Add( new Category(){ Id=2, Title="Категория 2"});
            Categories.Add( new Category(){ Id=3, Title="Категория 3"});
            Categories.Add( new Category(){ Id=4, Title="Категория 4"});
            Categories.Add( new Category(){ Id=5, Title="Категория 5"});
            SaveChanges();
        }

        if (!Answers.Any())
        {
            Questions.Add(new() { Text = "Тестовый вопрос", CategoryId = 1 });
            SaveChanges();
            Answers.Add(new() { QuestionId = 1, Text = "Ответ 1", Right = false });
            Answers.Add(new() { QuestionId = 1, Text = "Ответ верный", Right = true });
            Answers.Add(new() { QuestionId = 1, Text = "Ответ 3", Right = false });
            SaveChanges();
        }
        

        
        if (!Cources.Any())
        {
            var cource = new Cource() { Title = "Курс", Description = "Описание" };
            cource.PartItems = new()
            {
                new PartItem() { Id = 1, Title = "Лекция", Type = nameof(SimpleLecturePart), Part = new SimpleLecturePart()
                {
                    Pages = new ()
                    {
                        "First page",
                        "Second Page"
                    },
                    Options = new ()
                    {
                        Height = "100%",
                        Width = "100%",
                        Timer = 600
                    }
                }},
                new PartItem() { Id=2 , Title = "Scorm Iteractive", Type = nameof(ScormPart), Part = new ScormPart() { Filename = "scorm.file"}}
            };
            
            Cources.Add(cource);
            SaveChanges();
        }
    }
}

public class PartItemConfiguration : IEntityTypeConfiguration<PartItem>
{
    public void Configure(EntityTypeBuilder<PartItem> builder)
    {

        var options = new JsonSerializerOptions(JsonSerializerDefaults.General);
        builder.HasKey(k => k.Id);
        builder.Property(p => p.Part).HasColumnType("JSON")
            .HasConversion(
                c => JsonSerializer.Serialize(c, options),
                c => 
                    JsonSerializer.Deserialize<Part>(c, options)
            );

    }
}
