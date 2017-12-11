class CarBehavior extends Sup.Behavior {
  
  private body:Sup.ArcadePhysics2D.Body;
  
  awake() {
    this.body = this.actor.arcadeBody2D;
  }

  update() {
    let forward = Sup.Input.isKeyDown('Z');
    let backward = Sup.Input.isKeyDown('S');
    let left = Sup.Input.isKeyDown('Q');
    let right = Sup.Input.isKeyDown('D');
    
    if(left) {
      this.actor.rotateEulerZ(1);
    }
  }
  

}
Sup.registerBehavior(CarBehavior);
