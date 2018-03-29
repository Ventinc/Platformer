import Timer from './Timer.js';
import Compositor from './Compositor.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './assets.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';

import Keyboard from './KeyboardState.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel("1-1")
])
.then(([
    mario,
    backgroundSprites,
    level
]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 2000;
    mario.pos.set(64, 180);
    
    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        console.log(keyState);
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    })
    input.listenTo(window);


    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    const timer = new Timer();

    timer.update = function update(time) {
        mario.update(time);
        comp.draw(context);
        mario.vel.y += gravity * time;
    }

    timer.start();
})
