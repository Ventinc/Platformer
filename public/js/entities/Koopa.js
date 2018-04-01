import Entity, {Sides} from '../Entity.js'
import PendulumWalk from '../traits/PendulumWalk.js'
import {loadSpriteSheet} from '../loaders.js'

export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

function createKoopaFactory(sprite) {

    const walkAnim = sprite.animations.get('walk');
    function drawGooma(context) {
        sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.vel.x = -30;

        koopa.addTrait(new PendulumWalk());

        koopa.draw = drawGooma;

        return koopa;
    }
}