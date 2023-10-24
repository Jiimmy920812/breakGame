import { _decorator, Component, Collider2D,Contact2DType,PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('TestContactCallBack')
export class TestContactCallBack extends Component {
    start () {
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
        // 只在两个碰撞体开始接触时被调用一次
       console.log(selfCollider.tag,"tag");
       console.log(selfCollider.name,"name");
    }
   
}