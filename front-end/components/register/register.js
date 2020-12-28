
function formSubmit(){
	let fname = document.getElementById('fName').value;
	let lname = document.getElementById('lName').value;
	let ph_num = document.getElementById('ph_num').value;
	let role = document.getElementById('role').value;			
	var http = new XMLHttpRequest();
	var url = 'http://localhost:3000/users';
	http.open('POST', url, true);

	//Send the proper header information along with the request
	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	http.onreadystatechange = function() {//Call a function when the state changes.
		if(http.readyState == 4 && http.status == 200) {
			alert(http.responseText);
		}
	}
	http.send(`first_name=${fname}&last_name=${lname}&ph_num=${ph_num}&role=${role}`);
}