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

    p.translate();

    if (p.r.x > 2 || p.r.x < -1) this.particles.splice(i, 1);

    p.age++;
  }
}

Cosmos.prototype.collapse = function() {
  this.particles = [];
  console.log('cosmos destroyed');
}

Cosmos.prototype.tempoSpeed = function (beats) {
  return 1 / ((60 * global.fps) / this.tempo) / beats;
}

Cosmos.prototype.log = function () {
  console.log(this.particles.length + ' particles in the cosmos');
  this.particles.forEach(function(element, index, array) {
    console.log(index + ' (' + element.age + ') - [' + element.r.x + ', ' + element.r.y + ']');
  });
}

module.exports = Cosmos;
