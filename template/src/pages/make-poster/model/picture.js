export default class Picture {
    constructor(data) {
        this.index = data.index;
        this.width = 100;
        this.height = 100;
        this.left = 100;
        this.top = 100;
        this.zIndex = 0;
        this.proportion = {
            w: 1,
            h: 1
        };
        this.borderRadius = 0;
        if (data) {
            Object.assign(this, data);
        }
    }
}
