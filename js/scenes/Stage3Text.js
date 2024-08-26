import {cst} from '../cst.js'

export class Stage3Text extends Phaser.Scene{
    constructor() {
        super({
            key: cst.SCENES.Stage3Text
        })
    }

    init(data){
        this.infection_oldScene = data.chinese.infection
        this.corona_old = data.chinese.firstAmmo
        this.toilet_old = data.chinese.secondAmmo
        this.livesOld = data.chinese.lives
    }

    create() {
        this.Enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.add.image(0, 0, "stage_3").setOrigin(0).setDepth(0)  
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.scene.start(cst.SCENES.Stage3, {
                infection_oldScene: this.infection_oldScene,
                corona_old: this.corona_old,
                toilet_old: this.toilet_old,
                livesOld: this.livesOld
            })
    }
    }
}