var _ = require("underscore");
var color = require("color");
var particle = require('./particle');

function Cosmos() {
  this.particles = [];

  this.tempo = 136;
}

Cosmos.prototype.emit = function() {
  var p = new particle();

  p.color = color().hsv(_.random(360), 100, 100);
  p.vx = 1 / ((60 * global.fps) / this.tempo);

  this.particles.push(p);
}

Cosmos.prototype.tick = function() {
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    if (p.x > 2 || p.x < -1) this.particles.splice(i, 1);

    p.x += p.vx;

    p.age++;
  }
}

Cosmos.prototype.collapse = function() {
  this.particles = [];
}

module.exports = Cosmos;
