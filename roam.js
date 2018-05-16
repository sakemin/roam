var scene = 0;

var step = 25;

var mainOsc;
var bassOsc;
var noiseOsc;
var trebleOsc;

var tic=0;

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

  bassOsc = new p5.Oscillator();
  bassOsc.start();
  bassOsc.setType('saw');
  bassOsc.freq(110);
  bassOsc.amp(0);

  trebleOsc = new p5.Oscillator();
  trebleOsc.setType('saw');
  trebleOsc.freq(880);
  trebleOsc.amp(0);

  noiseOsc = new p5.Noise();
  noiseOsc.amp(0);
}


function draw(){
  background(0);

  if(scene==0){
    text('r o a m',width/2,height/3);
    if(tic>=44){
      fill(0);
      rect(325,180,50,50);
      rect(450,180,120,50);
      fill(255);
    }
    if(roamer.isIn(14,15,7,8)){
      scene=1;
      tic=0;
    }
    bassOsc.amp(0);
  }
  else if(scene==1){
    for(i=0;i<=width;i+=step){
      for(j=0;j<=height;j+=step){
        if(i==roamer.x && j==roamer.y){        }
        else if(i==800-roamer.x && j==600-roamer.y){       }
        else{
          rect(i,j,step/5,step/5+step-roamer.asize);
          rect(i,j,step/5+step-roamer.asize,step/5);
          rect(i,j,step/5+3*step/5-roamer.bsize,step/5+3*step/5-roamer.bsize);
        }
      }
    }
    roamer.counterRoamer();
    if(roamer.x==width/2 && roamer.y==height/2){
      scene=2;
      step=50;
      tic=0;
      roamer.stepUpdate(2);
      noiseOsc.start();
    }
    bassOsc.amp(map(roamer.asize,step/5,step,2,0));
  }
  else if(scene==2){
    var a = step*(tic - 16);
    if(a<0){a=0;}

    if(a/step<8){
      for(i=a;i<=width-a;i+=step){
        for(j=a;j<=height-a;j+=step){
          if(i==roamer.x && j==roamer.y){        }
          else{
            rect(i,j,step/5,step/5+step-roamer.asize);
            rect(i,j,step/5+step-roamer.asize,step/5);
            rect(i,j,step/5+3*step/5-roamer.bsize,step/5+3*step/5-roamer.bsize);
          }
        }
      }
      bassOsc.amp(map(roamer.asize,step/5,step,2,0)*(map(a/step,0,7,1,0)));
      //noiseOsc.amp(map(roamer.asize,step/5,step,2,0)*(map(a/step,0,7,0,1)));
    }
    else if(a/step>=8 && a/step<17){
      bassOsc.amp(0);
      trebleOsc.start();
    }
    else{
      for(i=0;i<=width;i+=step){
        for(j=0;j<=height;j+=step){
          if((i<=width/2+abs(width/2-roamer.x)&&i>=width/2-abs(width/2-roamer.x)&&(j==height/2+abs(height/2-roamer.y)||j==height/2-abs(height/2-roamer.y))) || ((j<=height/2+abs(height/2-roamer.y)&&j>=height/2-abs(height/2-roamer.y))&&(i==width/2+abs(width/2-roamer.x)||i==width/2-abs(width/2-roamer.x)))){
            rect(i,j,step/5,roamer.asize);
            rect(i,j,roamer.asize,step/5);
            rect(i,j,roamer.bsize,roamer.bsize);}
        }
      }

      trebleOsc.amp(map(roamer.asize,step/5,step,0,0.7));

      if(roamer.x==width/2 && roamer.y==height/2){
        scene=3;
        tic=0;
      }
    }

  }
  else if(scene==3){
    for(i=0;i<=width;i+=step){
      for(j=0;j<=height;j+=step){
        if((i<=width/2+abs(width/2-roamer.x)&&i>=width/2-abs(width/2-roamer.x)&&(j==height/2+abs(height/2-roamer.y)||j==height/2-abs(height/2-roamer.y))) || ((j<=height/2+abs(height/2-roamer.y)&&j>=height/2-abs(height/2-roamer.y))&&(i==width/2+abs(width/2-roamer.x)||i==width/2-abs(width/2-roamer.x)))){
          rect(i,j,step/5,roamer.asize);
          rect(i,j,roamer.asize,step/5);
          rect(i,j,roamer.bsize,roamer.bsize);
        }
        else{
          if(tic>=32&&i==width/2&&j==height/2){
          }
          else{
            rect(i,j,step/5,step/5+step-roamer.asize);
            rect(i,j,step/5+step-roamer.asize,step/5);
            rect(i,j,step/5+3*step/5-roamer.bsize,step/5+3*step/5-roamer.bsize)
          }
        }
      }
    }

    bassOsc.amp(map(roamer.asize,step/5,step,2,0));
    trebleOsc.amp(map(roamer.asize,step/5,step,0,0.7));

    if(tic>=32&&roamer.x==width/2&&roamer.y==height/2){
      scene=4;
      tic=0;
      trebleOsc.setType('square');
      bassOsc.setType('square');
    }
  }
  else if(scene==4){
    for(i=0;i<=width;i+=step){
      for(j=0;j<=height;j+=step){
        if((i<=width/2+abs(width/2-roamer.x)&&i>=width/2-abs(width/2-roamer.x)&&(j==height/2+abs(height/2-roamer.y)||j==height/2-abs(height/2-roamer.y))) || ((j<=height/2+abs(height/2-roamer.y)&&j>=height/2-abs(height/2-roamer.y))&&(i==width/2+abs(width/2-roamer.x)||i==width/2-abs(width/2-roamer.x)))){
          // rect(i,j,step/5,roamer.asize);
          // rect(i,j,roamer.asize,step/5);
          rect(i,j,roamer.bsize,roamer.bsize);
        }
        else{
          rect(i,j,step/5,step/5+step-roamer.asize);
          rect(i,j,step/5+step-roamer.asize,step/5);
          // rect(i,j,step/5+3*step/5-roamer.bsize/3*5,step/5+3*step/5-roamer.bsize/3*5)

        }
      }
    }

    bassOsc.amp(map(roamer.asize,step/5,step,2,0));
    trebleOsc.amp(map(roamer.asize,step/5,step,0,0.7));

    if(tic>=32){
      roamer.sizeUp=true;

      tic++;
    }


    if(tic>=332){
      scene=5;
      tic=0;
      step=25;
      roamer.stepSet(step);
      roamer.sizeUp=false;
      trebleOsc.setType('saw');
      bassOsc.setType('saw');
      trebleOsc.stop();
      bassOsc.stop();
    }


  }

  if(scene!=3 && scene!=4){
    roamer.display();
  }
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

  stepUpdate:function(a){
    this.asize*=a;
    this.bsize*=a;
  },

  stepSet:function(a){
    this.asize=a;
    this.bsize=3*a/5;
  },

  sizeChange:function(){
    if(this.sizeUp){
      this.asize+=2;
      this.bsize+=1;
      if(this.asize==step){
        this.sizeUp=false;
        tic++;
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
  },

  isIn:function(x1, x2, y1, y2){
    if(this.x>=step*x1&&this.x<=step*x2&&this.y>=step*y1&&this.y<=step*y2){
      return true;
    }
    else{
      return false;
    }
  },

  counterRoamer:function(){
    rect(800-this.x,600-this.y,step/5,this.asize);
    rect(800-this.x,600-this.y,this.asize,step/5);
    rect(800-this.x,600-this.y,this.bsize,this.bsize);
  }
}

function keyPressed(){

  if(key == '1'){step=50; roamer.stepUpdate(); scene=3;}
    if(key == '2'){step=100; }

  if(scene!=4 || (scene==4&&tic<32)){

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
  }

  if(roamer.x<0){roamer.x=0;}
  else if(roamer.x>width){roamer.x=width;}

  if(roamer.y<0){roamer.y=0;}
  else if(roamer.y>height){roamer.y=height;}
  // console.log(roamer.x/step,roamer.y/step);
}
