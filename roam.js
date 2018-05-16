var scene = -1;

var step = 25;

var mainOsc;
var bassOsc;
var trebleOsc;

var tic=0;

var grav=1;
var jumpPower =15;

var num=0;

function setup(){
  createCanvas(800,600);
  background(0);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(step*2);
  fill(255);
  noStroke();


}


function draw(){
  background(0);

  if(scene==-1){
    textSize(step*2);
    text('r o a m',width/2,height/3);
    textSize(step);
    text('press any key',width/2,2*height/3);
    if(keyIsPressed){
      scene=0;

      soundSummon();

      mainOsc = new p5.Oscillator();
      mainOsc.setType('square');
      mainOsc.freq(440);
      mainOsc.amp(0);

      bassOsc = new p5.Oscillator();
      bassOsc.setType('saw');
      bassOsc.freq(110);
      bassOsc.amp(0);

      trebleOsc = new p5.Oscillator();
      trebleOsc.setType('saw');
      trebleOsc.freq(880);
      trebleOsc.amp(0);
      mainOsc.start();
      bassOsc.start();
    }
  }
  else if(scene==0){
    textSize(step*2);
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


    if(tic>=212){
      scene=5;
      tic=0;
      step=25;
      roamer.stepSet(step);
      roamer.sizeUp=false;
      trebleOsc.setType('saw');
      bassOsc.setType('saw');
      trebleOsc.stop();
      bassOsc.stop();
      roamer.x=width/2;
      roamer.y=height/2;
    }


  }
  else if(scene==5){
    if(keyIsDown(RIGHT_ARROW)){
      roamer.x+=5;
      if(roamer.x>width-step/2){roamer.x=width-step/2;}
    }
    else if(keyIsDown(LEFT_ARROW)){
      roamer.x-=5;
      if(roamer.x<step/2){roamer.x=step/2;}
    }
    roamer.gravCal();

    brick(650,520,300);
    brick(150,520,300);
    brick(650,440,150);
    brick(150,440,150);
    brick(750,360,150);
    brick(50,360,150);
    brick(250,280,170);
    brick(550,280,170);
    brick(400,200,200);
    brick(150,120,170);
    brick(650,120,170);
    brick(400,40,200);

    rect(400,125,roamer.asize,roamer.asize);

    if(roamer.x>=400-step/2&&roamer.x<=400+step/2&&roamer.y<=125+step/2&&roamer.y>=125-step/2){
      roamer.x=400;
      roamer.y=125;
      scene=6;
      tic=0;
      bassOsc.start();
      bassOsc.freq(110);
    }

    roamer.pyUpdate();
  }
  else if(scene==6){
    var i = 1+tic%(width/step-1);
    var j = 1+int(tic/(width/step-1));

    rect(i*step,j*step,step/5,step/5+step-roamer.asize);
    rect(i*step,j*step,step/5+step-roamer.asize,step/5);
    rect(i*step,j*step,step/5+3*step/5-roamer.bsize,step/5+3*step/5-roamer.bsize);

    bassOsc.freq(110+(i-1)+(j-1)*32);

    bassOsc.amp(map(roamer.asize,step/5,step,0,1));

    if(tic==139){
      scene=7;
      tic=0;
      roamer.x=width/2;
      roamer.y=height/2;
      bassOsc.stop();
      step=500;
      roamer.stepUpdate(20);
    }
  }
  else if(scene==7){
    if(tic>=4){
      roamer.sizeUp=true;
    }

    num++;

    if(num>=2150){
      background(255);
      scene=8;
      mainOsc.stop();
    }

  }
  else if(scene==8){
    background(255);
    fill(0);
    textSize(50);
    text('r o a m',width/2,2*height/5);
    textSize(25);
    text('sakemin',width/2,2.5*height/5);
    text('2018',width/2,3*height/5);
  }

  if(scene!=8 && scene!=3 && scene!=4){
    roamer.display();
  }

  if(scene!=8){
    roamer.sizeChange();
  }

  // console.log(scene);
}


var roamer = {
  x:400,
  y:300,

  py:300,

  dy:0,

  asize:step,
  bsize:3*step/5,

  sizeUp:false,

  landed:false,

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
    if(scene!=-1){
      mainOsc.amp(map(this.asize,step/5,step,0,1));
    }
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
  },

  gravCal:function(){
    this.y-=this.dy;
    this.dy-=grav;
    if(this.landed){this.dy=0;}
    if(this.y>height-step/2){
      this.y=height-step/2;
      this.landed=true;
    }
  },

  pyUpdate:function(){
    this.py=this.y;
  }
}

function keyPressed(){

  // if(key == '1'){ scene=5;}

  if((scene!=7 && scene!=5 && scene!=4 && scene!=6) || (scene==4&&tic<32)){

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
  else if(scene==5){
    if(((keyCode == UP_ARROW)||(key == ' '))&&roamer.landed){
      roamer.dy=jumpPower;
      roamer.landed=false;
    }
  }

  if(roamer.x<0){roamer.x=0;}
  else if(roamer.x>width){roamer.x=width;}

  if(roamer.y<0){roamer.y=0;}
  else if(roamer.y>height){roamer.y=height;}
  // console.log(roamer.x/step,roamer.y/step);
}

function brick(x,y,w){
  if(roamer.x>=x-w/2&&roamer.x<=x+w/2&&roamer.y>=y-step&&roamer.py<=y-step){
    roamer.landed=true;
    roamer.y=y-step;
  }
  else if(roamer.x>=x-w/2&&roamer.x<=x+w/2&&roamer.y<=y+step&&roamer.py>=y+step){
    roamer.y=y+step;
  }
  else if(((roamer.x<=x-w/2&&roamer.x>=x-w/2-step)||(roamer.x>=x+w/2&&roamer.x<=x+w/2+step))&&roamer.y==y-step){
    roamer.landed=false;
  }

  if((roamer.x>x-w/2-step/2&&roamer.x<x)&&(roamer.y>y-step&&roamer.y<y+step)){
    roamer.x=x-w/2-step/2;
  }
  else if((roamer.x<x+w/2+step/2&&roamer.x>x)&&(roamer.y>y-step&&roamer.y<y+step)){
    roamer.x=x+w/2+step/2;
  }
  rect(x,y,w,step);
}
