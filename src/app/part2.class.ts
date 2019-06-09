import { Application, Container, Sprite } from 'pixi.js';
import { ImageText } from "../utilities/imageText.class";
declare global {
    interface Window { PIXI: any; }
}

window.PIXI = window.PIXI || {};

window.PIXI = PIXI;
window.PIXI[ "default" ] = PIXI;

import "pixi-timer";

export class Part2 {
  main: Container;
	imageText: ImageText;
	strings: Array<string>;
	timer: any;
	emojis: any;
  constructor() {
    this.main = new Container();
		this.setup.bind(this);
		this.setRandomText.bind(this);
		this.strings = [
			"Hello",
			"So Happy",
			"Awesome",
			"Wonderfull",
			"World",
			"Good Going",
			"Universe"
		]
		this.clean.bind(this);
		
		
  }

  setup(app: Application): void {

		this.emojis = PIXI.loader.resources["/assets/spritesheet/emoji.json"]; 

		this.setRandomText(app);

		//@ts-ignore
    this.timer = PIXI.timerManager.createTimer(2000);
    this.timer.loop = true;
    
    this.timer.on('repeat', function(){
			this.setRandomText(app);
		}.bind(this));		
		this.timer.start(); 
		
    
    

    function animate(){
				window.requestAnimationFrame(animate);
				//@ts-ignore
        PIXI.timerManager.update();
    }

    animate();

	}
	
	setRandomText(app :Application): void {
		if(this.imageText){
			this.imageText.clean();
			this.imageText = null;
		}

		let length = Math.floor(Math.random()*2) + 3;
		let ar = [];

		console.log(length);

		for(let i=0; i<length;i++){
			let choice = Math.floor(Math.random()*2) + 1;
			if(choice == 1){
				let randomIndex = Math.floor(Math.random()*this.strings.length);
				ar.push({orderId: i, type: "text", data: this.strings[randomIndex]});
			} else {
				let randomIndex = Math.floor(Math.random()*20) + 1;
				ar.push({orderId: i, type: "image", sprite: new Sprite(this.emojis.textures["emoji" + randomIndex + ".png"])});
			}
		}

		// console.log(ar);

		let fontSize = Math.floor(Math.random()*25) + 40;
		
		this.imageText = new ImageText(ar, {fontFamily : 'Arial', fontSize: fontSize, fill : 0xffffff, align : 'center'})
		this.imageText.main.x = app.screen.width / 2;
    this.imageText.main.y = app.screen.height / 2;

    this.imageText.main.pivot.x = this.imageText.main.width / 2;
		this.imageText.main.pivot.y = this.imageText.main.height / 2;
		
		this.imageText.main.scale.set(window.responsiveRatio);
    
    this.main.addChild(this.imageText.main);
	}

  clean(): void {

		if(this.timer){
			this.timer.stop();
			//@ts-ignore
			PIXI.timerManager.removeTimer(this.timer);
		}
    
    if(this.imageText){
			this.imageText.clean();
    }

  }
}
