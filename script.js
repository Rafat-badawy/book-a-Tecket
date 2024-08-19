// document.getElementById("ticket-form").addEventListener("submit", function(event) {
//     event.preventDefault();

//     // Gather user input
//     var name = document.getElementById("name").value;
//     var seat = document.getElementById("seat").value;
//     var date = document.getElementById("date").value;
//     var from = document.getElementById("from").value;
//     var to = document.getElementById("to").value;

//     // Generate ticket ID (simple demonstration)
//     var ticketId = "T" + Math.floor(Math.random() * 10000);

//     // Add ticket details to history table
//     var tableBody = document.getElementById("history-table-body");
//     var newRow = tableBody.insertRow();
//     newRow.innerHTML = "<td>" + ticketId + "</td><td>" + name + "</td><td>" + seat + "</td><td>" + date + "</td><td>" + from + "</td><td>" + to + "</td><td>Booked</td><td><button class='delete-btn' data-ticket-id='" + ticketId + "'>Delete</button></td>";

//     // Display alert for successful booking and generated ticket ID
//     alert("Ticket with ID " + ticketId + " has been booked successfully.");
//     document.getElementById("ticket-form").reset();
// });

// document.getElementById("view-history-btn").addEventListener("click", function() {
//     document.getElementById("ticket-history").style.display = "block";
// });

// document.getElementById("ticket-history").addEventListener("click", function(event) {
//     if (event.target.classList.contains('delete-btn')) {
//         var ticketIdToDelete = event.target.getAttribute('data-ticket-id');
//         // Delete ticket logic (for demonstration, we'll remove the row from table)
//         event.target.closest('tr').remove();
//         alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
//     }
// });

document
  .getElementById("ticket-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Gather user input
    var name = document.getElementById("name").value;
    var seat = document.getElementById("seat").value;
    var date = document.getElementById("date").value;
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;

    // Create a ticket object
    var ticket = {
      name: name,
      seat: seat,
      date: date,
      from: from,
      to: to,
    };

    // Send the ticket data to the server
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });

      if (response.ok) {
        const newTicket = await response.json();
        alert(
          "Ticket with ID " + newTicket._id + " has been booked successfully."
        );
        document.getElementById("ticket-form").reset();
        addTicketToTable(newTicket);
      } else {
        alert("Failed to book the ticket.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  });

document
  .getElementById("view-history-btn")
  .addEventListener("click", async function () {
    document.getElementById("ticket-history").style.display = "block";

    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        const tickets = await response.json();
        const tableBody = document.getElementById("history-table-body");
        tableBody.innerHTML = ""; // Clear existing rows
        tickets.forEach((ticket) => {
          addTicketToTable(ticket);
        });
      } else {
        alert("Failed to load ticket history.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  });

document
  .getElementById("ticket-history")
  .addEventListener("click", async function (event) {
    if (event.target.classList.contains("delete-btn")) {
      var ticketIdToDelete = event.target.getAttribute("data-ticket-id");

      try {
        const response = await fetch("/api/tickets/" + ticketIdToDelete, {
          method: "DELETE",
        });

        if (response.ok) {
          event.target.closest("tr").remove();
          alert("Ticket with ID " + ticketIdToDelete + " has been deleted.");
        } else {
          alert("Failed to delete the ticket.");
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    }
  });

function addTicketToTable(ticket) {
  var tableBody = document.getElementById("history-table-body");
  var newRow = tableBody.insertRow();
  newRow.innerHTML =
    "<td>" +
    ticket._id +
    "</td><td>" +
    ticket.name +
    "</td><td>" +
    ticket.seat +
    "</td><td>" +
    ticket.date +
    "</td><td>" +
    ticket.from +
    "</td><td>" +
    ticket.to +
    "</td><td><button class='delete-btn' data-ticket-id='" +
    ticket._id +
    "'>Delete</button></td>";
}
