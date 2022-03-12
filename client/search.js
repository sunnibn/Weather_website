function loadingfunc() {
    let html = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    document.getElementById("sbutton").innerHTML = html;
}

var results = document.getElementById("search_result");
var searchform = document.getElementById('searchform');
searchform.addEventListener('submit', async function (req, res) {
    event.preventDefault();
    let word = document.getElementById('search_city').value;
    results.innerHTML = "";
    try {
        console.log('yes')
        let response = await fetch("/search/get-city?search_city="+word, { method: "GET" });
        if (response.ok) {
            let body = await response.text();
            let cityJSON = await JSON.parse(body);
            if (cityJSON.message) {
                throw new Error("problem getting data from server: " + cityJSON.message);
            }
            if (body === '[]') {
                html = '<tr>'
                html += 'Cannot find the city you want? <br />'
                html += '</tr>'
                results.insertAdjacentHTML('afterbegin', html);
            } else {
                for (let i = 0; i < cityJSON.length; i++) {
                    html = '<tr>'
                    html += "<td class='text-break'>"
                    html += cityJSON[i].title
                    html += "</td>"
                    html += "<td class='text-break'>"
                    html += '<button class="btn btn-light" onclick="changecheck('
                    html += "'"
                    html += cityJSON[i].title
                    html += "'"
                    html += ','
                    html += cityJSON[i].woeid
                    html += ');" >'
                    html += '<i class="bi bi-geo-alt"></i>'
                    html += '</button>'
                    html += "</td>"
                    results.insertAdjacentHTML('afterbegin', html);
                }
            }
            
            document.getElementById("sbutton").innerHTML = 'Search';
        } else {
            throw new Error("failed to get search result!");
        }
    } catch (error) {
        document.getElementById("sbutton").innerHTML = 'Search';
        alert("problem: " + error);
    }
});

async function changecheck(name, woeid) {
    if (window.confirm('Change your city to '+'"'+name+'"?')) {
        //change city
        let newdata = [{"city":name, "woeid":woeid}]
        let response = await fetch('/change-city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newdata, null, 2),
        });
        //let response = await fetch("/change-city?change_c="+name+"&change_w="+woeid, { method: "POST" });
        if (response.ok) {
            window.alert('Changed!');
            location.href = "/";
        }
    }
}