import {Vec2} from './Math.js';
import BoundingBox from './BoundingBox.js'

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};
export class Trait {
    constructor(name) {
        this.NAME = name;
        this.tasks = new Array();
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task) {
        this.tasks.push(task);
    }

    update() {
    }

    obstruct() {
    }
    
    collides(us, them) {
    }
}

export default class Entity {
    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset);
        this.lifetime = 0;

        this.traits = new Array();
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    collides(candidate) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        })   
    }

    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        })
    }

    obstruct(...args) {
        this.traits.forEach(trait => {
            trait.obstruct(this, ...args);
        })   
    }

    draw() {
        
    }

    update(deltaTime, level) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        })

        this.lifetime += deltaTime;
    }
}
