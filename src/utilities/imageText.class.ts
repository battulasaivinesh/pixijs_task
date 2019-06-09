import { Container, Sprite, Text } from 'pixi.js';

type Data = { orderId: number, type: string, data?: string, sprite?: Sprite };

export class ImageText {
  main: Container;
  style: Object;
	currentPosition: number;
	height: number;

  constructor(list: Array<Data>, style?: Object){
		
		this.main = new Container();
		this.style = style || {};
		let text = new Text("Test12321", this.style);
		this.main.addChild(text);
		this.height = this.main.height;
		this.main.destroy();
		this.main = new Container();
		
		
		this.currentPosition = 0;
		list.sort(this.dynamicSort("orderId"));
		for(let i in list){
			if (list[i].type == "text") {
				this.addText(list[i].data);
			} else if (list[i].type == "image") {
				this.addSprite(list[i].sprite);
			}
		}
		
		this.addText.bind(this);
		this.addSprite.bind(this);
		this.setup.bind(this);
		this.setup();

		
  }

  setup(): void {
	
  }

  addText(data: string): void {
		let text = new Text(data, this.style);
		text.x = this.currentPosition;
		this.currentPosition += text.width + 10;
		this.main.addChild(text);
  }

  addSprite(image: Sprite): void {
		image.x = this.currentPosition;
		image.scale.set( this.height / image.height );
		this.currentPosition += image.width + 10;
		this.main.addChild(image);
  }

  dynamicSort(property: string): (a: Data, b:Data) => number {
    var sortOrder = 1;

    return function (a: any,b: any) {
			if(sortOrder == -1){
				if(b[property] < a[property]){
					return -1;
				} else if(b[property] > a[property]){
					return 1;
				} else {
					return 0;
				}
			} else {
				if(b[property] < a[property]){
					return 1;
				} else if(b[property] > a[property]){
					return -1;
				} else {
					return 0;
				}
			}        
    }
  }

  clean(): void {
		this.currentPosition = 0;
		this.style = {};
		this.main.destroy();
  }
}
