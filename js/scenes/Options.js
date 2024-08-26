import {cst} from '../cst.js'

export class Options extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.Options
        })
    }

    create() {
        this.add.image(0, 0, "options_bg").setOrigin(0).setDepth(0)
        let backButtom = this.add.image(600, 550, "back")
        let easy = this.add.image(200, 200, "easy")
        let medium = this.add.image(450, 200, "medium")
        let hard = this.add.image(700, 200, "hard")
        let master = this.add.image(950, 200, "master")



        backButtom.setInteractive();
        easy.setInteractive();
        medium.setInteractive();
        hard.setInteractive();
        master.setInteractive();
        this.difficulty = "Easy";

        backButtom.on('pointerdown', ()=>{
            this.scene.start(cst.SCENES.MENU, {
                difficulty: this.difficulty
            })
        })

        easy.on('pointerdown', ()=>{
            this.difficulty = "Easy"
            this.sound.play("click")
        })

        medium.on('pointerdown', ()=>{
            this.difficulty = "Medium"
            this.sound.play("click")

        })

        hard.on('pointerdown', ()=>{
            this.difficulty = "Hard"
            this.sound.play("click")

        })

        master.on('pointerdown', ()=>{
            this.difficulty = "Master"
            this.sound.play("click")

        })

    }
}