import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

const GAME_WIDTH = 1600;
const GAME_HEIGHT = 1200;

Template.gameCanvas.onCreated(function()
{
	this.paused = new ReactiveVar(true);
	this.width = new ReactiveVar(GAME_WIDTH);
	this.height = new ReactiveVar(GAME_HEIGHT);
	this.fps = new ReactiveVar(0);
});

Template.gameCanvas.onRendered(function()
{
	let self = this;
	let canvas = document.querySelectorAll(".gameCanvas");
	if (canvas.length)
	{
		canvas = canvas[0];
	}

	self.canvas = canvas;
	self.ctx = self.canvas.getContext("2d");

	canvas.width = GAME_WIDTH;
	canvas.height = GAME_HEIGHT;

	self.resizeCanvas = function()
	{
		let canvasPadding = 0;
		let style = canvas.getAttribute('style') || '';
		let scale = Math.min((window.innerWidth - canvasPadding)/canvas.width,(window.innerHeight-canvasPadding)/canvas.height);
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

	window.addEventListener("resize", function()
	{
		self.resizeCanvas();
	});

	self.resizeCanvas();

	self.times = [];

	self.loop = function()
	{
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

	let x = 0;
	let y = 0;
	let xdir = 1;
	let ydir = 1;
	self.tick = function()
	{
		x += xdir * 5;
		y += ydir * 5;

		if(x < 0 || x >= self.width.get() - 100)
		{
			xdir *= -1;
		}
		if(y < 0 || y >= self.height.get() - 100)
		{
			ydir *= -1;
		}
	}

	self.ctx.fillStyle = "#faa";
	self.draw = function()
	{
		self.ctx.clearRect(0, 0, self.width.get(), self.height.get());
		self.ctx.fillRect(x, y, 100, 100);
	}

	window.requestAnimationFrame(self.loop);
});

Template.gameCanvas.helpers(
	{
		width: function()
		{
			return Template.instance().width.get();
		},
		height: function()
		{
			return Template.instance().height.get();
		},
		paused: function()
		{
			return Template.instance().paused.get();
		},
		fps: function()
		{
			return Template.instance().fps.get();
		}
	});

Template.gameCanvas.events({

});