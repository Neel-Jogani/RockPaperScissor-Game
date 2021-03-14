class Form{
    constructor(){
        this.title= createElement("h2");
        this.input= createInput("Name");
        this.button= createButton("Play");
        this.greeting= createElement("h3");
    }

    display(){
        this.title.html("RockPaperScissor Game");
        this.title.position(350, 150);
        this.title.style("font-size", "80 px");
        this.title.style("color", "red");
        this.input.position(350, 400);
        this.button.position(550, 400);
        
        this.button.mousePressed(()=>{
            this.button.hide();
            this.input.hide();
            player.name= this.input.value();
            playerCount+=1;
            player.index= playerCount;
            player.updateCount(playerCount);
            player.update();
            this.greeting.html("Hello"+ player.name);
            this.greeting.position(350, 450);
        })

        
    }
}