var OPC = require('./opc');
var cosmos = require('./cosmos');
var particle = require('./particle');

var keypress = require('keypress');
var tty = require('tty');

var strip = OPC.loadModel('../config/strip60.json');
var client = new OPC('localhost', 7890);

var cosmos = new cosmos();

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
  if (key) {
    if (key.ctrl && key.name == 'c') process.exit();
    else if (key.name == 'space') {
      cosmos.emit();
    } else if (key.name == 'c') {
      cosmos.collapse();
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

setInterval(draw, 10);

function draw() {
  client.mapParticles(cosmos.particles, strip);
  cosmos.tick();
}
