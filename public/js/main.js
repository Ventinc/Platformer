import Timer from './Timer.js';
import {createCollisionLayer} from './layers.js';
import {loadLevel} from './loaders.js';
import {createMario} from './entities.js';

import Keyboard from './KeyboardState.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext("2d");

Promise.all([
    createMario(),
    loadLevel("1-1")
])
.then(([
    mario,
    level
]) => {

    const gravity = 2000;
    mario.pos.set(64, 180);
    
    level.entities.add(mario);
    
    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.addMapping(39, keyState => {
        mario.go.direction = keyState
    })
    input.addMapping(37, keyState => {
        mario.go.direction = -keyState
    })
    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                mario.vel.set(0, 0);
                mario.pos.set(event.offsetX, event.offsetY);
            }
        })
    });

    const timer = new Timer();
    timer.update = function update(time) {
        level.update(time);
        level.comp.draw(context);
        mario.vel.y += gravity * time;
    }

    timer.start();
})
