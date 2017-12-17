class CarBehavior extends Sup.Behavior {
  
  private world:p2.World;
  private vehicle:p2.TopDownVehicle;
  
  awake() {
    //get world
    this.world = Sup.P2.getWorld();
    this.world.gravity= [0,0];
    
    this.vehicle = this.initCar(this.world);
  }

  update() {
    let forward = Sup.Input.isKeyDown('Z');
    let backward = Sup.Input.isKeyDown('S');
    let left = Sup.Input.isKeyDown('Q');
    let right = Sup.Input.isKeyDown('D');
    
    var maxSteer = Math.PI / 4;
    
    this.vehicle.wheels[0].steerValue = maxSteer * (Number(left) - Number(right));
    this.turnWheel(this.vehicle.wheels[0].steerValue);
    
    // Engine force forward
    this.vehicle.wheels[1].engineForce = Number(forward) * 17;
    
    this.vehicle.wheels[1].setBrakeForce(0);
    if(backward){
        if(this.vehicle.wheels[1].getSpeed() > 0.1){
            // Moving forward - add some brake force to slow down
            this.vehicle.wheels[1].setBrakeForce(8);
        } else {
            // Moving backwards - reverse the engine force
            this.vehicle.wheels[1].setBrakeForce(0);
            this.vehicle.wheels[1].engineForce = -4;
        }
    }
  }
  
  private initCar(world):p2.TopDownVehicle{
    let chassisBody = this.actor.p2Body.body;
    world.addBody(chassisBody);
    
    var car = new p2.TopDownVehicle(chassisBody);
    
    var frontWheel = car.addWheel({
      localPosition: [0,2.25 ] // frontWheel
    });
    frontWheel.setSideFriction(15);

    var backWheel = car.addWheel({
      localPosition: [0, -2.25] // backWheel
    });
    backWheel.setSideFriction(10);
    
    car.addToWorld(this.world);
    return car;
  }
  
  private turnWheel(angle){
    var frontWheels = this.actor.getChild("FrontWheels").getChildren();
    let lerp = 0.10;
    frontWheels.forEach(frontwheel =>{
      var actualAngle = frontwheel.getLocalEulerZ()
      var newAngle = Sup.Math.lerpAngle(actualAngle,angle,lerp);
      frontwheel.setLocalEulerZ(newAngle);
    })
  }
  

}
Sup.registerBehavior(CarBehavior);
