class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3= createSprite(500,200);
    car4= createSprite(700,200);
    //cars is and array that stores all 4 car
    cars = [car1,car2,car3,car4];

  }

  play(){
    form.hide();
  
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array is shunya(0)
      var index = 0;
      //x nd y are the positions of the car  
      var x = 0,y;
      for(var plr in allPlayers){
        //add 1 to the index for every player
        index=index+1;
        //car away from each other in x direction
        x=x+200;
        //place the car in y direction ,getting the data from the database
        y=displayHeight- allPlayers[plr].distance
        //y index-1=if player is player1,index is 1 but car 1 is at 0th position in cars array 
        cars[index-1].x=x
        cars[index-1].y=y
        if (index === player.index)
      {
        //mark the current player with red color
        cars[index-1].shapeColor="red"
        //set the camera positions according to the car y position 
      camera.position.x=displayWidth/2;
      camera.position.y=cars[index-1].y
      }

       
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
