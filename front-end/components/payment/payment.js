function pay(){
	let userID = parseURLParams()['userID'];
	console.log('userID: pay', userID)
	let eventIDs = getLatestEvents();
	console.log('eventIDs: pay', eventIDs);
	for(let i = 0; i < eventIDs.length; i ++){
		var http = new XMLHttpRequest();
		var url = 'http://localhost:3000/payment';
		http.open('POST', url, true);
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				console.log('payment done');	
			}
		}
		http.send(`userID=${userID}&eventID=${eventIDs[i]}&amount=50&result='success'`);
	}
	document.location.href = `file:///Users/shreekar/Sites/projects/learning/event-management-1/front-end/OnePage/index.html?userID=${userID}&payment=success`
}

function getLatestEvents(){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", "http://localhost:3000/events/latest", false );
	xmlHttp.send( null );
	console.log('getLatestEvents: latest event', JSON.parse(xmlHttp.responseText));
	let events = JSON.parse(xmlHttp.responseText).result;
	console.log('events: getLatestEvents--->', events);
	eventIDs = events.map(event => event.eventID);
	console.log('eventIDs: getLatestEvents--->', eventIDs);
	return eventIDs;
}

function parseURLParams() {
	url = document.location.href;
	console.log('url: parse url params', url);
	var queryStart = url.indexOf("?") + 1,
		queryEnd   = url.indexOf("#") + 1 || url.length + 1,
		query = url.slice(queryStart, queryEnd - 1),
		pairs = query.replace(/\+/g, " ").split("&"),
		parms = {}, i, n, v, nv;

	if (query === url || query === "") return;

	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=", 2);
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);

		if (!parms.hasOwnProperty(n)) parms[n] = [];
		parms[n].push(nv.length === 2 ? v : null);
	}
	console.log('params', parms);
	return parms;
}