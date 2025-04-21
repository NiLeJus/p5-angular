import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { Particle } from '../models/particle.class';
import { Static } from '../models/static.class';

@Component({
  selector: 'app-p5-sketch',
  standalone: true,
  template: `<div #sketchHolder></div>`,
})
export class P5SketchComponent implements AfterViewInit {
  @ViewChild('sketchHolder') sketchHolder!: ElementRef;

  width = window.innerWidth;
  height = window.innerHeight;

  @HostListener('window:resize', [])
  onResize() {
    this.width = window.innerWidth - 10;
    this.height = window.innerHeight - 10;
    this.p5Instance.resizeCanvas(this.width, this.height);
  }

  private p5Instance: any;
  private particles: Particle[] = [];
  private particleNumber = 32;
  private mu = 0.1;

  private mixers: Static[] = [];

  ngAfterViewInit() {
    // @ts-ignore
    const p5 = (window as any).p5;

    const sketch = (s: any) => {
      s.setup = () => {
        s.createCanvas(this.width, this.height / 2).parent(
          this.sketchHolder.nativeElement
        );
        s.angleMode(s.RADIANS);
        this.setupParticles(s);
      };

      s.draw = () => {
        s.background(255);
        this.updateParticles(s);
      };
    };

    this.p5Instance = new p5(sketch);
  }

  private setupParticles(s: any) {
    for (let i = 0; i < this.particleNumber; i++) {
      let x = s.random(s.width);
      let y = s.random(s.height);
      this.particles.push(new Particle(s, x, y, 0.1));
    }

    this.mixers.push(new Static(s));
  }

  private updateParticles(s: any) {
    for (const particle of this.particles) {
      // if (s.mouseIsPressed) {
      //   const wind = s.createVector(0, -1);
      //   particle.applyForce(wind, s.color(0, 0, 255));
      // }

      this.applyGravity(particle, s);
      particle.friction(); // Plus besoin de passer 's'
    }

    this.checkingForCollision();

    for (const particle of this.particles) {
      particle.update();
      particle.edges();
      particle.render();
    }

    for (const mixer of this.mixers) {
      mixer.render();
    }
  }

  private checkingForCollision() {
    for (let i = 0; i < this.particles.length; i++) {
      const particleA = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const particleB = this.particles[j];
        particleA.collide(particleB);
      }
    }
  }

  private applyGravity(particle: Particle, s: any) {
    const gravity = s.createVector(0.0, 0.1);
    const weight = gravity.copy().mult(particle.mass);
    particle.applyForce(weight);
  }

  private drawVector(
    v: any,
    x: number,
    y: number,
    col: any,
    factor: number,
    s: any
  ) {
    s.push();
    const arrowsize = 4;
    s.translate(x, y);
    s.stroke(col);
    s.rotate(v.heading());
    const len = v.mag() * factor;
    s.line(0, 0, len, 0);
    s.line(len, 0, len - arrowsize, +arrowsize / 2);
    s.line(len, 0, len - arrowsize, -arrowsize / 2);
    s.pop();
  }

  ngOnDestroy() {
    if (this.p5Instance) {
      this.p5Instance.remove();
      this.particles = [];
    }
  }
}
