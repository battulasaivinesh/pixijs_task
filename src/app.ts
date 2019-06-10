import { Application, loader, Container, Sprite } from 'pixi.js';
import {Part1} from "app/part1.class";
import {Part2} from "app/part2.class";
import {Part3} from "app/part3.class";

declare global {
  interface Window { responsiveRatio: any; }
}

window.responsiveRatio = window.responsiveRatio || {};

window.responsiveRatio = window.innerHeight/720;

class Game {
  private app: Application;
  private UIContainer: Container;
  //@ts-ignore
  private currentScene: number;
  private backButton: Sprite;
  private scenes: Array<Object>;
  fpsMeter: PIXI.Text;

  constructor() {

    // instantiate app
    this.app = new Application({
      width: 1280,
      height: 720,
      backgroundColor: 0x575757 // light blue
    });

    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    // create view in DOM
    document.body.appendChild(this.app.view);

    // preload needed assets
    loader.add('card', '/assets/img/card.png');
    loader.add('pause', '/assets/img/pause.png');
    loader.add('back', '/assets/img/back.png');
    loader.add('button1', '/assets/img/button1.png');
    loader.add('button2', '/assets/img/button2.png');
    loader.add('button3', '/assets/img/button3.png');
    loader.add('backButton', '/assets/img/backButton.png');
    loader.add('particle1', '/assets/fire/particle1.png');
    loader.add('particle2', '/assets/fire/particle2.png');
    loader.add('particle3', '/assets/fire/particle3.png');
    loader.add('particle4', '/assets/fire/particle4.png');
    loader.add('particle5', '/assets/fire/particle5.png');
    loader.add('particle6', '/assets/fire/particle6.png');
    loader.add('particle7', '/assets/fire/particle7.png');
    loader.add('fireBase', '/assets/fire/fireBase.png');
    loader.add('/assets/spritesheet/emoji.json');
		
		// bind this
		this.setupMainScene.bind(this);

    // then launch app
    loader.load(this.setup.bind(this));
  }

  setupMainScene(): void {

		// Main UI Background
    let back = new PIXI.Sprite(PIXI.Texture.from("back"));
    back.anchor.set(0.5);
    back.x = this.app.renderer.width * 0.5;
    back.y = this.app.renderer.height * 0.5;
    back.scale.set(window.responsiveRatio);
    
    this.UIContainer.addChild(back);
    
		// FPS Meter
    this.fpsMeter = new PIXI.Text("FPS: 60.0", {fontFamily : 'Arial', fontSize: 30, fill : 0xffffff, align : 'center'});
    this.fpsMeter.x = this.app.renderer.width - 150;
		this.fpsMeter.y = this.app.renderer.height - 70;
		
		this.app.ticker.add( function() : void {
      this.fpsMeter.text = "FPS: " + Math.round(this.app.ticker.FPS*100)/100;
    }.bind(this))

		// Universal Back Button
    this.backButton = new Sprite(PIXI.Texture.from("backButton"));
		this.backButton.anchor.set(0.5);
		this.backButton.x = 0.1*this.app.renderer.width;
		this.backButton.y = 0.1*this.app.renderer.height;
		this.backButton.scale.set(window.responsiveRatio);
		this.backButton.interactive = true;
    this.backButton.buttonMode = true;
    
    this.backButton.visible = false;

		this.backButton.on("pointerup", function() : void {
      this.backButton.scale.set(window.responsiveRatio);
			this.scenes[this.currentScene].clean();
			this.UIContainer.visible = true;
			this.currentScene = -1;
      this.backButton.visible = false;
    }.bind(this));
    
    this.backButton.on("pointerdown", function() : void {
      this.backButton.scale.set(window.responsiveRatio*0.9);
    }.bind(this))

    this.app.stage.addChild(this.backButton);
    
		
		// Level Buttons
		let buttons = new Container();
    for (let i = 0; i < 3; i++) {
      let button = new PIXI.Sprite(PIXI.Texture.from("button" + (i+1)));
      button.anchor.set(0.5);
      button.x = this.app.renderer.width * 0.5;
      button.y = this.app.renderer.height * (0.37 + 0.13*i);
      button.scale.set(window.responsiveRatio);
      button.interactive = true;
      button.buttonMode = true;

      button.on('pointerdown', function(index: number) : void {
        buttons.getChildAt(index).scale.set(window.responsiveRatio);
        this.UIContainer.visible = false;
        this.backButton.visible = true;
        switch (index) {
          case 0:
            this.scenes[0].setup(this.app);
            this.currentScene = 0;
            this.app.stage.addChild(this.scenes[0].main);
            break;
          case 1:
            this.scenes[1].setup(this.app);
            this.currentScene = 1;
            this.app.stage.addChild(this.scenes[1].main);
            break;
          case 2:
            this.scenes[2].setup();
            this.currentScene = 2;
            this.app.stage.addChild(this.scenes[2].main);
            break;
        }
      }.bind(this,i))

      buttons.addChild(button);
    }

    
    this.UIContainer.addChild(buttons);

    this.app.stage.addChild(this.UIContainer);
    this.app.stage.addChild(this.fpsMeter);
  }

  
  setup(): void {

		// Instantiate Scenes
    this.scenes = [];
    this.scenes.push(new Part1());
    this.scenes.push(new Part2());
    this.scenes.push(new Part3());
    this.currentScene = -1;
    this.UIContainer = new Container();
    
    this.setupMainScene();

  }

  

}

new Game();
