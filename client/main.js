import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';
import {Player} from "./components/player/player";
import {keys_down_string} from "./a_lib/input";

import './main.html';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 1200;

Template.gameCanvas.onCreated(function () {
    let self = this;
    self.paused = new ReactiveVar(true);
    self.width = new ReactiveVar(GAME_WIDTH);
    self.height = new ReactiveVar(GAME_HEIGHT);
    self.fps = new ReactiveVar(0);
    self.keyString = new ReactiveVar("");
});

Template.gameCanvas.onRendered(function () {
    let self = this;
    let canvas = document.querySelectorAll(".gameCanvas");
    if (canvas.length) {
        canvas = canvas[0];
    }

    self.canvas = canvas;
    self.ctx = self.canvas.getContext("2d");

    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    self.resizeCanvas = function () {
        let canvasPadding = 0;
        let style = canvas.getAttribute('style') || '';
        let scale = Math.min((window.innerWidth - canvasPadding) / canvas.width, (window.innerHeight - canvasPadding) / canvas.height);
        let translate = `translate3d(-50%, -50%, 0)`;
        canvas.setAttribute('style',
            style + `
			-ms-transform-origin: center center;
			-webkit-transform-origin: center center;
			-moz-transform-origin: center center;
			-o-transform-origin: center center;
			transform-origin: center center;
			-ms-transform: ${translate} scale(${scale});
			-webkit-transform: ${translate} scale3d(${scale}, 1);
			-moz-transform: ${translate} scale(${scale});
			-o-transform: ${translate} scale(${scale});
			transform: ${translate} scale(${scale});
		`);
    };

    window.addEventListener("resize", function () {
        self.resizeCanvas();
    });

    self.resizeCanvas();

    self.times = [];

    self.loop = function () {
        const now = performance.now();
        while (self.times.length > 0 && self.times[0] <= now - 1000) {
            self.times.shift();
        }
        self.times.push(now);
        self.fps.set(self.times.length);

        self.tick();
        self.draw();

        window.requestAnimationFrame(self.loop);
    }

    self.tick = function () {
        self.keyString.set(keys_down_string());
        Player.tick(self);
    }

    self.draw = function () {
        self.ctx.clearRect(0, 0, self.width.get(), self.height.get());
        Player.draw(self);
    }

    window.requestAnimationFrame(self.loop);
});

Template.gameCanvas.helpers(
    {
        width: function () {
            return Template.instance().width.get();
        },
        height: function () {
            return Template.instance().height.get();
        },
        paused: function () {
            return Template.instance().paused.get();
        },
        fps: function () {
            return Template.instance().fps.get();
        },
        keys: function()
        {
            return Template.instance().keyString.get();
        }
    });

Template.gameCanvas.events({});