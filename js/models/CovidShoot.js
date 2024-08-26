export default class CovidShoot extends Phaser.Physics.Arcade.Image{
    constructor(scene,x ,y){
        super(scene,0,0, "covid_shoot")
        this.scaleX = 1.5
        this.scaleY = 1.5
        
    }

    fire(x,y , vx, vy){
        this.setActive(true)
        this.setVisible(true)
        this.setPosition(x, y)
        this.setVelocity(vx)
        this.setVelocityY(vy)
    }
}