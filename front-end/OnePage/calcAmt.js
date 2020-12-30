let totalAmt = 0;
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
	totalAmt = parseInt(quiz) + parseInt(coding) + parseInt(debugging) + parseInt(singing) + parseInt(dancing) + parseInt(drama) + parseInt(logoDesign) + parseInt(posterDesign) + parseInt(rangoli);
	document.getElementById('totalAmt').innerHTML = totalAmt;
}

function onSubmit(e){
	e.preventDefault();
	document.location.href = `/Users/shreekar/Sites/projects/learning/event-management-1/front-end/components/payment/payment.html?totalAmt=${totalAmt}`;
}

function checkSuccess(){
	if(document.location.href.includes('payment=success')){
		var iDiv = document.createElement('div');
		iDiv.className = 'alert alert-success';
		iDiv.innerHTML = 'Payment was successful. Your name was registered!'
		var outerSpan = document.getElementById('success');
		outerSpan.appendChild(iDiv);
	}
	setTimeout(() => {
		outerSpan.remove();
	}, 3000)
}