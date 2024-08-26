export default class Bat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "bat_idle")

        scene.add.existing(this)
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)

   
        this.setFrame(3)
        this.scaleX = 2
        this.scaleY = 2

        const velocity = [100, 90, 150, 200, 140,130,120]
        this.velocity = velocity[Math.floor(Math.random() * velocity.length)]

    }

 

    movement() {
        this.setVelocityX(-this.velocity)
        this.anims.play("bt_idle", true)
    }

}