var bg, bgImg
var PLAY=1;
var END=0;
var gameState=PLAY;
var bottomGround
var topGround,dieSound,jumpSound;
var balloon, balloonImg
var b1,b1Img,b2,b2Img,b3,b3Img;
var bt,btImg,bt1,bt1Img,res,resImg,gam,gamImg
function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

b1Img=loadImage("assets/obsBottom1.png");
b2Img=loadImage("assets/obsBottom2.png");
b3Img=loadImage("assets/obsBottom3.png");
btImg=loadImage("assets/obsTop1.png");
bt1Img=loadImage("assets/obsTop2.png");
resImg=loadImage("assets/restart.png");
gamImg=loadImage("assets/gameOver.png");
dieSound=loadSound("assets/die.mp3");
jumpSound=loadSound("assets/jump.mp3");

}
function setup(){

createCanvas(displayWidth-10,displayHeight-170);

//creating top and bottom grounds
bottomGround = createSprite(950,900,2000,10);
bottomGround.visible = false;

b1=createSprite(400,730,20,20);
b1.addImage(b1Img);
b1.scale=0.2;

b2=createSprite(900,730,20,20);
b2.addImage(b2Img);
b2.scale=0.2;

b3=createSprite(1400,715,20,20);
b3.addImage(b3Img);
b3.scale=0.2;

topGround = createSprite(950,10,2000,10);
topGround.visible = false;

bt=createSprite(1500,150,20,20);
bt.addImage(btImg);
bt.scale=0.2;

bt1=createSprite(500,150,20,20);
bt1.addImage(bt1Img);
bt1.scale=0.2;

//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.4;

res=createSprite(900,400,20,20);
res.addImage(resImg);

gam=createSprite(900,330,20,20);
gam.addImage(gamImg);


}

function draw() {
  
  background(bgImg);
  fill("green");
  textSize(20);
  text("HOT-AIR-BALLOON",800,20);
  if(gameState===PLAY){
    gam.visible=false;
    res.visible=false;
          //making the hot air balloon jump
          if(keyDown("space")||touches.length<0) {
            balloon.velocityY = -10;
            //jumpSound.play();
          }
          if(keyDown("left")||touches.length<0){
            balloon.velocityX=-3;
            balloon.velocityY=-3;
          }
          if(keyDown("right")||touches.length<0){
            balloon.velocityX=3;
            balloon.velocityY=3;
          }
          if(balloon.isTouching(bottomGround)){
            balloon.velocityY=0;
            balloon.velocityY=balloon.velocityY-1;
            
          }
               //adding gravity
               balloon.velocityY = balloon.velocityY + 0.8;
               
               if(balloon.isTouching(topGround)||balloon.isTouching(b1)||balloon.isTouching(b2)||balloon.isTouching(b3)){
                gameState=END;
                fill("red");
                textSize(50);
                text("TO DANGER ZONE",700,500);
                dieSound.play();
              }
        }else if(gameState===END){
         balloon.velocityY=0;
         balloon.velocityX=0;
         gam.visible=true;
         res.visible=true;
         if(mousePressedOver(res)){
          reset();
         }
        }
   
        drawSprites();
        
}
function reset(){
  gameState=PLAY;
  gam.visible=false;
  res.visible=false;
  balloon.destroy();
  balloon=createSprite(100,200,20,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.4;
}