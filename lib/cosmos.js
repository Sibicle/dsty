var _ = require("underscore");
var particle = require('./particle');

function Cosmos() {
  this.particles = [];
}

Cosmos.prototype.emit = function() {
  this.particles.push(new particle());
}

Cosmos.prototype.setSpectrum = function() {

}

Cosmos.prototype.tick = function() {
  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    p.age++
    p.x += .001;
  }
}

Cosmos.prototype.collapse = function() {
  this.particles = [];
}

module.exports = Cosmos;
