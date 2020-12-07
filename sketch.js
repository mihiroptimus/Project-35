var database ;
var foodS=20,foodStock;
var dog,dog1,dog2
var position
//var form
var feed, add, last 
var foodobject
var Feedtime
var Lastfeed
var name = "Dog"

function preload()
{
  dogimage1 = loadImage("images/dogImg.png")
  dogimage2 = loadImage("images/dogImg1.png")
  MilkImage=loadImage('images/Milk.png');
	//load images here
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
  foodobject=new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimage1);
  dog.scale=0.2

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  Lastfeed = database.ref('FeedTime');
  Lastfeed.on("value",readTime);
  var dogo = database.ref('Food');
  dogo.on("value", readPosition);
  feed = createButton("FEED "+name);
  feed.position(700,130);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  add.position(600, 130);
  add.mousePressed(AddFood);
}

function readTime(time){
  Feedtime = time.val()
}

function readStock(data){
 foodS = data.val();
}

function writeStocks(x){

  if(x <= 0){
    x = 0;
  }

  else{
    x = x - 1
  }

  database.ref('/').update({Food: x})
}

var pasttime;
var delay = 15;
var state = "sit";

function draw() {  
  background(46,139,87);

  foodobject.display()
   
  fill(255,255,254);
  textSize(15);
  //console.log(Feedtime)
  text("Last Feed: "+pasttime, 600, 115)
  drawSprites();
  setToHour()
  if(pt < frameCount - delay){
    dog.addImage(dogimage1) 
  }
 if(pt > frameCount - delay){
  image(MilkImage,500+(frameCount - pt),220,75,60);
 }
}

function setToHour(){
  pasttime = "Not set yet"
  if(Feedtime){
    if(Feedtime >=12)
    pasttime = Feedtime- 12 +" PM";
   }
   else {
     pasttime = Feedtime + " AM";
   }
}

function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function writePosition(variable){
  if(variable > 0){
    variable = variable - 1;
  }
  else{
    variable = 0;
  }
  database.ref('/').set({
    'Food': variable
  })

}
var pt;

function FeedDog(){

  if(foodS>0){
    pt = frameCount;

    dog.addImage(dogimage2) 
    foodobject.updateFoodStock(foodobject.getFoodStock()-1)
    
    database.ref('/').update({
     Food:foodobject.getFoodStock(),
     FeedTime:hour()
   })

  }
  }
  function AddFood(){
    position++
    database.ref('/').update({
      Food: position})
    }
    

    
