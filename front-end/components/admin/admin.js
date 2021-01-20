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
      Name: userData[i].first_name + " " + userData[i].last_name,
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
      Address: userData[i].address,
      Delete: `<i class='fas fa-trash' onclick='deleteEvent(this.id)' id=${userData[i].eventID}></i>`,
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

function deleteEvent(ele) {
  var url = `http://localhost:3000/events/${ele}`;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.onload = function () {
    var response = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(response);
    } else {
      console.error(response);
    }
  };
  xhr.send(null);
  location.reload();
}

function getUser() {
  let userID = parseURLParams()["userID"];
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `http://localhost:3000/users/${userID}`, false); // false for synchronous request
  xmlHttp.send(null);
  console.log("getUserdata: user data", JSON.parse(xmlHttp.responseText));
  let userData = JSON.parse(xmlHttp.responseText).result[0];
  console.log("userData: admin page", userData);
  let name = document.createTextNode(
    userData.first_name + " " + userData.last_name
  );
  document.getElementById("dispName").appendChild(name);
}

function parseURLParams() {
  url = document.location.href;
  console.log("url: parse url params", url);
  var queryStart = url.indexOf("?") + 1,
    queryEnd = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {},
    i,
    n,
    v,
    nv;

  if (query === url || query === "") return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  console.log("params", parms);
  return parms;
}
