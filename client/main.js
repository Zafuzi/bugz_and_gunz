import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Player, bullets} from "./components/player";
import {Shield} from "./components/shield";
import {keys_down_string, mouseMoveListener, rawY, rawX} from "./a_lib/input";

import './main.html';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 900;

let running_loop = null;

let game = {
    paused: new ReactiveVar(false),
    width: new ReactiveVar(GAME_WIDTH),
    height: new ReactiveVar(GAME_HEIGHT),
    fps: new ReactiveVar(0),
    times: [],
    keyString: new ReactiveVar(""),
    mx: new ReactiveVar(0),
    my: new ReactiveVar(0),
    canvas: null,
    scale: new ReactiveVar(1),
    ctx: null,
    bullets: new ReactiveVar(0),
    loop: function ()
    {
        const now = performance.now();
        while (game.times.length > 0 && game.times[0] <= now - 1000) {
            game.times.shift();
        }
        game.times.push(now);
        game.fps.set(game.times.length);

        // TODO verify this is right
        if(game.canvas)
        {
            let pos = game.canvas.getBoundingClientRect();
            game.mx.set(Math.floor((rawX - pos.left) / game.scale.get()));
            game.my.set(Math.floor((rawY - pos.top) / game.scale.get()));
        }

        game.tick();
        game.draw();

        running_loop = requestAnimationFrame(game.loop);
    },
    tick: function ()
    {
        if(!game.canvas) return;
        if(game.paused.get()) return;
        game.keyString.set(keys_down_string());
        Shield.tick(game);

        game.bullets.set(bullets.length);
        for(let i = 0;  i < bullets.length; i++)
        {
            let bullet = bullets[i];
            if(bullet.kill)
            {
               bullets.splice(i, 1);
            }
            else
            {
                bullet.tick(game);
            }
        }
        Player.tick(game);
    },
    draw: function ()
    {
        if(!game.canvas) return;
        if(game.paused.get()) return;
        game.ctx.clearRect(0, 0, game.width.get(), game.height.get());
        Shield.draw(game);

        game.ctx.strokeStyle = "red";
        for(let bullet of bullets)
        {
            bullet.draw(game);
        }
        Player.draw(game);
    },
    resizeCanvas: function()
    {
        if(!game.canvas) return;
        let canvasPadding = 0;
        let style = game.canvas.getAttribute('style') || '';
        game.scale.set(Math.min((window.innerWidth - canvasPadding) / game.canvas.width, (window.innerHeight - canvasPadding) / game.canvas.height));
        let translate = `translate3d(-50%, -50%, 0)`;
        game.canvas.setAttribute('style',
            style + `
			-ms-transform-origin: center center;
			-webkit-transform-origin: center center;
			-moz-transform-origin: center center;
			-o-transform-origin: center center;
			transform-origin: center center;
			-ms-transform: ${translate} scale(${game.scale.get()});
			-webkit-transform: ${translate} scale3d(${game.scale.get()}, 1);
			-moz-transform: ${translate} scale(${game.scale.get()});
			-o-transform: ${translate} scale(${game.scale.get()});
			transform: ${translate} scale(${game.scale.get()});
		`);
    }
}

document.addEventListener("DOMContentLoaded", function () {
});

window.addEventListener("resize", function () {
    game.resizeCanvas();
});

Template.gameCanvas.onCreated(function () {
});

Template.gameCanvas.onRendered(function () {
});

Template.gameCanvas.onRendered(function () {
    let canvas = document.querySelectorAll(".gameCanvas");

    if (canvas.length) {
        game.canvas = canvas[0];
        game.ctx = game.canvas.getContext("2d");
        game.canvas.width = GAME_WIDTH;
        game.canvas.height = GAME_HEIGHT;
    }
    else
    {
        return;
    }

    game.canvas.addEventListener("mousemove", mouseMoveListener);
    game.resizeCanvas();
    if (module.hot) {
        module.hot.dispose(function()
        {
            cancelAnimationFrame(running_loop)
        });
    }
    running_loop = requestAnimationFrame(game.loop);
});

Template.gameCanvas.helpers(
{
    width: function () {
        return game.width.get();
    },
    height: function () {
        return game.height.get();
    },
    paused: function () {
        return game.paused.get();
    },
    fps: function () {
        return game.fps.get();
    },
    keys: function () {
        return game.keyString.get();
    },
    mouse: function () {
        return `${game.mx.get()}, ${game.my.get()}`;
    },
    bullets: function()
    {
        return game.bullets.get();
    }
});

Template.gameCanvas.events({});