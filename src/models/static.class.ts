export class Static {
  private s: any;
  angle = 0;
  angleV = 0;
  angleA = 0.001;

  constructor(s: any) {
    this.s = s;
  }

  render() {
    this.angleA = this.s.map(100, 0, 155, -0.01, 0.01);
    this.angleV = this.s.constrain(this.angleV, -0.2, 0.2);

    this.s.noStroke();
    this.s.fill(240, 99, 164);
    this.s.rectMode('CENTER');
    this.s.translate(500, 300);
    this.s.rotate(this.angle);
    this.s.rect(0, 0, 256, 32);

    this.angle += this.angleV;
    this.angleV += this.angleA;
  }
}
