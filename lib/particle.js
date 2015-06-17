var _ = require("underscore");
var color = require("color");

function Particle() {
  this.age = 0;
  this.lifespan = 0;

  this.r0 = {'x': 0, 'y': 0, 'z': 0 };
  this.r  = {'x': 0, 'y': 0, 'z': 0 };

  this.v  = {'x': 0, 'y': 0, 'z': 0 };
  this.v0 = {'x': 0, 'y': 0, 'z': 0 };

  this.translate = this.sin;

  this.falloff = 200;
  this.falloffEasing = 'linear';

  this.intensity = .2;

  this.translate();
}

Particle.prototype.setR = function(r) {
  this.r0.x = this.r.x = r.x;
  this.r0.y = this.r.y = r.y;
  this.r0.z = this.r.z = r.z;
}

Particle.prototype.setV = function(v) {
  this.v0.x = this.v.x = v.x;
  this.v0.y = this.v.y = v.y;
  this.v0.z = this.v.z = v.z;
}

Particle.prototype.linear = function() {
  this.r.x = this.r0.x + (this.age * this.v.x);
  this.r.y = this.r0.y + (this.age * this.v.y);
}

Particle.prototype.stationary = function() {
  this.r.x = this.r0.x;
  this.r.y = this.r0.y;
}

Particle.prototype.sin = function() {
  this.r.x = this.r0.x + this.v.x * this.age;
  this.r.y = this.r0.y + (.3 * Math.sin(Math.PI * 4 * this.r.x));
}

Particle.prototype.expired = function() {
  return this.lifespan > 0 && this.age > this.lifespan;
}

Particle.prototype.escaped = function() {
  return this.r.x > 2 || this.r.x < -1;
}

module.exports = Particle;
