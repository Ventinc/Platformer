import Entity, {Trait} from './Entity.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import {loadMarioSprite} from './assets.js';

export function createMario() {
    return loadMarioSprite()
            .then(sprite => { 
                const mario = new Entity();
                mario.size.set(14, 16);

                mario.addTrait(new Jump());
                mario.addTrait(new Go());

                mario.draw = function drawMario(context) {
                    sprite.draw('idle', context, 0, 0);
                }

                return mario;
            });
}