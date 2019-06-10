import {  Container, Sprite } from 'pixi.js';
/// <reference path="node_modules/pixi-particles/ambient.d.ts" />
var particles = require('pixi-particles');


export class Part3 {
	main: Container;
	particlesContainer: Container;
	fireBase: Sprite;
	//@ts-ignore
  emitter: particles.Emitter;

	constructor() {

		// Main Container
		this.main = new Container();

		// Particles Container
		this.particlesContainer = new Container();

		// Bind this
    this.setup.bind(this);
		this.clean.bind(this);

		// Particle Emitter
		this.emitter = new particles.Emitter(
			this.particlesContainer,
			[PIXI.Texture.from("particle3"),PIXI.Texture.from("particle5"),PIXI.Texture.from("particle2")],
			{
				"alpha": {
					"start": 0.69,
					"end": 0
				},
				"scale": {
					"start": 0.6,
					"end": 0.95,
					"minimumScaleMultiplier": 1
				},
				"color": {
					"start": "#f0ec73",
					"end": "#e06d2a"
				},
				"speed": {
					"start": 100,
					"end": 500,
					"minimumSpeedMultiplier": 1
				},
				"acceleration": {
					"x": 0,
					"y": 0
				},
				"maxSpeed": 0,
				"startRotation": {
					"min": 270,
					"max": 275
				},
				"noRotation": true,
				"rotationSpeed": {
					"min": 50,
					"max": 50
				},
				"lifetime": {
					"min": 0.1,
					"max": 0.75
				},
				"blendMode": "normal",
				"frequency": 0.002,
				"emitterLifetime": -1,
				"maxParticles": 800,
				"pos": {
					"x": 0,
					"y": 0
				},
				"addAtBack": true,
				"spawnType": "circle",
				"spawnCircle": {
					"x": 0,
					"y": 0,
					"r": 26
				}
			}
			
			);

		// Center to the screen
		this.particlesContainer.scale.set(window.responsiveRatio);
		this.particlesContainer.x = window.innerWidth / 2;
		this.particlesContainer.y = window.innerHeight / 2 - this.particlesContainer.height/2;

		// Fire Base
		this.fireBase = new PIXI.Sprite(PIXI.Texture.from("fireBase"));
		this.fireBase.anchor.set(0.5);
		this.fireBase.x = 0.5*window.innerWidth;
		this.fireBase.y = 0.5*window.innerHeight + 40*window.responsiveRatio;
		this.fireBase.scale.set(0.8*window.responsiveRatio);
		this.fireBase.visible = false;
		
		this.main.addChild(this.fireBase);
		this.main.addChild(this.particlesContainer);


		// Calculate the current time
		var elapsed = Date.now();
				
		// Update function every frame
		var update = function() : void {
					
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

		update();
		
		this.emitter.emit = false;
  }

  setup(): void {

		// Start Emitting
		this.fireBase.visible = true;
		this.emitter.visible = true;
		this.emitter.emit = true;

  }

  clean(): void {

		// Stop Emitting
		if(this.fireBase){
			this.fireBase.visible = false;
		}

		if(this.emitter){
			this.emitter.cleanup();
			this.emitter.emit = false;
		}
		
  }
}
