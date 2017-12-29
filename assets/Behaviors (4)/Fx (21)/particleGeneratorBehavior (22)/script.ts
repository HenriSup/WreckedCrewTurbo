class ParticleGeneratorBehavior extends Sup.Behavior {
  
  private spritePath:string='Sprites/Fx/particleDebugger';
  private particleName:string='particle';
  private direction:number=0;
  private movement:Sup.Math.Vector2=new Sup.Math.Vector2(0,0);
  private angle:number=0;
  private frameBetweenParticles:number=5;
  private particlesByFrame:number=1;
  private particleLifeTimeInFrame:number=10;
  
  private frameCounter:number=0;
  private particles:Sup.Actor[]=new Array();
  
  awake() {
    
  }

  update() {
    this.frameCounter = this.frameCounter + 1;
    
    if (((this.frameCounter-this.particleLifeTimeInFrame) % this.particleLifeTimeInFrame) == 0){
      if (this.particles.length>0){
        let particle:Sup.Actor = this.particles.shift();
        particle.destroy();
      }
    }
    
    if ((this.frameCounter % this.frameBetweenParticles) == 0){
      //deleted so it wont show
      //this.instantiateParticle();
    }  
 
    
  }
  
  private instantiateParticle(){
    //TODO
    //HANDLE VARIABLES FRO CHRIST SAKES!!! 
    //IT WONT MOVE OR DO ANYTHING LIKE THAT!! OMG ARE YOU SO DUMB ?!
    let particle = new Sup.Actor('particle');
    this.particles.push(particle);
    let sprite = new Sup.SpriteRenderer(particle,this.spritePath);
    particle.setPosition(this.actor.getPosition());
  }
  
  
  
  public init(spritePath?:string,particleName?:string,direction?:number,movement?:Sup.Math.Vector2,angle?:number,frameBetweenParticles?:number,particlesByFrame?:number){
    if (spritePath){
      this.spritePath=spritePath;
    } 
    if (particleName){
      this.particleName=particleName;
    }
    if (direction){
      this.direction=direction;
    }    
    if (direction){
      this.movement=movement;
    }
    if (angle){
      this.angle=angle;
    }
    if (frameBetweenParticles){
      this.frameBetweenParticles=frameBetweenParticles;
    }
    if (particlesByFrame){
      this.particlesByFrame=particlesByFrame;
    }
  }
}
Sup.registerBehavior(ParticleGeneratorBehavior);
