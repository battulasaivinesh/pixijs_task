import {  Container, Application } from 'pixi.js';
/// <reference path="node_modules/pixi-particles/ambient.d.ts" />
var particles = require('pixi-particles');


export class Part3 {
	main: Container;
	particlesContainer: Container;
	//@ts-ignore
  emitter: particles.Emitter;

	constructor() {
		this.main = new Container();
		this.particlesContainer = new Container();
    this.setup.bind(this);
    this.clean.bind(this);
  }

  setup(app: Application): void {

		this.emitter = new particles.Emitter(
			this.particlesContainer,
			[PIXI.Texture.from("particle1"),PIXI.Texture.from("particle2")],
			{
				"alpha": {
					"start": 0.62,
					"end": 0
				},
				"scale": {
					"start": 0.25,
					"end": 0.75,
					"minimumScaleMultiplier": 1
				},
				"color": {
					"start": "#fff191",
					"end": "#ff622c"
				},
				"speed": {
					"start": 100,
					"end": 300,
					"minimumSpeedMultiplier": 1
				},
				"acceleration": {
					"x": 0,
					"y": 0
				},
				"maxSpeed": 0,
				"startRotation": {
					"min": 265,
					"max": 275
				},
				"noRotation": false,
				"rotationSpeed": {
					"min": 50,
					"max": 50
				},
				"lifetime": {
					"min": 0.1,
					"max": 0.75
				},
				"blendMode": "normal",
				"frequency": 0.001,
				"emitterLifetime": -1,
				"maxParticles": 1000,
				"pos": {
					"x": 0,
					"y": 0
				},
				"addAtBack": false,
				"spawnType": "circle",
				"spawnCircle": {
					"x": 0,
					"y": 0,
					"r": 10
				}
			}
			);

		this.particlesContainer.x = app.screen.width / 2;
    this.particlesContainer.y = app.screen.height / 2;

    this.particlesContainer.pivot.x = this.particlesContainer.width / 2;
		this.particlesContainer.pivot.y = this.particlesContainer.height / 2;   
		
		this.main.addChild(this.particlesContainer);

		// Calculate the current time
		var elapsed = Date.now();
				
		// Update function every frame
		var update = function(){
					
			// Update the next frame
			requestAnimationFrame(update);

			var now = Date.now();
			
			// The emitter requires the elapsed
			// number of seconds since the last update
			this.emitter.update((now - elapsed) * 0.001);
			elapsed = now;
			
			// Should re-render the PIXI Stage
			// renderer.render(stage);
		}.bind(this);

		// Start emitting
		this.emitter.emit = true;
		console.log("Done");
		// Start the update
		update();

  }

  clean(): void {

		if(this.emitter){
			this.emitter.destroy();
		}
  }
}
