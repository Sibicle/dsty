var _ = require("underscore");
var color = require("color");
var radient = require("radient");
var particle = require('./particle');
var gradients = require('../config/gradients.js');

global.bg = 30;

function Cosmos() {
  this.age = 0;
  this.particles = [];
  this.spectrum = new radient(fire);
  this.bang();
}

Cosmos.prototype.bang = function()
{
  for(var i = 0; i < global.bg; i++) {
    var p = new particle();

    angle = (i * 360) / ( global.bg - 1 );
    p.color = this.spectrum.angle(angle);

    p.translate = p.stationary;
    p.intensity = .1;
    p.falloff = 300;
    p.r0.x = p.r.x = i / ( global.bg - 1);
    this.particles.push(p);
  }
}

Cosmos.prototype.emit = function()
{
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

Cosmos.prototype.flare = function()
{
    var p = new particle();

    p.r0.x = p.r.x = 0;

    var v = {
      'x': this.tempo(4),
      'y': 0,
      'z': 0
    }

    p.setV(v);
    p.translate = p.sin;
    p.intensity = 1;
    p.color = this.spectrum.angle(_.random(360));

    this.particles.push(p);
}

Cosmos.prototype.meteor = function() {
    var p = new particle();

    p.r0.x = p.r.x = 0;

    var v = {
      'x': this.tempo(1),
      'y': 0,
      'z': 0
    }

    p.setV(v);
    p.translate = p.linear;
    p.intensity = 1;
    p.color = this.spectrum.angle(_.random(360));

    this.particles.push(p);
}

Cosmos.prototype.wind = function() {
  this.spectrum = new radient(yellowMagentaTeal);
  this.collapse();
}

Cosmos.prototype.tick = function() {
  this.age++;

  for (var i = 0; i < this.particles.length; i++) {
    var p = this.particles[i];

    p.translate();

    if ( p.expired() || p.escaped() ) this.particles.splice(i, 1);

    p.age++;
  }
}

Cosmos.prototype.collapse = function() {
  for (var i = 0; i < this.particles.length; i++) {
    p = this.particles[i];
    p.lifespan = p.age + 100;
  }
}

Cosmos.prototype.die = function() {
  this.particles = [];
  this.age = 0;
  console.log('heat death');
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
