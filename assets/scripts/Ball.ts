import { _decorator, Component, Collider2D,Contact2DType,PhysicsSystem2D,IPhysics2DContact,RigidBody2D,Vec2, director, Director,Node,Animation,misc,SpriteComponent,SpriteFrame} from 'cc';
import {OverPanel} from './OverPanel'
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {

    private speed :number =15;
    private launchAngle :number =61;
   


    
    @property(Node)
    private OverPanel: Node | null = null;
    
    @property({type: SpriteFrame})
    BrickTexture: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    BrickTexture_2: SpriteFrame|null = null;

    start () {
      
    }
    startPlay(){
        let RigidBody = this.node.getComponent(RigidBody2D)
        // let newVelocity = new Vec2(this.speed, this.speed); 

        // 将角度转换为弧度
        let launchAngleRadians = misc.degreesToRadians(this.launchAngle);

        let newVelocity = new Vec2(this.speed * Math.cos(launchAngleRadians), this.speed * Math.sin(launchAngleRadians));

        // 设置 RigidBody 的角度
        RigidBody.node.angle = this.launchAngle;
        // 设置 RigidBody 的线性速度
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
        const panel = this.OverPanel.getComponent(OverPanel)
        //一般磚
     
        if (otherCollider.tag === 1) {
            director.once(Director.EVENT_AFTER_PHYSICS,()=>{
            const sprite =  otherCollider.node
            
           const frame= sprite.getComponent(SpriteComponent)
           const frameName = frame.spriteFrame.name
           if (frameName === 'lv3_box') {
            frame.spriteFrame = this.BrickTexture_2
            return
           }else if (frameName === 'lv2_box') {
            frame.spriteFrame = this.BrickTexture
            return
           }else{
                const animate =  sprite.getComponent(Animation)
                if (animate) {
                    // 添加动画播放完成的回调
                    animate.on(Animation.EventType.FINISHED, () => {
                        // 在动画完成后执行销毁操作
                        otherCollider.node.destroy();
                    });
                    // 播放动画
                    animate.play('explosion');
                } else {
                    // 如果未找到 Animation 组件，直接销毁节点
                    otherCollider.node.destroy();
                }
             }
           }) 
        }
        //地板
        if (otherCollider.tag === 2) {
            panel.result = false
            panel.playResult()
         }
        //特殊磚
        if (otherCollider.tag === 6) {
            director.once(Director.EVENT_AFTER_PHYSICS,()=>{
                otherCollider.node.destroy()
              }) 
            panel.result = true
            panel.playResult()
        }


    }
   
}