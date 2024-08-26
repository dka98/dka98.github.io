/*import bootGame from './scene/BootGame.js';
import playGame from './scene/PlayGame.js';

var game;
window.onload = function() {
    var gameConfig = {
        width: 480,
        height: 640,        
        backgroundColor: 0x000000,
        scene: [bootGame, playGame],
        physics: {
            default: "arcade",
            arcade: {
              debug: true
            }
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);
}

function resizeGame(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}*/

import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {Options} from "./scenes/Options.js";
import {FirstIntro} from "./scenes/FirstIntro.js";
import {SecondIntro} from "./scenes/SecondIntro.js";
import {Stage1text} from "./scenes/Stage1text.js";
import {Stage1} from "./scenes/Stage1.js";
import {Stage1_part2Text} from "./scenes/Stage1_part2Text.js";
import {Stage1_part2} from "./scenes/Stage1_part2.js";
import {Stage2Text} from "./scenes/Stage2Text.js";
import {Stage2} from "./scenes/Stage2.js";
import {Stage3Text} from "./scenes/Stage3Text.js";
import {Stage3} from "./scenes/Stage3.js";
import {Defeat} from "./scenes/Defeat.js";
import {Victory} from "./scenes/Victory.js";

let game = new Phaser.Game({
    width: 1150,
    height: 650,
    physics: {
        default: "arcade",
        arcade: {
        debug: false
        }
   },
    scene:[
        //LoadScene //for dynamic
        LoadScene, MenuScene, Options , FirstIntro, SecondIntro, Stage1text, Stage1, Stage1_part2Text,Stage1_part2, Stage2Text ,Stage2, Stage3Text, Stage3, Defeat, Victory
    ],
})
