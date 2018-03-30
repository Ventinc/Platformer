import Compositor from './Compositor.js';
import {Matrix} from './Math.js'
export default class Level {
    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
    }

    update(deltaTime) {
        this.entities.forEach(entity => entity.update(deltaTime));
    }
}