function constructEventsTable() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `http://localhost:3000/admin`, false); // false for synchronous request
  xmlHttp.send(null);
  console.log("construct events table", JSON.parse(xmlHttp.responseText));
  let userData = JSON.parse(xmlHttp.responseText).data;
  if (!userData.length) {
    let noEventsMessage = "No Events Found!";
    let errmsg = document.createTextNode(noEventsMessage);
    document.getElementById("no-events").appendChild(errmsg);
    return;
  }
  let requiredData = [];
  for (let i = 0; i < userData.length; i++) {
    let obj = {
      "Event Name": userData[i].eventName,
      Venue: userData[i].name,
      "Starts At":
        new Date(userData[i].starts_at).getDay() +
        "-" +
        new Date(userData[i].starts_at).getMonth() +
        1 +
        "-" +
        new Date(userData[i].starts_at).getFullYear() +
        " " +
        new Date(userData[i].starts_at).getHours() +
        ":" +
        new Date(userData[i].starts_at).getMinutes(),
      "Finishes At":
        new Date(userData[i].ends_at).getDay() +
        "-" +
        new Date(userData[i].ends_at).getMonth() +
        1 +
        "-" +
        new Date(userData[i].ends_at).getFullYear() +
        " " +
        new Date(userData[i].ends_at).getHours() +
        ":" +
        new Date(userData[i].ends_at).getMinutes(),
      Address: userData[i].address,
    };
    requiredData.push(obj);
  }

  var tableBody = "";

  var columns = [];

  // Create the header record.
  tableBody = tableBody + "<tr style='border: 1px solid black' >";
  for (var prop in requiredData[0]) {
    if (requiredData[0].hasOwnProperty(prop)) {
      tableBody =
        tableBody +
        ("<th style=' text-align: center; background-color: #2487ce; color: white; padding: 5px'>" +
          prop +
          "</th>");
      columns.push(prop);
    }
  }

  tableBody = tableBody + "</tr>";

  // Create the data rows.
  requiredData.forEach(function (row) {
    // Create a new row in the table for every element in the data array.
    tableBody = tableBody + "<tr>";

    columns.forEach(function (cell) {
      // Cell is the property name of every column.
      // row[cell] gives us the value of that cell.
      tableBody =
        tableBody +
        "<td style='width: 150px; padding: 5px'>" +
        row[cell] +
        "</td>";
    });

    tableBody = tableBody + "</tr>";
  });

  $("#eventsTable").append(tableBody);
}
