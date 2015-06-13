var _ = require("underscore");
var color = require("color");

function Particle() {
  this.age = 0;

  this.r0 = {'x': 0, 'y': 0, 'z': 0};
  this.r  = {'x': this.r0.x, 'y': this.r0.y, 'z': this.r0.z};

  this.v  = {'x': 0, 'y': 0, 'z': 0 };
  this.v0 = {'x': 0, 'y': 0, 'z': 0 };

  this.a  = {'x': 0, 'y': 0, 'z': 0 };
  this.a0 = {'x': 0, 'y': 0, 'z': 0 };

  this.easing = this.linear;

  this.color  = color().rgb(255, 255, 255);
  this.vcolor = 1;
  this.color1 = null;
  this.colorEasing = 'linear';

  this.falloff = 1000;
  this.falloffEasing = 'linear';

  this.intensity = 1;

  this.translate();
}

Particle.prototype.translate = function() {
  this.easing();
}

Particle.prototype.linear = function() {
  this.r.x = this.r0.x + (this.age * this.v.x);
  this.r.y = this.r0.y + (this.age * this.v.y);
}

Particle.prototype.lorenz = function() {
  factor = 20;
  scale = .1 / factor;

  this.v.x *= factor;
  this.v.y *= factor;
  this.v.z *= factor;

  this.v.x = 10 * (this.r.y - this.r.x);
  this.v.y = (this.r.x * (28 - this.r.z)) - this.r.y;
  this.v.z = (this.r.x * this.r.y) - ((8/3) * this.r.z);

  this.r.x = this.r.x + scale * this.v.x;
  this.r.y = this.r.y + scale * this.v.y;
  this.r.z = this.r.z + scale * this.v.z;
}

module.exports = Particle;
