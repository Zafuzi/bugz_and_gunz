import {areKeysDown} from "../a_lib/input";

export var bullets = [];

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
        game.ctx.strokeStyle = "rgba(40, 80, 120, 0.3)";
        game.ctx.lineWidth = 10;

        game.ctx.beginPath();
        game.ctx.moveTo(self.x, self.y);
        game.ctx.lineTo(self.x + self.w, self.y);
        game.ctx.lineTo(self.x + self.w, self.y + self.h);
        // line to cursor
        //game.ctx.lineTo(self.x + self.w, self.y + self.h/2);
        //game.ctx.lineTo(game.mx.get() + 4, game.my.get() + 4);
        //game.ctx.lineTo(self.x + self.w, self.y + self.h/2);
        game.ctx.lineTo(self.x + self.w, self.y + self.h);
        game.ctx.lineTo(self.x, self.y + self.h);
        game.ctx.lineTo(self.x, self.y);
        game.ctx.closePath();

        game.ctx.stroke();
        game.ctx.fill();
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

        if(areKeysDown(["space", "mousedown"]) && bulletSpawnTimer === 0)
        {
            SpawnBullet(self.x + self.w + 4, self.y + self.h / 2, game.mx.get(), game.my.get());
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

        if(bulletSpawnTimer > 0)
        {
            bulletSpawnTimer--;
        }
    }
}

let bulletSpawnTimer = 0;
export const SpawnBullet = function(x, y, destX, destY)
{
    bullets.push({
        x: x || 0, y: y || 0,
        w: 25, h: 10,
        destX: destX || 0, destY: destY || 0,
        speed: 50,
        tick: function(game)
        {
            if(this.x + this.w > game.width.get())
            {
                this.kill = true;
            }

            this.x += this.speed;
        },
        draw: function(game)
        {
            game.ctx.lineWidth = this.h;
            game.ctx.beginPath();
            game.ctx.moveTo(this.x, this.y);
            game.ctx.lineTo(this.x + this.w, this.y);
            game.ctx.stroke();
            game.ctx.closePath();
        }
    });
    bulletSpawnTimer = 10;
}
