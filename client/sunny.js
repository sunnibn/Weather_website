//=====vars=============
var weather = 'c';

var f = -50;
var t;

var skyC; 
var groundC;
var cloud1;
var cloud2;
var cloud3;
var rainweight = 1.5;

var d = new Date();
var hr = d.getHours();





//=====navbar set====================
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let DMY = document.getElementById('todayDMY');
let T = document.getElementById('todayT');
let W = document.getElementById('todayW');
// let LW = document.getElementById('loca_weat');

//---weather+time+DMY
function timeDisplay() {
    d = new Date();
    hr = d.getHours();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let TText = '';
    if (m < 10) {
        m = '0'+m;
    }
    if (s < 10) {
        s = '0'+s;
    }
    if (h > 12) {
        h = h-12;
        if (h < 10) {
            h = '0'+h;
        }
        TText = h+' : '+m+' : '+s+' PM';
    } else if (h === 12) {
        TText = h+' : '+m+' : '+s+' PM';
    } else {
        TText = h+' : '+m+' : '+s+' AM';
    }
    T.innerHTML = TText;
    let DText =  d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
    DMY.innerHTML = DText;
    // T.insertAdjacentText('beforeend', TText);
    // DMY.insertAdjacentText('beforeend', d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear()+'   ');
    setTimeout(timeDisplay, 1000);
}
timeDisplay();

// window.addEventListener('load', async function (event) {
// 	event.preventDefault();
// 	try {
// 		let response = await fetch("/loca-weat", { method: "GET"});
// 		if (response.ok) {
// 			let body = await response.text();
// 			let locaweatJSON = await JSON.parse(body);
// 			if (locaweatJSON.message) {
//                 throw new Error("problem getting data from server: " + locaweatJSON.message);
//             }
//             if (locaweatJSON[1]) {
//             	weather = locaweatJSON[2];
//             	hr = parseInt(locaweatJSON[3].substring(11,13));
//             	console.log(hr)
//                 LW.insertAdjacentText('beforeend', locaweatJSON[0] + ', ' + locaweatJSON[1]);
//             } else {
//                 LW.insertAdjacentText('beforeend', locaweatJSON[0]);
//             }
// 		} else {
//             LW.insertAdjacentText('beforeend', 'Error: failed to get location and weather!');
//             throw new Error("problem getting your location and weather: " + response2.code);
// 		}
// 	} catch (error) {
//         alert("problem: " + error);
//     }
// });

W.addEventListener('change', function (event) {
    switch (event.target.value) {
        case "Clear": weather='c' 
            break;
        case "Snow": weather='sn' 
            break;
        // case "Sleet": weather='s'
        case "Hail": weather='h' 
            break;
        case "Thunderstorm": weather='t' 
            break;
        case "Heavy Rain": weather='hr' 
            break;
        case "Light Rain": weather='lr' 
            break;
        case "Heavy Cloud": weather='hc' 
            break;
        case "Light Cloud": weather='lc' 
            break;
        case "Fog": weather='c' 
            break;
    }
});



//======background set===================
var cnv;
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '-1');
}

