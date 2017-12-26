class ParticleGeneratorBehavior extends Sup.Behavior {
  
  public sprite:Sup.Sprite;
  private direction:number=0;
  private angle:number=0;
  private frameBetweenParticles:number=60;
  private particleByFrame:number=1;
  private particlePrefab:Sup.Actor;
  
  awake() {
  }

  update() {
    
  }
  
  public init(spritePath:string,direction:number,angle:number,frameBetweenParticles:number,particlesByFrame:number){
    
  }
}
Sup.registerBehavior(ParticleGeneratorBehavior);
