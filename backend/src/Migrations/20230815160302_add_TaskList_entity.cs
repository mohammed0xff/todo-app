using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TodoAPI.Migrations
{
    /// <inheritdoc />
    public partial class add_TaskList_entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ListId",
                table: "Tasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TaskLists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskLists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ListId",
                table: "Tasks",
                column: "ListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_TaskLists_ListId",
                table: "Tasks",
                column: "ListId",
                principalTable: "TaskLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_TaskLists_ListId",
                table: "Tasks");

            migrationBuilder.DropTable(
                name: "TaskLists");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_ListId",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "ListId",
                table: "Tasks");
        }
    }
}
