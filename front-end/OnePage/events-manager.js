let totalAmt = 0;
function calcAmt() {
  let quiz = document.getElementById("quiz").checked
    ? document.getElementById("quiz").value
    : 0;
  let coding = document.getElementById("coding").checked
    ? document.getElementById("coding").value
    : 0;
  let debugging = document.getElementById("debugging").checked
    ? document.getElementById("debugging").value
    : 0;
  let singing = document.getElementById("singing").checked
    ? document.getElementById("singing").value
    : 0;
  let dancing = document.getElementById("dancing").checked
    ? document.getElementById("dancing").value
    : 0;
  let drama = document.getElementById("drama").checked
    ? document.getElementById("drama").value
    : 0;
  let logoDesign = document.getElementById("logoDesign").checked
    ? document.getElementById("logoDesign").value
    : 0;
  let posterDesign = document.getElementById("posterDesign").checked
    ? document.getElementById("posterDesign").value
    : 0;
  let rangoli = document.getElementById("rangoli").checked
    ? document.getElementById("rangoli").value
    : 0;
  totalAmt =
    parseInt(quiz) +
    parseInt(coding) +
    parseInt(debugging) +
    parseInt(singing) +
    parseInt(dancing) +
    parseInt(drama) +
    parseInt(logoDesign) +
    parseInt(posterDesign) +
    parseInt(rangoli);
  document.getElementById("totalAmt").innerHTML = totalAmt;
}

function onSubmit(e) {
  e.preventDefault();
  let events = [];
  let loc = document.location.href;
  console.log(
    "user string extracted",
    loc.substring(loc.indexOf("=") + 1, loc.length + 1)
  );
  let userID = parseURLParams()["userID"];
  console.log("userID: onSubmit", userID);
  document.getElementById("quiz").checked
    ? events.push({
        name: "Quiz",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("coding").checked
    ? events.push({
        name: "Coding",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("debugging").checked
    ? events.push({
        name: "Debugging",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("singing").checked
    ? events.push({
        name: "Singing",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("dancing").checked
    ? events.push({
        name: "Dancing",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("drama").checked
    ? events.push({
        name: "Drama",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("logoDesign").checked
    ? events.push({
        name: "Logo Design",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("posterDesign").checked
    ? events.push({
        name: "Poster Design",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  document.getElementById("rangoli").checked
    ? events.push({
        name: "Rangoli",
        starts: "2021-01-01 01:30",
        ends: "2021-01-01 02:00",
      })
    : "";
  console.log("events array", events);

  events.map((event) => {
    let eventObj = {
      eventName: event.name,
      userID: userID,
      starts_at: event.starts,
      ends_at: event.ends,
      venueID: 1,
      created_at: getCurrentDate(),
    };
    console.log(
      "event data",
      eventObj.eventName,
      eventObj.userID,
      eventObj.starts_at,
      eventObj.ends_at
    );
    var http = new XMLHttpRequest();
    var url = "http://localhost:3000/events";
    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        console.log("navigating to payment page");
        // document.location.href =
        //   "file:///C:/Users/R%20Soumya/projects/event-management-1/front-end/OnePage/index.html";
      }
    };
    http.send(
      `eventName=${eventObj.eventName}&userID=${eventObj.userID}&starts_at=${eventObj.starts_at}&ends_at=${eventObj.ends_at}&venueID=${eventObj.venueID}&created_at=${eventObj.created_at}`
    );
  });

  document.location.href = `/Users/R%20Soumya/projects/event-management-1/front-end/components/payment/payment.html?totalAmt=${totalAmt}&userID=${userID}`;
}

function checkSuccess() {
  if (document.location.href.includes("payment=success")) {
    var iDiv = document.createElement("div");
    iDiv.className = "alert alert-success";
    iDiv.innerHTML = "Payment was successful. Your name was registered!";
    var outerSpan = document.getElementById("success");
    outerSpan.appendChild(iDiv);
  }
  setTimeout(() => {
    if (outerSpan) outerSpan.remove();
  }, 3000);
}

function getLatestUser() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "http://localhost:3000/users/latest", false); // false for synchronous request
  xmlHttp.send(null);
  console.log("getLatestUser: latest user", JSON.parse(xmlHttp.responseText));
  let userID = JSON.parse(xmlHttp.responseText).result.userID;
  let userName = JSON.parse(xmlHttp.responseText).result.first_name;
  document.createTextNode(userName);
  document.getElementById("userName").append(userName);
  return userID;
}

function constructEventsTable() {
  let userID = getLatestUser();
  console.log("userID:", userID);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", `http://localhost:3000/users/${userID}/events`, false); // false for synchronous request
  xmlHttp.send(null);
  console.log("construct users table", JSON.parse(xmlHttp.responseText));
  let userData = JSON.parse(xmlHttp.responseText).result;
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
        "<td style='width: 150px; padding: 5px; text-align: center;'>" +
        row[cell] +
        "</td>";
    });

    tableBody = tableBody + "</tr>";
  });

  $("#usersTable").append(tableBody);
}

function getCurrentDate() {
  var date = new Date();
  var dateStr =
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2);
  return dateStr;
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

function deleteEvent(ele) {
  var url = `http://localhost:3000/events/${ele}`;
  var xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.onload = function () {
    var response = JSON.parse(xhr.responseText);
    console.log("delete response", response);
    if (xhr.readyState == 4 && xhr.status == "200") {
      console.table(response);
    } else {
      console.error(response);
    }
  };
  xhr.send(null);
  location.reload();
}
