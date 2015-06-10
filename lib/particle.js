var _ = require("underscore");
var color = require("color");

function particle() {
  this.age = 0;

  this.x = 0;
  this.y = 0;

  this.x1 = null;
  this.y1 = null;

  this.vx = 0;
  this.vy = 0;

  this.easing = 'linear';

  this.color  = color().rgb(255, 255, 255);
  this.vcolor = 1;
  this.color1 = null;
  this.colorEasing = 'linear';

  this.falloff = 1000;
  this.falloffEasing = 'linear';

  this.intensity = 1;
}

module.exports = particle;
