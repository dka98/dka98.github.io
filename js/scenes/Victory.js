import {cst} from '../cst.js'


export class Victory extends Phaser.Scene{
    constructor() {
        super({
            key: cst.SCENES.Victory
        })
    }

    create() {
        this.Enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.add.image(0, -100, "victory").setOrigin(0).setDepth(0)
        const corona = this.add.image(520, 400, "corona").setOrigin(0).setDepth(0)
        corona.setScale(0.4, 0.4)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.scene.start(cst.SCENES.MENU, {
                //difficulty: this.difficulty
            })
    }
    }
}