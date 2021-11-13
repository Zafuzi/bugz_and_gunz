function squid(x, y, w, h) {
    return {
        x: x, y: y,
        w: w, h: h,
        alive: false,
        tick: function () {
            let self = this;
            if (!self.alive) {
                return false;
            }
        },
        draw: function () {
            let self = this;
            if (!self.alive) {
                return false;
            }
        }
    }
}
