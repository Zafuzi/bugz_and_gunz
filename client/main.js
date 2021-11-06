import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './main.html';

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

Template.gameCanvas.onCreated(function()
{
	this.paused = new ReactiveVar(true);
	this.width = new ReactiveVar(GAME_WIDTH);
	this.height = new ReactiveVar(GAME_HEIGHT);
});

Template.gameCanvas.onRendered(function()
{
	let self = this;
	let canvas = document.querySelectorAll(".gameCanvas");
	if (canvas.length)
	{
		canvas = canvas[0];
	}

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
	});

Template.gameCanvas.events(
	{});
