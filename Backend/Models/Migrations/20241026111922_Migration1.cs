using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Models.Migrations
{
    /// <inheritdoc />
    public partial class Migration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventTasks_Users_UserId",
                table: "EventTasks");

            migrationBuilder.DropIndex(
                name: "IX_EventTasks_UserId",
                table: "EventTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EventTasks");

            migrationBuilder.CreateTable(
                name: "EventTaskUser",
                columns: table => new
                {
                    AssigneesId = table.Column<Guid>(type: "uuid", nullable: false),
                    EventTasksId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTaskUser", x => new { x.AssigneesId, x.EventTasksId });
                    table.ForeignKey(
                        name: "FK_EventTaskUser_EventTasks_EventTasksId",
                        column: x => x.EventTasksId,
                        principalTable: "EventTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventTaskUser_Users_AssigneesId",
                        column: x => x.AssigneesId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventTaskUser_EventTasksId",
                table: "EventTaskUser",
                column: "EventTasksId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventTaskUser");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "EventTasks",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EventTasks_UserId",
                table: "EventTasks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventTasks_Users_UserId",
                table: "EventTasks",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
