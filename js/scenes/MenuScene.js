import {cst} from '../cst.js';

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: cst.SCENES.MENU
        });
    }
    
    init(data){
        this.difficulty = data.difficulty
        console.log(data);
        console.log('i got it')

    }
 
    create(){
       //the lowest number will appear on the bottom to solve the problem of adding by order
        this.add.image(0,0,"title_bg").setOrigin(0).setDepth(0) //set this on the bottom

        this.sound.pauseOnBlur = false; //avoids the sound to be muted when the cursor is out of the canvas
        var music = this.sound.add("intro")
        music.play()

        let playButtom = this.add.image(this.game.renderer.width/2, this.game.renderer.height/2, "play").setDepth(1)
        let optionsButton = this.add.image(this.game.renderer.width/2, this.game.renderer.height/ 2 + 70, "options").setDepth(1)
        let coronaBottle = this.add.image(100,100, "corona")
        coronaBottle.setScale(0.15)
		coronaBottle.angle = 90;
        coronaBottle.setVisible(false)

        /*
            pointerup -> click and release
            pointerdown -> just clik
        */
        playButtom.setInteractive();
        
        playButtom.on('pointerover', ()=>{
            console.log("press to play")
            coronaBottle.setVisible(true)
            coronaBottle.x = playButtom.x - playButtom.width + 20;
            coronaBottle.y = playButtom.y;
            

        })
        playButtom.on('pointerout', ()=>{
            console.log("you exit the space")
            coronaBottle.setVisible(false)

        })

        playButtom.on('pointerdown', ()=>{
            console.log("pressed")
            music.stop()
            this.scene.start(cst.SCENES.FirstIntro,{
                difficulty: this.difficulty
            }); //sending the music variable
        })

        optionsButton.setInteractive();
        optionsButton.on('pointerover', ()=>{
            console.log("press to play")
            coronaBottle.setVisible(true)
            coronaBottle.x = optionsButton.x - optionsButton.width + 20;
            coronaBottle.y = optionsButton.y;
        })
        optionsButton.on('pointerout', ()=>{
            console.log("you exit the space")
            coronaBottle.setVisible(false)

        })
        optionsButton.on('pointerdown', ()=>{
            console.log("pressed")
            music.stop()
            this.scene.start(cst.SCENES.Options)
        })
        
    }
}