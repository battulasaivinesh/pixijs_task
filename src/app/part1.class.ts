import { Application, Container, Sprite } from 'pixi.js';
import 'pixi-tween'; //pixi-tween is added automatically to the PIXI namespace

export class Part1 {
  main: Container;
  rightStack: Container;
	leftStack: Container;
	//@ts-ignore
	tweens: Array<PIXI.tween.Tween>;

  constructor() {

		// Main Container
		this.main = new Container();
		
		// Bind this
    this.setup.bind(this);
		this.clean.bind(this);
		
		// Hook tweenManager Update Function
		function animate() {

      window.requestAnimationFrame(animate);
			//@ts-ignore
			PIXI.tweenManager.update();
			
		}
		
		animate();
  }

  setup(app: Application): void {
    
		
		this.tweens = [];
		
    if (this.leftStack) {
			this.leftStack.destroy();
    }

    if (this.rightStack) {
			this.rightStack.destroy();
    }

    this.rightStack = new Container();
		this.leftStack = new Container();

		// Creates and tweens all the cards
    for(let i=0; i<144;i++){
			const card = new Sprite(PIXI.Texture.from("card"));
			card.anchor.set(0.5);
			card.x = app.renderer.width / 4;
			card.y = app.renderer.height /7 + i*3*window.responsiveRatio;
			card.scale.set(window.responsiveRatio);
			//@ts-ignore
			var tween = PIXI.tweenManager.createTween(card);
			tween.to({
				x: 3 * app.renderer.width / 4, 
				y: app.renderer.height / 7 + (143-i)*3*window.responsiveRatio
			});
			tween.delay = (143-i)*1000;
			tween.time = 2000;
			tween.start();
			tween.on("end", function(elapsed: number){
				this.rightStack.addChild(this.leftStack.getChildAt(elapsed));
			}.bind(this, i))
			this.tweens.push(tween);
			this.leftStack.addChild(card);
    }
    
    this.main.addChild(this.rightStack);
   	this.main.addChild(this.leftStack);
	
  }

  clean(): void {

		// Clear Current Scene
		for (let i = 0; i < this.tweens.length; i++) {
			this.tweens[i].stop();
		}

		this.tweens = [];
		if (this.rightStack) {
			this.rightStack.destroy();
		}

		if (this.leftStack) {
			this.leftStack.destroy();
		}
  }
}
