export default class Toilet extends Phaser.Physics.Arcade.Image{
    constructor(scene,x ,y){
        super(scene,x,y, "toilet_paper")

        this.scale = 2


        scene.add.existing(this);
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)
        
        
    }

    fire(x,y , vx, vy){
        this.scale = 0.9
        this.setActive(true)
        this.setVisible(true)
        this.setPosition(x, y)
        this.setVelocity(vx)
        this.setVelocityY(vy)
        
    }
}