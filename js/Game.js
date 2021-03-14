class Game{
    constructor(){     
    }

    getState(){
        var state= database.ref("gameState");
        state.on("value", (data)=>{
            multiState= data.val();
        })
    }

    updateState(data){
        database.ref("/").update({
            gameState: data
        })
    }

    start(){
        if(multiState===0){
            player= new Player();
            player.getPlayerCount();
            form= new Form();
            form.display();
        }
    }
} 