export class Advertorial {
    constructor(data) {
        this.width = 100;
        this.height = 100;
        this.left = 100;
        this.top = 100;
        this.zIndex = 0;
        this.opacity = 0;
        if (data) {
            Object.assign(this, data);
        }
    }
};
