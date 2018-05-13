var scene = 1;

var step = 25;

var mainOsc;

function setup(){
  createCanvas(800,600);
  background(0);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(step*2);
  fill(255);
  noStroke();

  mainOsc = new p5.Oscillator();
  mainOsc.setType('square');
  mainOsc.freq(440);
  mainOsc.amp(0);
  mainOsc.start();
}


function draw(){
  background(0);

  if(scene==0){
    text('r o a m',width/2,height/3);

  }
  else if(scene==1){
    for(i=0;i<=width;i+=step){
      for(j=0;j<=height;j+=step){
        if(i==roamer.x && j==roamer.y){        }
        else{
          rect(i,j,step/5,step/5+step-roamer.asize);
          rect(i,j,step/5+step-roamer.asize,step/5);
          rect(i,j,step/5+3*step/5-roamer.bsize,step/5+3*step/5-roamer.bsize);
        }
      }
    }
  }

  roamer.display();
  roamer.sizeChange();
}


var roamer = {
  x:400,
  y:300,

  asize:step,
  bsize:3*step/5,

  sizeUp:false,

  display:function(){
    rect(this.x,this.y,step/5,this.asize);
    rect(this.x,this.y,this.asize,step/5);
    rect(this.x,this.y,this.bsize,this.bsize);
  },

  sizeChange:function(){
    if(this.sizeUp){
      this.asize+=2;
      this.bsize+=1;
      if(this.asize==step){
        this.sizeUp=false;
      }
    }
    else{
      this.asize-=2;
      this.bsize-=1;
      if(this.asize==step/5){
        this.sizeUp=true;
      }
    }
    mainOsc.amp(map(this.asize,step/5,step,0,1));
  }
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW){
    roamer.x+=step;
  }
  else if(keyCode == UP_ARROW){
    roamer.y-=step;
  }
  else if(keyCode == DOWN_ARROW){
    roamer.y+=step;
  }
  else if(keyCode == LEFT_ARROW){
    roamer.x-=step;
  }
  console.log('ah');
}
