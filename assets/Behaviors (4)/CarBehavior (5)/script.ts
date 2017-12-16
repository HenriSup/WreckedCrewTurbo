class CarBehavior extends Sup.Behavior {
  
  private chassisBody:p2.Body;
  private world:p2.World;
  private vehicle:p2.TopDownVehicle;
  
  awake() {
    
    this.chassisBody = this.actor.p2Body.body;
    this.world = Sup.P2.getWorld();
    this.world.gravity= [0,0];
    
    this.world.addBody(this.chassisBody);
    
    this.vehicle = new p2.TopDownVehicle(this.chassisBody);
    
    var frontWheel = this.vehicle.addWheel({
      localPosition: [0,2.25 ] // front
    });
    
    Sup.log(frontWheel);
    Sup.log(this.vehicle.wheels[0]);
    
    frontWheel.setSideFriction(4);

    // Back wheel
    var backWheel = this.vehicle.addWheel({
      localPosition: [0, -2.25] // back
    });
    
    backWheel.setSideFriction(3);
    
    this.vehicle.addToWorld(this.world);
    
  }

  update() {
    let forward = Sup.Input.isKeyDown('Z');
    let backward = Sup.Input.isKeyDown('S');
    let left = Sup.Input.isKeyDown('Q');
    let right = Sup.Input.isKeyDown('D');
    
    var maxSteer = Math.PI / 5;
    
    this.vehicle.wheels[0].steerValue = maxSteer * (Number(left) - Number(right));

    // Engine force forward
    this.vehicle.wheels[1].engineForce = Number(forward) * 17;
    
   
    
    this.vehicle.wheels[1].setBrakeForce(0);
    if(backward){
        if(this.vehicle.wheels[1].getSpeed() > 0.1){
            // Moving forward - add some brake force to slow down
            this.vehicle.wheels[1].setBrakeForce(5);
        } else {
            // Moving backwards - reverse the engine force
            this.vehicle.wheels[1].setBrakeForce(0);
            this.vehicle.wheels[1].engineForce = -2;
        }
    }
  }
  

}
Sup.registerBehavior(CarBehavior);
