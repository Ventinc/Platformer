import Entity, {Trait} from './Entity.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { loadSpriteSheet } from './loaders.js';
import {createAnim} from './anim.js'

export function createMario() {
    return loadSpriteSheet('mario')
            .then(sprite => { 
                const mario = new Entity();
                mario.size.set(14, 16);

                mario.addTrait(new Jump());
                mario.addTrait(new Go());

                const runAnim = createAnim(['run-1', 'run-2', 'run-3'], 10)

                function routeFrame(mario) {
                    if (mario.go.direction !== 0) {
                        return runAnim(mario.go.distance);
                    }
                    return 'idle'
                }

                mario.draw = function drawMario(context) {
                    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
                }

                return mario;
            });
}