import Bottle from './Bottle.js'
import Toilet from './Toilet.js'
export default class Chinese extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "chinese_idle")
        
        this.scene = scene;
        
        
        console.log("the difficulty is: " + scene.difficulty)
        switch (scene.difficulty){
            case "Easy":
                this.lives = 4
                break;
            case "Medium":
                this.lives = 3
                break;
            case "Hard":
                this.lives = 2;
                break;
            case "Master":
                this.lives = 1;
                break;
            default:
                this.lives = 4;
                break;
    }
        this.lives
        this.direction = "right"
        this.alive = true;
        this.firstAmmo = 50;
        this.secondAmmo = 0;
        this.infection = 0;

        this.bottles = this.scene.physics.add.group({
            classType: Bottle,
            key: 'bottles'
        });
        
        this.toilets = this.scene.physics.add.group({
            classType: Toilet,
            key: 'toilets'
        })
        
        scene.add.existing(this);
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)
        
        this.setGravityY(250)
        this.setFrame(0)
        this.scaleX = 0.07
        this.scaleY = 0.07
        this.timeToShoot = 0;
        this.fireRate = 500; //time for the bottle
        this.timeToShootSecond = 0;
        this.fireRateSecond = 900; //time for the bottle

        
    }


    fire(time) { 
        if(this.timeToShoot<time && this.firstAmmo > 0) {
			var bottle = this.bottles.get()
            this.timeToShoot = time + this.fireRate
            bottle.scale = 0.7
			if(this.direction === "right") {
				if(bottle){
					bottle.angle = 90
                    bottle.fire(this.x + 10, this.y + 5, 300, 0)
                    //this.anims.play('corona_sprite', true)
                    //console.log("fire")
                }          
			}else {
				if(bottle){
					bottle.angle = -90
                    bottle.fire(this.x - 10, this.y + 5, -300, 0)
                    //his.anims.play('corona_sprite', true)
				}
            }
            this.scene.sound.play('pew')
            this.firstAmmo -= 1;
            this.scene.labelCorona.setText("Corona: " + this.firstAmmo)
            console.log(this.firstAmmo + "> first ammo -1")
			
		}    
    }

    secondFire(time) {
        if(this.timeToShootSecond < time && this.secondAmmo > 0){
            var toilet = this.toilets.get()
            this.timeToShootSecond = time + this.fireRateSecond
            if(this.direction === 'right' ){
                if(toilet){
                    toilet.angle = 90
                    toilet.fire(this.x + 10, this.y + 5, 400, 0)
                }
            }else{
                if(toilet){
                    toilet.angle = -90
                    toilet.fire(this.x - 10, this.y + 5, -400, 0)
                }
            }
            this.scene.sound.play('pew')
            this.secondAmmo -= 1;
            this.scene.labelToiletPaper.setText("Paper: " + this.secondAmmo)
            console.log(this.secondAmmo + "> second ammo -1")

        }
    }

  




    update(cursors) {
        if (cursors.right.isDown) {
            this.setFlipX(false);
            this.direction = "right"
            this.setVelocityX(150);
            this.anims.play('walk', true)
        }else if (cursors.left.isDown) {
            this.direction = "left"
            this.setFlipX(true);  // need a fix
            this.setVelocityX(-150);
            this.anims.play('walk', true);
        } else {
            this.setVelocityX(0);
            this.anims.play("idle-right", true);
        }
        if (cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-250);
            this.anims.play("jump-right", true);
        }
        if (cursors.down.isDown && this.body.blocked.down) {
            this.scale = 0.05
        }

    }
}