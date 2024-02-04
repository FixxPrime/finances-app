using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_API.Migrations
{
    /// <inheritdoc />
    public partial class DbMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Color = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Icon = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Date_Registration = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GoalBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goals_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Transactions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Change = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transactions_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_Types_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Transactions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Goals_UserId",
                table: "Goals",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_CategoryId",
                table: "Transactions",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_TypeId",
                table: "Transactions",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_UserId",
                table: "Transactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                                { "67e156e9-aee4-44ea-a016-f628f7a954eb", "Expense" },
                                { "d30ea67f-1370-4572-a5d8-cc554fc01367", "Income" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Name", "Email", "Password", "Balance", "Date_Registration" },
                values: new object[,]
                {
                    { "28994bcf-bd4e-4e43-a259-fdc4834bd1d4", "Alex", "test@test.test", "test", 10000, "2020-08-01" },
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name", "Color", "Icon" },
                values: new object[,]
                {
                    { "67e156e9-aee4-44ea-a016-f628f7a00000", "Gym", "#41a6f9", "activities-dumbbell-gym" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00001", "Travel", "#37e0ff", "airplane-flight-travel" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00002", "Pharmacy", "#fd6a7e", "ambulance-healthcare-medicine" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00003", "Food", "#17b978", "apple-food-grocery" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00004", "Cashout", "#17b978", "atm-cashout-money" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00005", "Baby care", "#f498bd", "baby-care-kid" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00006", "Revenew", "#37e0ff", "bag-money-revenew" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00007", "Store", "#37e0ff", "bag-shopping-store" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00008", "Beauty", "#fd6a7e", "beauty-health-heart" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00009", "Bill Fee Tax", "#8797ee", "bill-fee-tax" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00010", "Cafe", "#2fd9b9", "bistro-cafe-coffee" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00011", "Treatment", "#fd6a7e", "calendar-care-donation" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00012", "Car", "#41a6f9", "car-drive-service" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00013", "Fuel", "#ffdf1d", "car-fuel-gas" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00014", "Time", "#c6c9cc", "clock-pending-time" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00015", "Clothes", "#41a6f9", "clothes-fashion-tshirt" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00016", "Deposit", "#8797ee", "deposit-safe-savings" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00017", "Theater", "#2fd9b9", "drama-entertainment-theater" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00018", "Pills", "#fd6a7e", "drugs-medicine-pills" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00019", "Passive income", "#41a6f9", "earnings-income-passive" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00020", "Salary", "#17b978", "earnings-income-wallet" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00021", "Subscription", "#ffdf1d", "email-newsletter-subscription" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00022", "Kitchen", "#f498bd", "fork-food-kitchen" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00023", "Maintenance", "#8797ee", "gear-maintenance-service" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00024", "Gift", "#fd6a7e", "gift-present-box" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00025", "Entertainment", "#ffdf1d", "hobby-kite-leasure" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00026", "House", "#ffdf1d", "home-house-building" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00027", "Insurance", "#8797ee", "insurance-protection-safety" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00028", "Shop", "#f498bd", "label-tag-price" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00029", "Repair", "#c6c9cc", "maintenance-repair-service" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00030", "Metro", "#c6c9cc", "metro-tickets-train" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00032", "Money", "#17b978", "money-cash-finance" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00033", "Vacation", "#2fd9b9", "suitcase-travel-vacation" },
                    { "67e156e9-aee4-44ea-a016-f628f7a00031", "Other", "#c6c9cc", "miscellaneous-multiple-other" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "Transactions");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Types");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
