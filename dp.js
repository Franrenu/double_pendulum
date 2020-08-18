let PI = 3.14159
let g = 1;

let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = PI /2;
let a2 = PI /2;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0.01;
let a2_a = 0;
let htsx = [];
let htsy = [];
let flag = false;

var r1_slider = document.getElementById("r1_size");
var r2_slider = document.getElementById("r2_size");
var m1_slider = document.getElementById("m1_value");
var m2_slider = document.getElementById("m2_value");

var r1_out = document.getElementById("r1_size_value");
var r2_out = document.getElementById("r2_size_value");
var m1_out = document.getElementById("m1_v");
var m2_out = document.getElementById("m2_v");

r1_out.innerHTML = r1_slider.value;
r2_out.innerHTML = r2_slider.value;
m1_out.innerHTML = m1_slider.value;
m2_out.innerHTML = m2_slider.value;

r1_slider.oninput = function() {
    r1_out.innerHTML = this.value;
    r1 = this.value;
}

r2_slider.oninput = function() {
    r2_out.innerHTML = this.value;
    r2 = this.value;
}

m1_slider.oninput = function() {
    m1_out.innerHTML = this.value;
    m1 = this.value;
}

m2_slider.oninput = function() {
    m2_out.innerHTML = this.value;
    m2 = this.value;
}

document.querySelector(".startbutton").addEventListener("click" , ()=> {
    flag = true;
});

document.querySelector(".stopbutton").addEventListener("click" , ()=> {
    flag = false;
});

function setup() {
    let cnv =  createCanvas(1000, 700);
    cnv.position(50 , 0);
}

function draw() {

    

    if (flag) {
        //a1_a:
        let num1 = -g * (2 * m1 + m2) * sin(a1);
        let num2 = -m2 * g * sin(a1 - 2 * a2);
        let num3 = -2 * sin(a1 - a2) * m2;
        let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
        let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
        a1_a = (num1 + num2 + num3 * num4) / den;

        //a2_a: 
        let n1 = 2 * sin(a1 - a2);
        let n2 = (a1_v * a1_v * r1 * (m1 + m2));
        let n3 = g * (m1 + m2) * cos(a1);
        let n4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
        let d = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));

        a2_a = (n1 * (n2 + n3 + n4)) / d;


        background(51);
        stroke(0);
        strokeWeight(2);

        translate(500, 200);

        let x1 = r1 * sin(a1);
        let y1 = r1 * cos(a1);
        let x2 = x1 + r2 * sin(a2);
        let y2 = y1 + r2 * cos(a2);

        htsx.push(x2);
        htsy.push(y2);


        line(0, 0, x1, y1);
        fill(0);
        ellipse(x1, y1, m1, m1);

        line(x1, y1, x2, y2);
        fill(0);
        ellipse(x2, y2, m2, m2);

        for (var i = 0; i < htsx.length; i++) {

            stroke(255, 0, 232);
            line(htsx[i - 1], htsy[i - 1], htsx[i], htsy[i]);

        }

        a1_v += a1_a;
        a2_v += a2_a;
        a1 += a1_v;
        a2 += a2_v;
    }
}