function draw() {
	//===sky & ground setting
    // hr = 12;
    // weather = 'lr';
    //username & password set.
    //map, location, time. (similar location->into list.)
    // new loca-> db add. time add. saved loca -> time add.
    //location -> user writes 별로 display. time 순으로 나열.
    //user 검색 가능. display.
    //글 display with weather. 뒤로가기 버튼...
	push();
	if (weather === 'c' || weather === 's' || weather === 'lc') {
		//---sun 1
		if (hr >= 6 && hr <= 9) {
			morning(1);
		} else if (hr >= 10 && hr <= 16) {
			noon(1);
		} else if (hr >= 17 && hr <= 19) {
			evening(1);
		} else {
			night(1);
		}
	} else if (weather === 't' || weather === 'hr' || weather === 'hc') {
		//---heavy sky 2
		if (hr >= 6 && hr <= 9) {
			morning(2);
		} else if (hr >= 10 && hr <= 16) {
			noon(2);
		} else if (hr >= 17 && hr <= 19) {
			evening(2);
		} else {
			night(2);
		}
	} else {
		//---light heavy sky 3
		if (hr >= 6 && hr <= 9) {
			morning(3);
		} else if (hr >= 10 && hr <= 16) {
			noon(3);
		} else if (hr >= 17 && hr <= 19) {
			evening(3);
		} else {
			night(3);
		}
	}
	pop();

	//===t setting
	if (weather === 't') {
        push();
        strokeWeight(1.5);
        stroke(250, 250, 150, random(0,255));
        line(windowWidth / 6, 0, windowWidth / 4, windowHeight / 1.8);
        line(windowWidth / 4, windowHeight / 1.8, windowWidth / 6, windowHeight / 2);
        line(windowWidth / 6, windowHeight / 2, windowWidth / 4, windowHeight);
        line(windowWidth / 1.1, 0, windowWidth / 1.2, windowHeight / 1.6);
        line(windowWidth / 1.2, windowHeight / 1.6, windowWidth / 1.25, windowHeight / 1.4);
        line(windowWidth / 1.25, windowHeight / 1.4, windowWidth / 2, windowHeight);
        line(windowWidth / 1.25, windowHeight / 1.4, windowWidth / 1.27, windowHeight);
        line(windowWidth / 1.2, windowHeight / 1.6, windowWidth, windowHeight);
        pop();
    }

    //===clouds setting
    if (weather !== 'c') {
    	push();
        noStroke();
        for (let i = 0; 700 * i <= windowWidth + 700; i++) {
            translate(700 * i, 0);
            //------------------±¸¸§ »ö Á¤ÇÔ
            if (weather === 't' || weather === 'hr' || weather === 'hc') {
                fill(cloud1);
            } else if (weather === 's' || weather === 'lc') {
                fill(cloud1);
            } else {
                fill(cloud1);
            }
            ellipse(240, windowHeight * 0.3, 50, 25);
            ellipse(240, windowHeight * 0.3, 50, 25);
            ellipse(170, windowHeight * 0.2, 50, 25);
            ellipse(100, windowHeight * 0.23, 70, 22);
            ellipse(500, windowHeight * 0.22, 100, 30);
            ellipse(550, windowHeight * 0.25, 50, 20);
            //------------------±¸¸§ »ö Á¤ÇÔ
            if (weather === 't' || weather === 'hr' || weather === 'hc') {
                fill(cloud2);
            } else if (weather === 's' || weather === 'lc') {
                fill(cloud2);
            } else {
                fill(cloud2);
            }
            ellipse(320, windowHeight * 0.02, 130, 50);
            ellipse(550, windowHeight * 0.18, 100, 50);
            ellipse(250, windowHeight * 0.14, 250, 100);
            ellipse(400, windowHeight * 0.12, 200, 80);
            ellipse(200, windowHeight * 0.27, 120, 30);
            //------------------Ãß°¡ ±¸¸§
            if (weather === 'sn' || weather === 'h' || weather === 'hc' || weather === 't' || weather === 'hr') {
                push();
                translate(0, windowHeight * 0.2);
                ellipse(320, windowHeight * 0.02, 130, 50);
                ellipse(550, windowHeight * 0.18, 100, 50);
                ellipse(50, windowHeight * 0.12, 200, 70);
                ellipse(250, windowHeight * 0.14, 250, 100);
                ellipse(400, windowHeight * 0.12, 200, 80);
                ellipse(600, windowHeight * 0.08, 120, 30);
                ellipse(180, windowHeight * 0.22, 120, 30);
                ellipse(630, windowHeight * 0.24, 120, 50);
                ellipse(440, windowHeight * 0.23, 140, 55);
                pop();
            }
            //------------------±¸¸§ »ö Á¤ÇÔ
            if (weather === 't' || weather === 'hr' || weather === 'hc') {
                fill(cloud3);
            } else if (weather === 's' || weather === 'lc') {
                fill(cloud3);
            } else {
                fill(cloud3);
            }
            ellipse(450, windowHeight * -0.01, 300, 80);
            ellipse(300, windowHeight * 0.1, 200, 80);
            ellipse(100, windowHeight * 0.05, 300, 150);
            ellipse(580, windowHeight * 0.08, 300, 130);
            ellipse(670, windowHeight * 0.22, 130, 50);
            ellipse(50, windowHeight * 0.18, 100, 44);
            ellipse(350, windowHeight * 0.25, 130, 50);
            //----------------------Ãß°¡ ±¸¸§
            if (weather === 'sn' || weather === 'h' || weather === 'hc' || weather === 't' || weather === 'hr') {
                push();
                translate(-50, windowHeight * 0.1);
                ellipse(450, windowHeight * -0.01, 300, 80);
                ellipse(300, windowHeight * 0.1, 200, 80);
                ellipse(100, windowHeight * 0.05, 300, 150);
                ellipse(580, windowHeight * 0.08, 300, 130);
                ellipse(670, windowHeight * 0.22, 130, 50);
                ellipse(50, windowHeight * 0.18, 100, 44);
                ellipse(350, windowHeight * 0.25, 130, 50);
                pop();
            }
        }
        pop();
    }

    //===ground drawing
    push();
    noStroke();
    fill(groundC);
    rect(0, windowHeight * 0.76, windowWidth, windowHeight);
    pop();

    //===falling stuffs setting
    if (weather !== 'hc' && weather !== 'lc' && weather !== 'c') {
        strokeWeight(rainweight);
        stroke(250, 250, 250, 100);
        var sideing = -23;
        push();
        if (weather === 'hr' || weather === 'lr' || weather === 's' || weather === 't') {
            for (let j = 0; 100 * j <= windowHeight + 100; j++) {
                push();
                translate(sideing, 100 * j);
                for (let i = 0; 430 * i <= windowWidth + 430; i++) {
                    push();
                    translate(430 * i, 0);
                    line(15, 15 + f, 15, 50 + f);
                    line(60, 30 + f, 60, 75 + f);
                    line(100, 20 + f, 100, 50 + f);
                    line(150, 50 + f, 150, 90 + f);
                    line(190, 30 + f, 190, 60 + f);
                    line(220, 10 + f, 220, 45 + f);
                    line(270, 20 + f, 270, 60 + f);
                    line(310, 40 + f, 310, 90 + f);
                    line(350, 15 + f, 350, 45 + f);
                    line(400, 50 + f, 400, 90 + f);
                    pop();
                }
                pop();
                sideing = j % 2 * -23;
            }
        } else if (weather === 'sn' || weather === 'sl' || weather === 'h') {
            var t = 1;
            if (weather === 'sl') {
                t = 2;
            }
            noStroke();
            fill(220);
            for (let j = 0; 100 * j <= windowHeight + 100; j++) {
                push();
                translate(sideing, 100 * j);
                if (weather !== 'h') {
                    for (let i = 0; 430 * i <= windowWidth + 430; i++) {
                        push();
                        translate(430 * i, 0);
                        ellipse(15 + f, 50 + f, 10 / t, 10);
                        ellipse(30 + f, 75 + f, 7 / t, 7);
                        ellipse(90 + f, 40 + f, 10 / t, 10);
                        ellipse(150 + f, 90 + f, 8 / t, 8);
                        ellipse(190 + f, 60 + f, 6 / t, 6);
                        ellipse(220 + f, 75 + f, 9 / t, 9);
                        ellipse(270 + f, 60 + f, 10 / t, 10);
                        ellipse(310 + f, 90 + f, 8 / t, 8);
                        ellipse(350 + f, 45 + f, 9 / t, 9);
                        ellipse(400 + f, 90 + f, 7 / t, 7);
                        pop();
                    }
                } else {
                    for (let i = 0; 430 * i <= windowWidth + 430; i++) {
                        push();
                        translate(430 * i, 0);
                        rect(15 + f, 50 + f, 9, 13);
                        rect(30 + f, 75 + f, 6, 10);
                        rect(90 + f, 40 + f, 9, 13);
                        rect(150 + f, 90 + f, 7, 11);
                        rect(190 + f, 60 + f, 5, 9);
                        rect(220 + f, 75 + f, 8, 12);
                        rect(270 + f, 60 + f, 9, 13);
                        rect(310 + f, 90 + f, 7, 11);
                        rect(350 + f, 45 + f, 8, 12);
                        rect(400 + f, 90 + f, 6, 10);
                        pop();
                    }
                }
                pop();
                sideing = j % 2 * -23;
            }
        } else {
            if (weather === '???') {
                push();
                noStroke();
                textSize(32);
                fill(100, 0, 0);
                for (let j = 0; 50 * j <= windowHeight + 100; j++) {
                    for (let i = 0; 50 * i <= windowWidth + 100; i++) {
                        text('?', 50*i, 50*j);
                    }
                }
                pop();
            } else {
                background(0);
            }
        }
        pop();

        if (second() % 2 === 0) {
            f = -50;
        } else {
            f = 0;
        }
    }
}



