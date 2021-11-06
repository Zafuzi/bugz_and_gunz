import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 900;

Template.gameCanvas.onCreated(function()
{
	this.paused = new ReactiveVar(true);
	this.width = new ReactiveVar(GAME_WIDTH);
	this.height = new ReactiveVar(GAME_HEIGHT);
});

