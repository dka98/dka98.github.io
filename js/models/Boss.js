import Covid from './CovidShoot.js'

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "boss_sprite")


        this.scene = scene;
        this.direction = "left"
        this.hp = 250
        this.alive = true


        this.covids = this.scene.physics.add.group({
            classType: Covid,
            key: 'covids'
        });

        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)
        
        this.minDistance = x - 50
        this.maxDistance = x + 50
        this.timeToShoot = 0;

        this.setGravityY(250)
        this.setScale(0.3,0.3)
        this.setFrame(0)

        const velocity = [40, 45, 50, 55, 60]
        this.velocity = velocity[Math.floor(Math.random() * velocity.length)]
        const fireRate = [700, 600, 500]
        this.fireRate = fireRate[Math.floor(Math.random() * fireRate.length)]
        

    }


    movement() {
        switch (this.direction){
            case "left":
                if(this.x > this.minDistance){
                    this.setVelocityX(-this.velocity)
                    this.anims.play("boss_idle", true)
                }else{
                    this.direction = "right"
                }
                break;
            case "right":
                if(this.x < this.maxDistance){
                    this.setVelocityX(this.velocity)
                    this.anims.play("boss_idle", true)
                }else{
                    this.direction = "left"
                }
                break;
        }
    }

    stopMovement(x) {
        this.setVelocityX(0);
        if (this.x > x) {
            this.direction = "left";
        } else {
            this.direction = "right";
        }
        this.anims.play("boss_idle", true)

    }

    fire(time) {
        const highCovid = [-10,-5,0, 5, 10, 15]
        this.highCovid = highCovid[Math.floor(Math.random() * highCovid.length)]
        if(this.timeToShoot<time) {
			var covid = this.covids.get()
            this.timeToShoot = time + this.fireRate
			if(this.direction === "right") {
				if(covid){
					covid.fire(this.x + 10, this.y + this.highCovid, 200, 0)
                }          
			}else {
				if(covid){
                    covid.fire(this.x - 10, this.y +  this.highCovid, -200, 0)
				}
            }
			
		}    
    }



}