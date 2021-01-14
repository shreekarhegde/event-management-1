function formSubmit(e) {
  e.preventDefault();
  console.log("form submit called");
  let fname = document.getElementById("fName").value;
  let lname = document.getElementById("lName").value;
  let ph_num = document.getElementById("ph_num").value;
  let role = document.getElementById("role").value;
  var http = new XMLHttpRequest();
  var url = "http://localhost:3000/users";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function () {
    console.log("submit function called");
    if (http.readyState == 4 && http.status == 200) {
      console.log(
        "JSON.parse(http.responseText).result",
        JSON.parse(http.responseText).insertId
      );
      let id = JSON.parse(http.responseText).result.insertId;
      console.log("userID", id);
      document.location.href = `file:///C:/Users/R%20Soumya/projects/event-management-1/front-end/OnePage/index.html?userID=${id}`;
    }
  };
  http.send(
    `first_name=${fname}&last_name=${lname}&ph_num=${ph_num}&role=${role}`
  );
}
