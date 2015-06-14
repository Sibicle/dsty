var _ = require("underscore");
var color = require("color");
var particle = require('./particle');

function Cosmos() {
  this.bang();
}

Cosmos.prototype.emit = function() {
    var p = this.fuse();
    p.r0.x = p.r.x = 0;

    var v = {
      'x': this.tempo(1 ),
      'y': 0,
      'z': 0
    }

    p.setV(v);
    p.translate = p.sin;
    p.intensity = 1;

    this.particles.push(p);
}

Cosmos.prototype.bang = function() {
  this.age = 0;
  this.particles = [];

  for(var i = 0; i < 5; i++) {
    p = this.fuse();
    this.particles.push(p);
  }
}

Cosmos.prototype.fuse = function() {
    var r = {
      'x': _.random(100) / 100,
      'y': 0,
      'z': 0
    }

    var p = new particle();

    p.setR(r);
    p.color = color().hsv(_.random(360), 100, 100);
    p.translate = p.stationary;

    return p;
}

Cosmos.prototype.tick = function() {
  this.age++;

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];
    p.color.rotate(_.random(1) ? 2 : -2);
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
