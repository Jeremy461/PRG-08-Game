/// <reference path="entity.ts" />

class Player extends Entity {

    public speed:number;
    public state:PlayerState;
    public damage: number;
    public shootingSpeed: number;
    public arrows: Array<Arrow>;
    public width: number;
    public height: number;

    public callback: EventListener;

    constructor(x:number,y:number){
        super(x,y);
        this.speed = 5;
        this.shootingSpeed = 10;
        this.arrows = [];
        this.width = 32;
        this.height = 32;

        let container: HTMLElement = document.getElementById("container");

        this.div = document.createElement("player");
        container.appendChild(this.div);

        //add event listeners for moving and shooting
        this.callback = (e:KeyboardEvent) => this.onKeyDown(e);
        window.addEventListener("keydown", this.callback);
        window.addEventListener("keyup", (e:KeyboardEvent) => this.state.onKeyUp(e));

        //set player state to default
        this.state = new Idle(this);
    }

    //handle user input for the player
    onKeyDown(e:KeyboardEvent){
        if(e.keyCode === 37){
            this.state.onMoveLeft();
        }
        if(e.keyCode === 39){
            this.state.onMoveRight();
        }
        if(e.keyCode === 32){
            this.state.onFire();
        }
    }

    //update player behaviour
    update(){
        this.state.action();
    }

    //update the position
    public draw(){
        this.div.style.transform = "translate("+this.x+"px,"+this.y+"px)";
    }
}