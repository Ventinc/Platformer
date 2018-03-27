import Spritesheet from './Spritesheet.js';
import {loadImage} from './loaders.js';

export function loadBackgroundSprites() {
    return loadImage('assets/spritesheet/ground.png')
        .then(image => {
            const sprites = new Spritesheet(image, 16, 16);
            sprites.defineTile('ground', 0, 0);
            sprites.defineTile('sky', 3, 23);
            return sprites;
        });
}

export function loadMarioSprite() {
    return loadImage('assets/tileset/characters.gif')
    .then(image => {
        const sprites = new Spritesheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}