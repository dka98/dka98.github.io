import Covid from './CovidShoot.js'
export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x , y) {
        super(scene,x,y, "enemy_idle");

        this.scene = scene;

        this.covids = this.scene.physics.add.group({
            classType: Covid,
            key: 'covids'
        });

        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)

        this.lives = 3
        this.minDistance = x - 50
        this.maxDistance = x + 50
        this.timeToShoot = 0;
        this.setGravityY(250)
        this.setFrame(3)
        //this.scaleX = 2.8
        //this.scaleY = 2.8
        const velocity = [40, 45, 50, 55, 60]
        this.velocity = velocity[Math.floor(Math.random() * velocity.length)]
        const directions = ["left", "right"]
        this.direction = directions[Math.floor(Math.random() * directions.length)]
        const fireRate = [700, 800, 900]
        this.fireRate = fireRate[Math.floor(Math.random() * fireRate.length)]
    }

    movement() {
        switch (this.direction){
            case "left":
                if(this.x > this.minDistance){
                    this.setVelocityX(-this.velocity)
                    this.anims.play("en_left", true)
                }else{
                    this.direction = "right"
                }
                break;
            case "right":
                if(this.x < this.maxDistance){
                    this.setVelocityX(this.velocity)
                    this.anims.play("en_right", true)
                }else{
                    this.direction = "left"
                }
                break;
        }
    }

    stopMovement(x){
        this.setVelocity(0)
        if(this.x > x){
            this.anims.play("en_left", true)
            this.direction = "left"
        }else{
            this.direction = "right"
            this.anims.play("en_right", true)

        }
    }

    fire(time) {
        if(this.timeToShoot<time) {
			var covid = this.covids.get()
            this.timeToShoot = time + this.fireRate
			if(this.direction === "right") {
				if(covid){
					covid.fire(this.x + 10, this.y +15, 200, 0)
                }          
			}else {
				if(covid){
                    covid.fire(this.x - 10, this.y + 15, -200, 0)
				}
            }
			
		}    
    }

   
}