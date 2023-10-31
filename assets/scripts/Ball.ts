import { _decorator, Component, Collider2D,Contact2DType,PhysicsSystem2D,IPhysics2DContact,RigidBody2D,Vec2, director, Director,Node, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {

    private speed :number = 10;
   
   

    start () {
      
    }
    startPlay(){
        let RigidBody = this.node.getComponent(RigidBody2D)
        let newVelocity = new Vec2(this.speed, this.speed); 
        RigidBody.linearVelocity = newVelocity;
        
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        // 注册全局碰撞回调函数
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag === 1) {
           director.once(Director.EVENT_AFTER_PHYSICS,()=>{
             otherCollider.node.destroy()
           }) 
        }
        if (otherCollider.tag === 6) {
            director.once(Director.EVENT_AFTER_PHYSICS,()=>{
                otherCollider.node.destroy()
              }) 
            console.log('中獎了');
        }


    }
   
}