namespace CalorieCounter.API.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMeal : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Meals",
                c => new
                    {
                        MealId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 100),
                        DateTime = c.DateTime(nullable: false),
                        NumberOfCalories = c.Int(nullable: false),
                        Year = c.Int(nullable: false),
                        Month = c.Int(nullable: false),
                        Day = c.Int(nullable: false),
                        ApplicationUserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.MealId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUserId, cascadeDelete: true)
                .Index(t => t.ApplicationUserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Meals", "ApplicationUserId", "dbo.AspNetUsers");
            DropIndex("dbo.Meals", new[] { "ApplicationUserId" });
            DropTable("dbo.Meals");
        }
    }
}
