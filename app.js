let numbers = [true];
let count = 1;
let sequence = [];
let index = 0;

let arcs = [];

let biggest = 0.



//sound variables

var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

let osc;




class Arc{
    constructor(start,end,dir){
        this.start = start;
        this.end = end;
        this.dir = dir;
    }
    show(){
        stroke(255);
        noFill();
        let diameter = abs(this.end - this.start);
        let x = (this.end + this.start) / 2;
    
        if(this.dir == 0){
            arc(x, 0 , diameter,diameter,PI,0);
        }else{
            arc(x, 0 , diameter,diameter,0,PI);
        }
        
    }
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    frameRate();//lower for "music"

    env = new p5.Envelope();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);

    osc = new p5.Oscillator();
    osc.setType('sine');
    osc.amp(0);//env for "music" 0 for silence
    osc.start();

   


    numbers[index] = true;
    sequence.push(index);

}

function step(){
    let next = index - count;
    if(next < 0 || numbers[next]){
        next = index + count;
    }
    numbers[next] = true;
    sequence.push(next);

    let a = new Arc(index,next, count%2);
    arcs.push(a);

    index = next;

    let n =(index % 25) + 24;

    let freq = pow(2, (n - 49) / 12) * 440; //piano notes frequency range
    console.log(index,freq);
    osc.freq(freq);
    env.play();
    


    if(index > biggest){
        biggest = index;
    }
    count++;
}

function draw(){
    background(0);
    translate(0, height/2);
    scale(width/biggest);
    step();

    for(let a of arcs){
        a.show();
    }

    // console.log(sequence);
}