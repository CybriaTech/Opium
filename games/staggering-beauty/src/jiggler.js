var Jiggler = function(rest, bound) {
  Jiggler.__all.push(this);
  this.__bound = bound || function() {};
  this.__pos = rest || 0;
  this.rest = rest || 0;
  this.vel = 0;
  this.k = 1;
  this.mass = 3;
  this.d = 0.7;
};

Object.defineProperty(Jiggler.prototype, 'pos', {
  get: function() {
    return this.__pos;
  },
  set: function(v) {
    this.__pos = v;
    this.__bound(v);
  }
})

Jiggler.prototype.bind = function(fnc) {
  this.__bound = fnc;
}

Jiggler.prototype.update = function() {

  var force = -(this.pos - this.rest)*this.k;
  var acc = force / this.mass;
  this.vel += acc;
  this.vel *= this.d;
  this.pos += this.vel;

};

Jiggler.__all = [];
Jiggler.update = function() {
  for (var i = 0, l = Jiggler.__all.length; i < l; i++) {
    Jiggler.__all[i].update();
  }
}