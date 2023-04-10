// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    // Load all users on page load
    loadUsers();

    // Add User
    $("#addUserBtn").click(function () {
        event.preventDefault();

        $.ajax({
            url: "/api/users",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                firstName: $("#Name").val(),
                lastName: $("#ContactNo").val()

            }),
            success: function () {
                // Clear form inputs
                $("#Name").val("");
                $("#ContactNo").val("");

                // Hide modal
                $("#addUserModal").modal("hide");

                // Reload all users
                loadUsers();
            },
            error: function () {
                alert("Error adding user.");
            }
        });
    });

    // Edit User
    $("tbody").on("click", ".editBtn", function () {
        var userId = $(this).attr("data-user-id");

        $.ajax({
            url: "/api/users/" + userId,
            type: "GET",
            dataType: "json",
            success: function (user) {
                $("#editUserId").val(user.id);
                $("#editName").val(user.firstName);
                $("#editContactNo").val(user.lastName);

                $("#editUserModal").modal("show");
            },
            error: function () {
                alert("Error loading user.");
            }
        });
    });

    $("#editUserBtn").click(function () {
        event.preventDefault();

        $.ajax({
            url: "/api/users/" + $("#editUserId").val(),
            type: "PUT",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                id: $("#editUserId").val(),
                firstName: $("#editName").val(),
                lastName: $("#editContactNo").val(),

            }),
            success: function () {
                // Hide modal
                $("#editUserModal").modal("hide");

                // Reload all users
                loadUsers();
            },
            error: function () {
                alert("Error updating user.");
            }
        });
    });

    // Delete User
    $("tbody").on("click", ".deleteBtn", function () {
        var userId = $(this).attr("data-user-id");

        $.ajax({
            url: "/api/users/" + userId,
            type: "DELETE",
            success: function () {
                // Reload all users
                loadUsers();
            },
            error: function () {
                alert("Error deleting user.");
            }
        });
    });

     function loadUsers() {
         $("tbody").empty();
         try {
             $.ajax({
                 url: "/api/users",
                 type: "GET",
                 dataType: "json",
                 success: function (users) {
                     $.each(users, function (i, user) {
                         var row = "<tr>";
                         row += "<td>" + user.id + "</td>";
                         row += "<td>" + user.name + "</td>";
                         row += "<td>" + user.contactNo + "</td>";

                         row += "<td>";
                         row += "<button class='btn btn-primary editBtn' data-user-id='" + user.id + "'>Edit</button> ";
                         row += "<button class='btn btn-danger deleteBtn' data-user-id='" + user.id + "'>Delete</button>";
                         row += "</td>";
                         $("tbody").append(row);
                     });
                 },
                 error: function () {
                     alert("Error loading users.");
                 }
             });
         }
         catch (error) {
             alert("Error loading users.");
         }
    }


});