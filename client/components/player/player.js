import {areKeysDown} from "../../a_lib/input";

export const Player = {
    x: 10, y: 10,
    w: 100, h: 100,
    xdir: 1,
    ydir: 1,
    tick: function (game) {
        let self = this;
        if (!self.alive) return;

        if(areKeysDown(["d", "l", "arrowright"]))
        {
            self.x += 5;
        }

        if(areKeysDown(["a", "h", "arrowleft"]))
        {
            self.x -= 5;
        }

        if(areKeysDown(["w", "k", "arrowup"]))
        {
            self.y -= 5;
        }

        if(areKeysDown(["s", "j", "arrowdown"]))
        {
            self.y += 5;
        }

        /*
        self.x += self.xdir * 5;
        self.y += self.ydir * 5;
         */

        if (self.x >= game.width.get() - self.w || self.x <= 0) {
            self.xdir *= -1;
        }

        if (self.y >= game.height.get() - self.h || self.y <= 0) {
            self.ydir *= -1;
        }
    },
    draw: function (game) {
        let self = this;
        if (!self.alive) return;
        game.ctx.fillStyle = "#faa";
        game.ctx.fillRect(self.x, self.y, self.w, self.h);
    },
    alive: true
}