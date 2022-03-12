let box = document.getElementById('redBox');
let button = document.getElementById('submitButton');

button.addEventListener('click', async function (event) {
	event.preventDefault();
	try {
		let eggform = document.getElementById("eggform");
		let formQuestions = document.getElementsByClassName("eggquestion");
		let formAnswers = {};
		formAnswers[formQuestions[0].name] = formQuestions[0].value;
		formAnswers[formQuestions[1].name] = formQuestions[1].value;
		formAnswers[formQuestions[2].name] = formQuestions[2].value;
		
		let response = await fetch('/egg/write/submit', {
			method: "POST",
			headers: {"Content-Type": 'application/json'},
			body: JSON.stringify(formAnswers, null, 2),
		});
		if (response.ok) {
			window.alert('Submitted!');
            location.href = "/egg";
		}
	} catch (error) {
		alert("problem: " + error);
	}
	return false;
});