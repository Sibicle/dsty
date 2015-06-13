var _ = require("underscore");
var color = require("color");
var particle = require('./particle');

function Cosmos() {
  this.particles = [];

  this.tempo = 126;
}

Cosmos.prototype.emit = function() {
  var p = new particle();

  p.v.x = this.tempoSpeed(4);

  p.color = color().hsv(_.random(360), 100, 100);
  this.particles.push(p);
}

Cosmos.prototype.tick = function() {
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    //if (p.r.x > 2 || p.r.x < -1) this.particles.splice(i, 1);

    p.translate();

    p.age++;
  }
}

Cosmos.prototype.collapse = function() {
  this.particles = [];
}

Cosmos.prototype.tempoSpeed = function (beats) {
  return 1 / ((60 * global.fps) / this.tempo) / beats;
}

module.exports = Cosmos;
