export default class Bottle extends Phaser.Physics.Arcade.Image{
    constructor(scene,x ,y){
        super(scene,x,y, "corona_shoot")
        
        
        //this.scale = 1
        

        scene.add.existing(this);
        scene.physics.add.existing(this)
        scene.physics.world.enable(this)
    }

    fire(x,y , vx, vy){
        this.setActive(true)
        this.setVisible(true)
        this.setPosition(x, y)
        this.setVelocity(vx)
        this.setVelocityY(vy)
        
    }
}