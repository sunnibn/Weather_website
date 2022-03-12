const express = require('express');
const axios = require('axios');//const fetch = require('node-fetch'); // current version doesnt work.
const bodyParser = require('body-parser');
const path = require("path"); // path module to send html file

var fs = require('fs');
var jsonpath = './saves.json';
//var jsonF = require(jsonpath);
var jsondata = fs.readFileSync(jsonpath);
var jsonobj = JSON.parse(jsondata);
var logpath = './logs.json';
//var logF = require(logpath);
var logdata = fs.readFileSync(logpath);
var logobj = JSON.parse(logdata);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('client'));





app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/client/home.html"));
});

app.get('/loca-weat', async function (req, res) {
    try {
        let response = await axios('https://www.metaweather.com/api/location/' + jsonobj[0].woeid);
        if (response.status === 200) {
            let woeid_weat = response.data.consolidated_weather[0];
            res.send([response.data.title, woeid_weat.weather_state_name, woeid_weat.weather_state_abbr, response.data.time]);
        } else {
            throw new Error("(problem getting weather data of your woeid)");
        }
    } catch (error) {
        res.send({ "message": error.message });
    }
});

/*app.get('/loca-weat', async function (req, res) {
    //var ip = req.ip;
    try {
        let response = await axios("http://ip-api.com/json/");
        if (response.status === 200) {
            let lattlong = response.data.lat+','+response.data.lon;
            let response2 = await axios("https://www.metaweather.com/api/location/search/?lattlong=" + lattlong, { method: "GET" });
            if (response2.status === 200) {
                let woeid = response2.data[0].woeid;
                //let response3 = await axios('https://www.metaweather.com/api/location/' + woeid);
                if (response3 === 200) {
                    console.log(response2)
                    let body3 = await response3.text();
                    let weatJSON = JSON.parse(body3);
                    res.send([response2.data[0].title, response3.data[0].weather_state_name, response3.data[0].weather_state_abbr])
                }
                //if (response3 === 200) {
                    res.send("tes");
                //}
            } else {
                res.send(["(problem getting cities near you)"]);
            }
        } else {
            res.send(["(problem getting your api location)"]);
        }
    } catch (error) {
        res.send({ "message": error.message });
    }
});
*/

app.get('/search', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/search.html'));
});

app.get('/search/get-city', async function (req, res) {
    try {
        let word = req.query.search_city;
        let response = await axios.get('https://www.metaweather.com/api/location/search/', {params: {query: word}})
        if (response.status === 200) {
            let CWlist = [];
            for (let i=0; i<(response.data).length; i++) {
                CWlist.push({"title": response.data[i].title, "woeid": response.data[i].woeid});
            }
            res.send(CWlist);
        } else {
            throw new Error("(problem getting cities data)");
        }
    } catch (error) {
        res.send({ "messagesss": error.message });
    }
});

app.post('/change-city', async function (req, res) {
    try {
        jsonobj = req.body;
        await fs.writeFile(jsonpath, JSON.stringify(req.body, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.redirect(303, "/");
    } catch (error) {
        res.send({ "message": error.message });
    }
});





app.get('/egg', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/egg.html'));
});

app.get('/egg/getlogs', async function (req, res) {
    res.send(logobj);
});

app.get('/egg/write', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/egg_write.html'));
});

app.post('/egg/write/submit', async function (req, res) {
    try {
        let newLog = {
            "date": req.body.otherDate,
            "city": req.body.otherCity,
            "weather": req.body.otherWeat,
        };
        logobj.push(newLog);
        await fs.writeFile(logpath, JSON.stringify(logobj, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
        //res.send('successfully posted');
        res.redirect("/egg");
    } catch (error) {
        res.send({ "message": error.message });
    }
});

app.get('/egg/amend/:index', async function (req, res) {
    res.sendFile(path.join(__dirname + '/client/egg_amend.html'));
});

app.get('/egg/amend', async function (req, res) {
    try {
        let index = await req.query.index;
        index = parseInt(index);
        res.send(logobj[index]);
    } catch (error) {
        res.send({ "message": error.message });
    }
});

app.post('/egg/send-amend', async function (req, res) {
    try {
        let idx = req.body.otherIndex;
        logobj[idx].date = req.body.otherDate;
        logobj[idx].city = req.body.otherCity;
        logobj[idx].weather = req.body.otherWeat;
        await fs.writeFile(logpath, JSON.stringify(logobj, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.redirect(303, "/egg");
    } catch (error) {
        res.send({ "message": error.message });
    }
});

app.delete('/egg/delete', async function (req, res) {
    try {
        let index = req.query.index;
        index = parseInt(index);
        logobj.splice(index, 1);
        await fs.writeFile(logpath, JSON.stringify(logobj, null, 2), function writeJSON(err) {
            if (err) return console.log(err);
        });
        res.send('Deleted');
    } catch (error) {
        res.send({ "message": error.message });
    }
});
/*app.delete('/egg/delete/:index', async function (req, res) {
    try {
        let index = req.query.index;
        index = parseInt(index);
        console.log(index)
        res.send('delted')
    } catch (error) {
        res.send({ "message": error.message });
    }
});*/


/*
app.use(function (req, res, next) {
    return res.status(404).sendFile(path.join(__dirname + '/client/error/404page.html'));
});
app.use(function (err, req, res, next) {
    return res.status(500).sendFile(path.join(__dirname + '/client/error/500page.html'));
});
*/




module.exports = app;