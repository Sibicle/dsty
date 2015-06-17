var _ = require("underscore");
var color = require("color");
var radient = require("radient");
var particle = require('./particle');
var gradients = require('../config/gradients.js');

global.bg = 5;

function Cosmos() {
  this.spectrum = new radient(yellowMagentaTeal);
  this.bang();
}

Cosmos.prototype.emit = function() {
    var p = new particle();

    p.r0.x = p.r.x = 0;

    var v = {
      'x': this.tempo(4),
      'y': 0,
      'z': 0
    }

    p.setV(v);
    p.translate = p.linear;
    p.intensity = 1;
    p.color = this.spectrum.angle(_.random(360));

    this.particles.push(p);
}

Cosmos.prototype.bang = function() {
  this.age = 0;
  this.particles = [];

  for(var i = 0; i < 1; i++) {
    var p = new particle();
    p.color = this.spectrum.angle(i * 360 / global.bg );
    console.log(p.color.hexString);
    p.translate = p.stationary;
    p.r0.x = p.r.x = i / global.bg;
    this.particles.push(p);
  }
}

Cosmos.prototype.fuse = function() {

    return p;
}

Cosmos.prototype.tick = function() {
  this.age++;

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    p.translate();

    if (p.r.x > 2 || p.r.x < -1) {
      this.particles.splice(i, 1);
    }

    p.age++;
  }
}

Cosmos.prototype.collapse = function() {
  this.particles = [];
  this.age = 0;
  console.log('cosmos destroyed');
}

Cosmos.prototype.tempo = function (beats) {
  return 1 / ((60 * global.fps) / global.tempo) / beats;
}

Cosmos.prototype.log = function (ex) {
  console.log(this.particles.length + ' particles in the cosmos');
  this.particles.forEach(function(element, index, array) {
    if (ex) console.log(element);
    else console.log(index + ' (' + element.age + ') - [' + element.r.x + ', ' + element.r.y + ']');
  });
}

module.exports = Cosmos;
