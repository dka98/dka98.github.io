import {cst}from '../cst.js';

export class FirstIntro extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.FirstIntro
        });
    }

    init(data){
        this.difficulty = data.difficulty
        console.log(data);
        console.log('i got it')

    }

    create() {
        this.Enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.add.image(0, 0, "first_intro").setOrigin(0).setDepth(0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.scene.start(cst.SCENES.SecondIntro, {
                difficulty: this.difficulty
            })

        }
    }
        

}