document.getElementById("form").onsubmit = function sendEmail(e) {
	e.preventDefault();
	var email = document.getElementById("email").value;
	var name = document.getElementById("name").value;
	var newEmail = { email: email, name: name };
	console.log(newEmail);
	var req = new XMLHttpRequest();
	req.open("POST", "api/greetings", true);
	req.setRequestHeader("Content-type", "application/json");
	req.onload = function (e) {
		alert(req.response);
	}
	req.send(JSON.stringify(newEmail));
};