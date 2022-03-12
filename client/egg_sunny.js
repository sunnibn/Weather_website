var skyC;
var groundC;
var cloud1;
var cloud2;
var cloud3;



var cnv;
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '-1');
}



function draw() {
	//---sky
    push();
    background(0);
    for (let i = 0; i < width; i++) {
        stroke(220, 0, 0, i / width * 255);
        line(0, i, width, i);
    }
    groundC = color(0);
    cloud1 = color(50);
    cloud2 = color(40);
    cloud3 = color(30);
    pop();

    //---clouds
    push();
    noStroke();
    for (let i = 0; 700 * i <= windowWidth + 700; i++) {
        translate(700 * i, 0);
        //---
        fill(cloud1);
        ellipse(240, windowHeight * 0.3, 50, 25);
        ellipse(240, windowHeight * 0.3, 50, 25);
        ellipse(170, windowHeight * 0.2, 50, 25);
        ellipse(100, windowHeight * 0.23, 70, 22);
        ellipse(500, windowHeight * 0.22, 100, 30);
        ellipse(550, windowHeight * 0.25, 50, 20);
        //---
        fill(cloud2);
        ellipse(320, windowHeight * 0.02, 130, 50);
        ellipse(550, windowHeight * 0.18, 100, 50);
        ellipse(250, windowHeight * 0.14, 250, 100);
        ellipse(400, windowHeight * 0.12, 200, 80);
        ellipse(200, windowHeight * 0.27, 120, 30);
        //---
        fill(cloud3);
        ellipse(450, windowHeight * -0.01, 300, 80);
        ellipse(300, windowHeight * 0.1, 200, 80);
        ellipse(100, windowHeight * 0.05, 300, 150);
        ellipse(580, windowHeight * 0.08, 300, 130);
        ellipse(670, windowHeight * 0.22, 130, 50);
        ellipse(50, windowHeight * 0.18, 100, 44);
        ellipse(350, windowHeight * 0.25, 130, 50);
    }
    pop();



    //---ground
    push();
    noStroke();
    fill(groundC);
    rect(0, windowHeight * 0.76, windowWidth, windowHeight);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}