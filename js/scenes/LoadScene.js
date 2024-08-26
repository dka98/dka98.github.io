import {
    cst
} from '../cst.js'

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: cst.SCENES.LOAD
        });
    }

    init() {

    }

    preload() {
        /*
         *Load image
         */
        this.load.tilemapTiledJSON("first", "./maps/first/1stmap.json");
        this.load.tilemapTiledJSON("first_part2", "./maps/first/1st_2.json")
        this.load.tilemapTiledJSON("second", "./maps/second/2ndmap.json")
        this.load.tilemapTiledJSON("third", "./maps/third/3rdmap.json")
        this.load.image("title_bg", "./assets/covid2.jpg");
        this.load.image("play", "./assets/play_button.png");
        this.load.image("options", "./assets/options_button.png");
        this.load.image("corona", "./assets/corona.png")
        this.load.image("corona_shoot", "./assets/corona_shoot2.png")
        this.load.image("covid_shoot", "assets/covid_shoot.png")
        this.load.image("toilet_paper", "assets/toilet_paper.png")

        //Intros
        this.load.image("first_intro", "./assets/first_intro.jpg");
        this.load.image("second_intro", "./assets/second_intro.jpg");

        //Stages
        this.load.image("stage_1", "./assets/stage_1.jpg");
        this.load.image("stage1_part2", "./assets/stage1_part2.png");
        this.load.image("stage_2", "./assets/stage_2.jpg")
        this.load.image("stage_3", "./assets/stage_3.jpg")
        this.load.image("victory", "./assets/victory.png")
        this.load.image("defeat", "./assets/gameover.png")

        //options
        this.load.image("options_bg", "./assets/options.jpg")
        this.load.image("easy", "./assets/options/easy.png")
        this.load.image("medium", "./assets/options/medium.png")
        this.load.image("hard", "./assets/options/hard.png")
        this.load.image("master", "./assets/options/master.png")
        this.load.image("back", "./assets/options/back.png")


        /*
         *Load audio
         */
        this.load.audio("glass", "./assets/sounds/glass.ogg")
        this.load.audio("pew", "./assets/sounds/pew.wav")
        this.load.audio("intro", "./assets/sounds/intro.mp3")
        this.load.audio("stage1", "./assets/sounds/stage1.ogg")
        this.load.audio("stage1_part2", "./assets/sounds/stage1_part2.ogg")
        this.load.audio("stage2", "./assets/sounds/stage2.mp3")
        this.load.audio("stage3", "./assets/sounds/stage3.mp3")
        this.load.audio("boss", "./assets/sounds/boss.wav")
        this.load.audio("click", "./assets/sounds/click.mp3")

        /*
         *First stage images
         */
        this.load.image("background_map1", "./assets/map_1/Background_map1.png")
        this.load.image("map1", "./assets/map_1/map1.png")
        this.load.image("road_sewer", "./assets/map_1/road_sewer.png")
        this.load.image("wall1", "./assets/map_1/wall1.png")
        this.load.image("wall2", "./assets/map_1/wall2.png")
        this.load.image("water", "./assets/map_1/water.png")

        /*
         *Second stage images
         */
        this.load.image("background_2", "./assets/map_2/back.png")
        this.load.image("tiles", "./assets/map_2/tileset_map2.png")
        this.load.image("sky_map2", "./assets/map_2/sky_map2.png")
        /*###########################################*/

        /*
         *third stage images
         */
        this.load.image("sky", "./assets/map_3/sky.png");
        this.load.image("ground", "./assets/map_3/road.png")
        this.load.image("houses", "./assets/map_3/houses.png")
        this.load.image("umbrella", "./assets/map_3/umbrella&policebox.png")
        /*###########################################*/

        /*
         *Chinese
         */
        this.load.spritesheet("chinese_idle", "./assets/chinese/chinese_idle.png", {
            frameHeight: 1292,
            frameWidth: 587,
            spacing: 1
        })
        this.load.spritesheet("walk", "./assets/chinese/walk.png", {
            frameHeight: 1307,
            frameWidth: 687,
            spacing: 1
        })
        this.load.spritesheet("jump", "./assets/chinese/jump.png", {
            frameHeight: 1897,
            frameWidth: 712,
            spacing: 1
        })
        this.load.spritesheet("corona_sprite", "./assets/chinese/shoot.png", {
            frameHeight: 1897,
            frameWidth: 712,
            spacing: 1
        })

        this.load.spritesheet("die_sprite", "./assets/chinese/die.png", {
            frameHeight: 1360,
            frameWidth: 1218,
            spacing: 1
        })
        /*###########################################*/


        /*
         *Enemy
         */
        this.load.spritesheet("enemy_idle", "./assets/enemy/enemy1.png", {
            frameHeight: 120,
            frameWidth: 80,
            spacing: 0
        })

        this.load.spritesheet("bat_idle", "./assets/enemy/bats.png", {
            frameHeight: 48,
            frameWidth: 32,
            spacing: 1
        })
        /*###########################################*/

        this.load.spritesheet("boss_sprite", "assets/enemy/covid-spritesheet.png",{
            frameHeight: 452,
            frameWidth: 452,
            spacing: 0
        })




        /*
         *Loading bar
         */
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff // white
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            //console.log('done')
        })

    }
    create() {
        //this.scene.add(cst.SCENES.MENU, MenuScene, false)
        this.scene.start(cst.SCENES.MENU, "hello from load scene");

    }
}