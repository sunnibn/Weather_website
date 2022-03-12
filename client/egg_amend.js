let path = location.pathname;
let path_index = path.split("/").pop();

window.addEventListener('load', async function (event) {
	event.preventDefault();
	try {
		let response = await fetch('/egg/amend?index='+path_index);
		if (response.ok) {
			let body = await response.text();
            let dataJSON = await JSON.parse(body);
            if (dataJSON.message) {
                throw new Error("problem getting JSON data: " + dataJSON.message);
            }
            console.log(dataJSON)
            let html = '<input name="otherIndex" class="form-control" style="max-width: 50px;" value="'+path_index+'" readonly="readonly" />';
            document.getElementById('otherIndex').insertAdjacentHTML('beforeend', html);
            document.getElementById('otherCity').value = dataJSON.city;
            let weat = document.getElementById('otherWeat');
            for (let i=0; i<weat.options.length; i++) {
            	let weatop = weat.getElementsByTagName('option')[i];
            	if (weatop.value === dataJSON.weather) {
            		weatop.selected = 'selected';
            		break;
            	}
            }
            document.getElementById('otherDate').value = dataJSON.date;
		} else {
			throw new Error("problem getting data: " + response.code);
		}
	} catch (error) {
		alert("problem: " + error);
	}
});