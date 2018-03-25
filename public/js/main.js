import Spritesheet from './Spritesheet.js'
import {loadImage} from './loaders.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext("2d");

context.fillRect(0, 0, 100, 100);

loadImage('assets/spritesheet/ground.png').then(image => {
    const sprites = new Spritesheet(image, 128, 128);
    sprites.define('ground', 0, 1);
    sprites.draw('ground', context, 45, 62);

})