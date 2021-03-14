class Player{
    constructor(){
      this.name= null;
      this.index= 0;     
    }

    getPlayerCount(value){
        var playerCountRef= database.ref("playerCount")
        playerCountRef.on("value", (data)=>{
            playerCount= data.val();
        })
    }

    updateCount(data){
        database.ref("/").update({
            playerCount: data
        })
    }

    update(){
        var playerIndex= "players/player"+ this.index;
        database.ref(playerIndex).set({
            name:this.name
        })
    }
}