var OPC = require('./opc');
var Cosmos = require('./cosmos');

var keypress = require('keypress');
var tty = require('tty');

var strip = OPC.loadModel('../config/strip60.json');
var client = new OPC('localhost', 7890);

var NanoTimer = require('nanotimer');
var timer = new NanoTimer();

global.fps = 60;
global.tempo = 136;

var cosmos = new Cosmos();

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  if (key) {
    if (key.ctrl && key.name == 'c') process.exit();
    else if (key.name == 'c') {
      cosmos.collapse();
    } else if (key.name == 'l') {
      if (key.shift) cosmos.log(true);
      else cosmos.log();
    } else if (key.name == 'r') {
      cosmos.die();
      cosmos.bang();
    }
  } else if (ch) {
    if (ch == '1') {
      cosmos.emit();
    } else if (ch == '2') {
      cosmos.flare();
    } else if (ch == '3') {
      cosmos.meteor();
    } else if (ch == '4') {
      cosmos.wind();
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

timer.setInterval(draw, '', 1 / global.fps + 's');

function draw() {
  client.mapParticles(cosmos.particles, strip);
  cosmos.tick();
}
