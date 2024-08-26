import {
    cst
} from '../cst.js'


export class Defeat extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.Defeat
        })
    }

    create() {
        this.Enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.add.image(0, 0,  "defeat").setOrigin(0).setDepth(0)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.scene.start(cst.SCENES.MENU)
        }
    }
}