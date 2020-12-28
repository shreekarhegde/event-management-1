function calcAmt(){
	let quiz = document.getElementById('quiz').checked ? document.getElementById('quiz').value: 0;
	let coding =  document.getElementById('coding').checked ? document.getElementById('coding').value: 0;
	let debugging = document.getElementById('debugging').checked ? document.getElementById('debugging').value: 0;
	let singing = document.getElementById('singing').checked ? document.getElementById('singing').value: 0;
	let dancing = document.getElementById('dancing').checked ? document.getElementById('dancing').value: 0;
	let drama = document.getElementById('drama').checked ? document.getElementById('drama').value: 0;
	let logoDesign =document.getElementById('logoDesign').checked ?  document.getElementById('logoDesign').value: 0;
	let posterDesign =document.getElementById('posterDesign').checked ? document.getElementById('posterDesign').value: 0;
	let rangoli = document.getElementById('rangoli').checked ? document.getElementById('rangoli').value: 0;
	let total = parseInt(quiz) + parseInt(coding) + parseInt(debugging) + parseInt(singing) + parseInt(dancing) + parseInt(drama) + parseInt(logoDesign) + parseInt(posterDesign) + parseInt(rangoli);
	document.getElementById('totalAmt').innerHTML = total;
}