function loginFormSubmit(e) {
  e.preventDefault();
  console.log("form submit called");
  let fname = document.getElementById("fName").value;
  let password = document.getElementById("password").value;
  var http = new XMLHttpRequest();
  var url = "http://localhost:3000/login";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function () {
    console.log("submit function called");
    if (http.readyState == 4 && http.status == 200) {
      console.log(
        "JSON.parse(http.responseText).result",
        JSON.parse(http.responseText)
      );
      let response = JSON.parse(http.responseText);
      if (response.status === "success" && response.data.length) {
        let userID = response.data[0].userID;
        console.log("userID: login", userID);
        document.location.href = `file:///C:/Users/R%20Soumya/projects/event-management-1/front-end/OnePage/index.html?userID=${userID}`;
      } else {
        console.log("login failed");
      }
    }
  };
  http.send(`uName=${fname}&password=${password}`);
}
