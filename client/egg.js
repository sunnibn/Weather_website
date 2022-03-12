let table = document.getElementById("jsontable")

window.addEventListener('load', async function (event) {
	event.preventDefault();
	try {
		let response = await fetch("/egg/getlogs", {method: 'GET'});
		if (response.ok) {
			let body = await response.text();
            let othersJSON = JSON.parse(body);
            if (othersJSON.message) {
                throw new Error("problem getting data from server: " + othersJSON.message);
            }
            for (let i=othersJSON.length-1; i>=0; i--) {
            	html = '<tr value=' + othersJSON[i].title + '">';
                html += '<td class="text-break">'
                html += '<a href="/egg/amend/' + i
                html += '" style="color: grey;">'
                html += i
                html += '</a>'
                html += '</td>' + '<td class="text-break">'
                html += othersJSON[i].date
                html += '</td>' + '<td class="text-break">'
                html += othersJSON[i].city
                html += '</td>' + '<td class="text-break">'
                html += othersJSON[i].weather
                html += '</td>'
                html += "</tr>"
                table.insertAdjacentHTML('beforeend', html)
            }
		} else {
			throw new Error("problem getting data: " + response.code);
		}
	} catch (error) {
		alert("problem: " + error);
	}
});