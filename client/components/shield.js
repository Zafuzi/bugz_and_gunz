export const Shield = {
    x: 400, y: 0,
    w: 100, h: window.innerHeight,
    alive: true,
    tick: function(game)
    {
        if(!game) return;
        this.h = game.height.get();
    },
    draw: function(game)
    {
        let self = this;
        if(!game) return;
        game.ctx.fillStyle = "rgba(33, 80, 150, 0.5)";
        game.ctx.fillRect(self.x, self.y, self.w, self.h);
    }
}