//---all skys
function morning(num) {
	if (num === 1) {
		background(150, 150, 200);
		for (let i = 0; i < width; i++) {
            stroke(210, 100, 50, i / width * 255);
            line(0, i, width, i);
        }
        groundC = color(50, 70, 20);
        cloud1 = color(220);
        cloud2 = color(210);
        cloud3 = color(190);
        noStroke();
        fill(250, 210, 190);
        ellipse(windowWidth / 2, windowHeight * 1.2, 800, 800);
	} else if (num === 2) {
		background(80);
        groundC = color(50, 70, 20);
        cloud1 = color(150);
        cloud2 = color(140);
        cloud3 = color(120);
	} else {
		background(130);
        groundC = color(50, 70, 20);
        cloud1 = color(210);
        cloud2 = color(190);
        cloud3 = color(160);
        if (weather === 'sn' || weather === 'h') {
            groundC = color(180);
        }
	}
}
function noon(num) {
	if (num === 1) {
		background(165,205,235); //(205, 225, 255);
		groundC = color(70, 110, 30);
        cloud1 = color(255);
        cloud2 = color(245);
        cloud3 = color(235);
	} else if (num === 2) {
		background(130);
        groundC = color(50, 70, 20);
        cloud1 = color(170);
        cloud2 = color(160);//ok
        cloud3 = color(110);
	} else {
		background(180, 180, 185);
        groundC = color(50, 70, 20);
        cloud1 = color(230);
        cloud2 = color(210);//ok
        cloud3 = color(170);
        if (weather === 'sn' || weather === 'h') {
            groundC = color(240);
        }
	}
}
function evening(num) {
	if (num === 1) {
		background(50, 50, 100);
        for (let i = 0; i < width; i++) {
            stroke(210, 100, 50, i / width * 255);
            line(0, i, width, i);
        }
        groundC = color(50, 70, 20);
        cloud1 = color(140);
        cloud2 = color(120);
        cloud3 = color(100);
	} else if (num === 2) {
		background(80);
        groundC = color(50, 70, 20);
        cloud1 = color(150);
        cloud2 = color(140);
        cloud3 = color(120);
	} else {
		background(130);
        groundC = color(50, 70, 20);
        cloud1 = color(210);
        cloud2 = color(190);
        cloud3 = color(160);
        if (weather === 'sn' || weather === 'h') {
            groundC = color(180);
        }
	}
}
function night(num) {
	if (num === 1) {
		background(30, 30, 60);
        groundC = color(30, 50, 7); //°ËÃÊ
        cloud1 = color(120);
        cloud2 = color(100);
        cloud3 = color(70);
        noStroke();
        fill(250, 250, 180);
        ellipse(windowWidth * 0.2, windowHeight * 0.1, 50, 50);
        ellipse(windowWidth * 0.8, windowHeight * 0.2, 5, 5);
        ellipse(windowWidth * 0.1, windowHeight * 0.17, 4, 4);
        ellipse(windowWidth * 0.83, windowHeight * 0.18, 3, 3);
        ellipse(windowWidth * 0.6, windowHeight * 0.1, 3, 3);
        ellipse(windowWidth * 0.56, windowHeight * 0.09, 4, 4);
        ellipse(windowWidth * 0.53, windowHeight * 0.13, 3, 3);
        fill(30, 30, 60);
        ellipse(windowWidth * 0.2 + 5, windowHeight * 0.1 - 5, 50, 50);
	} else if (num === 2) {
        background(40);
        groundC = color(30, 50, 7);
        cloud1 = color(80);
        cloud2 = color(70);
        cloud3 = color(50);
	} else {
		background(35, 35, 45);
		groundC = color(30, 50, 7);
		cloud1 = color(120);
		cloud2 = color(100);
		cloud3 = color(70);
		if (weather === 'sn' || weather === 'h') {
		    groundC = color(100);
		}
	}
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}