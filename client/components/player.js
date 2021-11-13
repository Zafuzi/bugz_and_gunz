import {areKeysDown} from "../a_lib/input";

export const Player = {
    x: 10, y: 10,
    w: 100, h: 100,
    xdir: 1,
    ydir: 1,
    tick: function (game) {
        let self = this;
        if (!self.alive) return;

        self.input(game);
    },
    draw: function (game) {
        let self = this;
        if (!self.alive) return;
        game.ctx.fillStyle = "#faa";
        game.ctx.fillRect(self.x, self.y, self.w, self.h);
    },
    alive: true,
    input: function(game)
    {
        let self = this;
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

        if (self.x > 400 - self.w) {
            self.x  = 400 - self.w;
        }

        if(self.x < 0)
        {
            self.x = 0;
        }

        if (self.y > game.height.get() - self.h) {
            self.y  = game.height.get() - self.h;
        }

        if(self.y < 0)
        {
            self.y = 0;
        }

    }
}
