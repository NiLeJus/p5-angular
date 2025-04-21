export class Particle {
  private s: any; // Référence à l'instance P5
  mu = 0.01;

  constructor(s: any, x: number, y: number, mu: number) {
    this.s = s;
    this.position = s.createVector(x, y);
    this.velocity = s.constructor.Vector.random2D();
    this.velocity.mult(0);
    this.acceleration = s.createVector(0, 0);
    this.mass = s.random(1, 6);
    this.r = s.sqrt(this.mass) * 10;
  }

  position: any;
  velocity: any;
  acceleration: any;
  mass: number;
  r: number;

  applyForce(force: any, color?: any) {
    let f = this.s.constructor.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  friction() {
    const diff = this.s.height - (this.position.y + this.r);
    if (diff < 1) {
      let friction = this.velocity.copy();
      friction.normalize().mult(-1);

      friction.setMag(this.mu * this.mass);
      this.applyForce(friction, this.s.color(255, 0, 0));
    }
  }

  collide(other: Particle) {
    let impactVector = this.s.constructor.Vector.sub(other.position, this.position);
    let d = impactVector.mag();
    if (d < this.r + other.r) {
      // Push the particles out so that they are not overlapping
      let overlap = d - (this.r + other.r);
      let dir = impactVector.copy();
      dir.setMag(overlap * 0.5);
      this.position.add(dir);
      other.position.sub(dir);

      //Distance!
      d = this.r + other.r;
      impactVector.setMag(d);

      let mSum = this.mass + other.mass;
       const vDiff = this.s.constructor.Vector.sub(other.velocity, this.velocity);


      // Particle A (this)
      let num = vDiff.dot(impactVector);
      let den = mSum * d * d;
      let deltaVA = impactVector.copy();
      deltaVA.mult((1.3 * other.mass * num) / den);
      this.velocity.add(deltaVA);

      // Particle B (other)
      let deltaVB = impactVector.copy();
      deltaVB.mult((-1.3 * this.mass * num) / den);
      other.velocity.add(deltaVB);
    }
  }

  edges() {
    if (this.position.y >= this.s.height - this.r) {
      this.position.y = this.s.height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y <= this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }

    if (this.position.x >= this.s.width - this.r) {
      this.position.x = this.s.width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x <= this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }
  }

  render() {
    this.s.stroke(0);
    this.s.strokeWeight(2);
    this.s.fill(127);
    this.s.circle(this.position.x, this.position.y, this.r * 2);
  }
}
