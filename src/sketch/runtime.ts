import { Particle } from "../models/particle.class";

export function runTime() {}

export class PhysicManager {
  toPhysic() {}



  constructor() {}
}

export class EntityManager {
  get allEntities() {
    return [...this.particles, ...this.statics]
  }

  toProcess() {
    this.allEntities.forEach(entry => {
this.entry.render()
    });
  }

  constructor(public particles: Particle[], public statics: Static[]) {}
  }
