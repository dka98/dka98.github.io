import {
    cst
} from '../cst.js'
import Chinese from '../models/Chinese.js'
import Boss from '../models/Boss.js'
import Corona from '../models/Bottle.js'


export class Stage3 extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.Stage3
        })
    }

    init(data) {
        this.infection_oldScene = data.infection_oldScene
        this.corona_old = data.corona_old
        this.toilet_old = data.toilet_old
        this.livesOld = data.livesOld
    }


    create() {
        this.song = this.sound.add('stage3', {
            volume: 0.5,
            loop: true
        });
        this.bossMusic = this.sound.add('boss', {
            volume: 0.5,
            loop: true
        })
        this.bossMusicFLAG =false;
        this.song.play();
        //Map Creation
        this.map = this.make.tilemap({
            key: "third"
        })

        /*
         *Adding of images to the tilesets created on Tiled
         */
        const house = this.map.addTilesetImage("houses", "houses")
        const umbrella = this.map.addTilesetImage("umbrella&policebox", "umbrella")
        const ground = this.map.addTilesetImage("road", "ground")
        const background = this.map.addTilesetImage("Sky", "sky")
        const hit = this.map.addTilesetImage("roda", "hit")
        /*###########################################*/
        /*
         *Creation of the layers of the map
         */
        this.hit = this.map.createStaticLayer("hit", hit)
        this.map.createStaticLayer("background", background)
        this.map.createStaticLayer("houses", house)
        this.map.createStaticLayer("umbrella", umbrella)
        this.ground = this.map.createStaticLayer("ground", ground)
        /*###########################################*/

        /*
         *Set the layers that have the collides on the Tiled
         */
        this.ground.setCollisionByProperty({
            "collides": true
        }, true)
        this.hit.setCollisionByProperty({
            "collides": true
        }, true)
        /*###########################################*/

        /*
         *Boss Creation
         */
        this.boss = new Boss(this, 3000, 250)

        /*
         *Creation of the main character
         */
        this.chinese = new Chinese(this, 100, 520)
        this.chinese.infection = this.infection_oldScene
        this.chinese.firstAmmo = this.corona_old
        this.chinese.secondAmmo = this.toilet_old
        //this.chinese.firstAmmo = 50 /****testing*****/
        //this.chinese.secondAmmo = 5 /****testing*****/
        this.chinese.lives = this.livesOld
        this.addText();
        this.animation()
        this.addCamara(this.chinese, this.map)
        /*###########################################*/



        /*
         *Collisions
         */
        this.physics.add.collider(this.chinese, this.hit)
        this.physics.add.collider(this.chinese, this.ground);
        this.physics.add.collider(this.boss, this.ground);
        this.physics.add.collider(this.chinese, this.boss);
        this.physics.add.collider(this.chinese.bottles, this.boss, this.bossHit, null, this);
        this.physics.add.collider(this.chinese.toilets, this.boss, this.bossHitSecundary, null, this)
        this.physics.add.collider(this.boss.covids, this.chinese, this.chineseHit, null, this)
        /*###########################################*/

        /*
         *Cursors
         */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.shiftBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        /*###########################################*/

    }

    update(time) {
        if (this.chinese.alive === true) {
            this.checkInput(time)

            if(Math.abs(this.boss.x - this.chinese.x) <= 500) {
                this.labelHP.setVisible(true)
                this.song.stop()
                if (this.bossMusicFLAG === false) {
                    this.bossMusic.play()
                    this.bossMusicFLAG = true
                }
            }
            //console.log("alive? -> " + this.boss.alive)
            if (this.boss.alive === true) {
                if (Math.abs(this.boss.x - this.chinese.x) <= 500 && Math.abs(this.boss.y - this.chinese.y) <= 50) {
                    this.boss.stopMovement(this.chinese.x);
                    //console.log("x -> " + this.boss.x)
                    this.boss.fire(time);
                } else {
                    this.boss.movement();
                }
            }

            if(this.boss.alive === false && this.cure === true) {
                this.scene.stop();
                this.sound.stopAll()
                this.scene.start(cst.SCENES.Victory)
            }
        }

        this.boss.anims.play('boss_idle', true)

    }

    bossHit(boss, bottles) {
        this.sound.play('glass')
        bottles.destroy()
        this.boss.hp -= 10
        this.labelHP.setText("Boss: " + this.boss.hp + " %")

        if (this.boss.hp <= 0) {
            this.boss.disableBody()
            this.boss.setVisible(false)
            this.boss.alive = false
            this.boss.setVelocity(0)
            this.labelHP.setText("Boss: " + 0 + " %")
            this.corona = new Corona (this, this.boss.x, this.boss.y)
            this.physics.add.collider(this.chinese, this.corona, this.pickCorona, null, this)

        }
    }

    bossHitSecundary(boss, bottles) {
        bottles.destroy()
        this.boss.hp -= 30
        this.labelHP.setText("Boss: " + this.boss.hp + " %")

        if (this.boss.hp <= 0) {
            this.boss.disableBody()
            this.boss.setVisible(false)
            this.boss.alive = false
            this.boss.setVelocity(0)
            this.labelHP.setText("Boss: " + 0 + " %")
            this.corona = new Corona (this, this.boss.x, this.boss.y)
            this.physics.add.collider(this.chinese, this.corona, this.pickCorona, null, this)

        }
    }

    pickCorona(chinese, corona) {
        this.cure = true
        corona.destroy()
        console.log("corona destroyed" + this.cure)
    }

    destroyBullet(bottle) {
        bottle.destroy(); //Bootle destroy
        this.sound.play('glass')
    }

    /*
     *Function to destroy the virus when hits a wall or the hero
     */
    destroyCovid(covid) {
        covid.destroy(); // Bottle destroy

    }

    /*
     *Function to destroy the toilet paper when hits a wall or the enemies
     */
    destroyToilet(toilet) {
        toilet.setVisible(false);
        toilet.destroy();
    }

    /*
     *Function for when the hero is hit by the enemy weapon
     */
    chineseHit(chinese, covids) {
        chinese.infection += 10
        if (chinese.infection >= 100) {
            this.killHero()
        }
        this.labelInfection.setText("Infection: " + this.chinese.infection + " %")
        covids.destroy();
    }

    killHero() {
        this.chinese.anims.play('die_anim', true)
        this.chinese.disableBody();
        this.chinese.setVelocity(0)
        this.chinese.lives -=1
        this.chinese.alive = false;
        

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.restartGame()
            },
            callbackScope: this,
            repeat: 0
        })

        this.boss.covids.clear(true, true)
    }


    restartGame(){
        if(this.chinese.lives <= 0){
            this.sound.stopAll()
            this.scene.stop()
            this.scene.start(cst.SCENES.Defeat)
        }

        this.boss.setX(3000)
        this.boss.setY(250)
        this.boss.enableBody()
        this.boss.hp = 250

        this.chinese.setX(100)
        this.chinese.setY(520)
        this.chinese.enableBody()
        this.chinese.infection = 0
        this.chinese.firstAmmo = this.corona_old
        this.chinese.secondAmmo = this.toilet_old
        this.chinese.alive = true
        this.labelInfection.setText("Infection: " + this.chinese.infection + " %")
        this.labelCorona.setText("Corona: " + this.chinese.firstAmmo)
        this.labelToiletPaper.setText("Paper: " + this.chinese.secondAmmo)
        this.labelLives.setText("Lives: " + this.chinese.lives)
        this.labelHP.setText("Boss: " + this.boss.hp + " %")
        this.labelHP.setVisible(false)
        
        
    }



    checkInput(time) {
        this.chinese.update(this.cursors);
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.chinese.fire(time);
        }
        if (Phaser.Input.Keyboard.JustDown(this.shiftBar)) {
            this.chinese.secondFire(time);
        }

        if (Phaser.Input.Keyboard.JustDown(this.mKey)) {
            this.sound.stopAll()
            this.scene.stop()
            this.scene.start(cst.SCENES.MENU)
        }


        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
           this.killHero()
        }
    }


    addText() {
        this.labelCorona = this.add.text(10, 40, "Corona: " + this.chinese.firstAmmo, {
            font: "18px Cooper",
            fill: "#ffffff"
        });
        this.labelToiletPaper = this.add.text(10, 60, "Paper: " + this.chinese.secondAmmo, {
            font: "18px Cooper",
            fill: "#ffffff"
        })

        this.labelInfection = this.add.text(10, 20, "Infection: " + this.chinese.infection + " %", {
            font: "18px Cooper",
            fill: "#ffffff"
        })
        this.labelLives = this.add.text(10, 0, "Lives: " + this.chinese.lives, {
            font: "18px Cooper",
            fill: "#ffffff"
        })

        this.labelHP = this.add.text(10, 80, "Boss: " + this.boss.hp + " %", {
            font: "18px Cooper",
            fill: "#ffffff"
        })
        
        this.labelHP.setVisible(false)
        this.labelHP.setScrollFactor(0)
        this.labelCorona.setScrollFactor(0);
        this.labelToiletPaper.setScrollFactor(0)
        this.labelInfection.setScrollFactor(0)
        this.labelLives.setScrollFactor(0)


    }


    animation() {
        /*
         *Main character Animations
         */
        this.anims.create({
            key: 'idle-right',
            frames: this.anims.generateFrameNumbers("chinese_idle"),
            frameRate: 10,
            repeat: -1 // repeat forever
        })
        this.anims.create({
            key: 'idle-left',
            frames: this.anims.generateFrameNumbers("chinese_idle"),
            frameRate: 10,
            repeat: -1 // repeat forever
        })
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers("walk"),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNumbers("jump"),
            frameRate: 10,
            repeat: 0
        })
        this.anims.create({
            key: 'corona_sprite',
            frames: this.anims.generateFrameNumbers("corona_sprite"),
            frameRate: 10,
            repeat: 0

        }) //TODO: Does not work

        this.anims.create({
            key: 'die_anim',
            frames: this.anims.generateFrameNumbers("die_sprite"),
            frameRate: 10,
            repeat: 0
        })
        /*###########################################*/


        /*
         *Enemy
         */
        this.anims.create({
            key: "boss_idle",
            frames: this.anims.generateFrameNumbers("boss_sprite"),
            frameRate: 5,
            repeat: -1
        })
        /*###########################################*/

    }



    addCamara(chinese, map) {
        const camara = this.cameras.main;
        camara.startFollow(this.chinese)
        camara.setBounds(0, 0, this.map.widthInPixels, 500)
    }


}
