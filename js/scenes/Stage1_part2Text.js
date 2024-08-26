import {cst} from '../cst.js'

export class Stage1_part2Text extends Phaser.Scene{
    constructor() {
        super({
            key: cst.SCENES.Stage1_part2Text
        })
    }

    init(data){
        this.infection_oldScene = data.chinese.infection
        this.corona_old = data.chinese.firstAmmo
        this.toilet_old = data.chinese.secondAmmo
        this.livesOld = data.chinese.lives
        this.difficulty = data.difficulty
        console.log('i got it the value is: ' + this.difficulty +" " + this.livesOld)
        
    }

    create() {
        this.Enter = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ENTER
        );
        this.add.image(0, 0, "stage1_part2").setOrigin(0).setDepth(0)  
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.Enter)) {
            this.scene.start(cst.SCENES.Stage1_part2, {
                infection_oldScene: this.infection_oldScene,
                corona_old: this.corona_old,
                toilet_old: this.toilet_old,
                livesOld: this.livesOld,
                difficulty: this.difficulty
            })
    }
    }
}
