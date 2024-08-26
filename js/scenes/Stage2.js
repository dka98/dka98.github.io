import {
    cst
} from '../cst.js'
import Chinese from '../models/Chinese.js'
import Enemy from '../models/Enemy.js'
import Toilet from '../models/Toilet.js'
import Corona from '../models/Bottle.js'


export class Stage2 extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.Stage2
        })
    }

    init(data) {
        this.infection_oldScene = data.infection_oldScene
        this.corona_old = data.corona_old
        this.toilet_old = data.toilet_old
        this.livesOld = data.livesOld
    }


    create() {
        this.song = this.sound.add('stage2', {
            volume: 0.5,
            loop: true
          });
          this.song.play();
        //Map Creation
        this.map = this.make.tilemap({
            key: "second"
        })

        /* 
         * Adding of images to the tilesets created on Tiled
        */
        const background = this.map.addTilesetImage("back", "background_2")
        const sky = this.map.addTilesetImage("sky_map2", "sky_map2")
        const tiles = this.map.addTilesetImage("tiles", "tiles")
            /*###########################################*/

        /*
         *Creation of the layers of the map
         */
        this.map.createStaticLayer("sky", sky)
        this.map.createStaticLayer("background", background)
        this.road = this.map.createStaticLayer("boxes", tiles)
        this.danger = this.map.createStaticLayer("danger", tiles)
            /*###########################################*/

        /*
         *Set the layers that have the collides on the Tiled
         */
        this.road.setCollisionByProperty({
            "collides": true
        }, true)
        this.danger.setCollisionByProperty({
                "collides": true
            }, true)
            /*###########################################*/


        /*
         *Creation of the main character
        */
        this.chinese = new Chinese(this, 100, 0)
        this.chinese.infection = this.infection_oldScene
        this.chinese.firstAmmo = this.corona_old
        this.chinese.secondAmmo = this.toilet_old
        this.chinese.lives = this.livesOld
        this.addText();
        this.animation()
        this.addCamara(this.chinese, this.map)
        /*###########################################*/

        /*
        *Toilet
        */
        this.secondaryWeaponGroup = this.add.group()
        this.secondaryWeapons = this.map.filterObjects('objects', (object) => object.type === 'toilet')
        this.createToilet()
        /*###########################################*/

         /*
         *Corona
         */
        this.primaryWeaponGroup = this.add.group()
        this.primaryWeapons = this.map.filterObjects('objects', (object) => object.type === 'corona')
        this.createCorona()

        /*
         *Enemy
         */
        this.enemiesGroup = this.add.group()
        this.enemies = this.map.filterObjects('objects', (object) => object.type === 'enemy')
        console.log(this.enemies)
        this.createEnemies()
            /*###########################################*/


        /*
         *Collisions
         */
        this.physics.add.collider(this.chinese, this.enemiesGroup);
        this.physics.add.collider(this.enemiesGroup, this.road)
        this.physics.add.collider(this.chinese, this.road);
        this.physics.add.collider(this.chinese, this.danger, this.killHero, null, this)
        this.physics.add.collider(this.chinese.bottles, this.road, this.destroyBullet, null, this)
        this.physics.add.collider(this.chinese.toilets, this.road, this.destroyToilet, null, this)
        this.physics.add.collider(this.chinese.bottles, this.enemiesGroup, this.enemyHit, null, this)
        this.physics.add.collider(this.chinese.toilets, this.enemiesGroup, this.enemyHitSecondary, null, this)
        this.physics.add.collider(this.secondaryWeaponGroup, this.chinese, this.pickToilet, null, this)
        this.physics.add.collider(this.primaryWeaponGroup, this.chinese, this.pickCorona, null, this)
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
        if(this.chinese.alive === true) {
            this.checkInput(time)
            this.enemyMovements(time, this.chinese)
        }

        if (this.chinese.x >= this.map.widthInPixels) {
            this.song.stop()
            this.scene.stop()
            this.scene.start(cst.SCENES.Stage3Text, {
                chinese: this.chinese
            })
        }
    }

    /*
     *Function to pick the second weapon
     */
    pickToilet(toilet) {
        //toilet.setVisible(false)
        toilet.destroy()
        this.chinese.secondAmmo += 1;
        this.labelToiletPaper.setText("Paper:  " + this.chinese.secondAmmo)
        console.log(this.chinese.secondAmmo + "> Second Ammo")
    }

    /*
     *Function to create the secondary weapon on the map picking the x and y position of the tiled
     */
    createToilet() {
        this.secondaryWeapons.forEach((secondaryWeapon) => {
            this.secondaryWeapon = new Toilet(this, secondaryWeapon.x, secondaryWeapon.y)
            this.secondaryWeaponGroup.add(this.secondaryWeapon)
        })
    }

    /*
     *Function to destroy the bottle when hits a wall or enemy
     */
    destroyBullet(bottle) {
        bottle.destroy(); // Bottle destroy
        this.sound.play('glass') // Sound of broken glass
    }

    createCorona() {
        this.primaryWeapons.forEach((primaryWeapon) => {
            this.primaryWeapon = new Corona(this, primaryWeapon.x, primaryWeapon.y)
            this.primaryWeaponGroup.add(this.primaryWeapon)
        })
    }

      /*
     *Function to pick the primary Weapon
     */
    pickCorona(corona) {
        corona.destroy();
        this.chinese.firstAmmo += 10
        this.labelCorona.setText("Corona: " + this.chinese.firstAmmo)
        console.log(this.chinese.primaryWeapon + " > Primary Weapon picked")
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
     *Function to create the enemies picking the x and y position of the tiled
     */
    createEnemies() {
        this.enemies.forEach((enemy) => {
            this.enemy = new Enemy(this, enemy.x, enemy.y)
            this.enemiesGroup.add(this.enemy)
            this.physics.add.collider(this.enemy.covids, this.road, this.destroyCovid, null, this)
            this.physics.add.collider(this.enemy.covids, this.chinese, this.chineseHit, null, this)
            console.log("hey" + this.enemy.y)

        });
    }

    /*
     *Function for when the enemy is hit by the primary weapon
     */
    enemyHit(enemy, bottles) {
        this.sound.play('glass') // Sound of broken glass
        bottles.destroy();
        enemy.lives -= 1;
        if (enemy.lives == 0) {
            enemy.destroy()
        }
    }


    /*
     *Function for when the enemy is hit by the toilet Paper
     */
    enemyHitSecondary(enemy, toilets) {
        toilets.destroy()
        enemy.destroy()
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


    /*
     *Function for the enemies movements like waling and shooting
     */
    enemyMovements(time, chinese) {
        Phaser.Actions.Call(this.enemiesGroup.getChildren(), function(enemy) {
            if (Math.abs(enemy.x - this.chinese.x) <= 300 && Math.abs(enemy.y - this.chinese.y) <= 50) {
                enemy.stopMovement(chinese.x)
                enemy.fire(time)
            } else {
                enemy.movement()
            }
        }, this)
    }

    /*
     *Function for when the hero dies
     */
    killHero() {
        this.chinese.anims.play('die_anim', true)
        this.chinese.disableBody();
        this.chinese.setVelocity(0)
        this.chinese.lives -=1
        this.chinese.alive = false;
        this.enemiesGroup.clear(true, true) // to avoid they slide after the hero dies
        this.primaryWeaponGroup.clear(true, true)
        this.secondaryWeaponGroup.clear(true, true)

        this.timer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.restartGame()
            },
            callbackScope: this,
            repeat: 0
        })
    }


    restartGame(){
        if(this.chinese.lives <= 0){
            this.sound.stopAll()
            this.scene.stop()
            this.scene.start(cst.SCENES.Defeat)
        }
        this.chinese.setX(100)
        this.chinese.setY(0)
        this.chinese.enableBody()
        this.chinese.infection = 0
        this.chinese.firstAmmo = this.corona_old
        this.chinese.secondAmmo = this.toilet_old
        this.chinese.alive = true
        this.labelInfection.setText("Infection: " + this.chinese.infection + " %")
        this.labelCorona.setText("Corona: " + this.chinese.firstAmmo)
        this.labelToiletPaper.setText("Paper: " + this.chinese.secondAmmo)
        this.labelLives.setText("Lives: " + this.chinese.lives)
        this.createEnemies()
        this.createCorona()
        this.createToilet()
    }



    /*
     *Function to check the imputs from the player
     */
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


    /*
     *Camera that follows the hero
     */
    addCamara(chinese, map) {
        const camara = this.cameras.main;
        camara.startFollow(this.chinese)
        camara.setBounds(0, 0, this.map.widthInPixels, 500)
    }

    /*
     *Different labels for ammo, lives, infection level etc.
     */
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


        this.labelCorona.setScrollFactor(0);
        this.labelToiletPaper.setScrollFactor(0)
        this.labelInfection.setScrollFactor(0)
        this.labelLives.setScrollFactor(0)
    }






    /*
     *Animations created for the enemies and hero
     */
    animation() {
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
            key: 'die_anim',
            frames: this.anims.generateFrameNumbers("die_sprite"),
            frameRate: 10,
            repeat: 0
        })

        /*
         * Enemy
         */
        this.anims.create({
            key: 'en_left',
            frames: this.anims.generateFrameNumbers('enemy_idle', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'en_right',
            frames: this.anims.generateFrameNumbers('enemy_idle', {
                start: 8,
                end: 11
            }),
            frameRate: 10,
            repeat: 0
        });

    }


}
