import { _decorator, Component, Collider2D,Contact2DType,PhysicsSystem2D,IPhysics2DContact,RigidBody2D,Vec2, director, Director,Node,Animation,misc,SpriteComponent,SpriteFrame} from 'cc';
import {OverPanel} from './OverPanel'
import { AudioController } from './AudioController';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {

    private speed :number =15;
    private launchAngle :number =60;
    private minLaunchAngle: number = 60;
    private maxLaunchAngle: number = 120;

   

    @property(Node)
    private audioController: Node | null = null;
    
    @property(Node)
    private OverPanel: Node | null = null;
    
    @property({type: SpriteFrame})
    lv3_box_0: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    lv3_box_1: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    lv2_box_0: SpriteFrame|null = null;

    audio = null;
    newVelocity = null
    samePositionArr = []


    

    start () {
      this.audio = this.audioController.getComponent(AudioController)
    }
    startPlay(){
       

        let RigidBody = this.node.getComponent(RigidBody2D)

        // 生成一个介于minLaunchAngle和maxLaunchAngle之间的随机角度
        let randomLaunchAngle = Math.random() * (this.maxLaunchAngle - this.minLaunchAngle) + this.minLaunchAngle;

        // 将角度转换为弧度
        let launchAngleRadians = misc.degreesToRadians(randomLaunchAngle);

        // 计算新的速度向量
        this.newVelocity = new Vec2(this.speed * Math.cos(launchAngleRadians), this.speed * Math.sin(launchAngleRadians));

        // 进行反弹角度的调整
        if (Math.abs(this.newVelocity.x) < 0.01 || Math.abs(this.newVelocity.y) < 0.01) {
            // 使用 Vec2.normalize() 確保速度向量的長度是一致的
            this.newVelocity.normalizeSelf();
        }

        // 设置 RigidBody 的角度
        RigidBody.node.angle = randomLaunchAngle;

        // 设置 RigidBody 的线性速度
        RigidBody.linearVelocity = this.newVelocity;

   
        
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
           this.audio.play('hitBrick',1) 
           const sprite =  otherCollider.node
           const frame= sprite.getComponent(SpriteComponent)
           const frameName = frame.spriteFrame.name
           
           if (frameName === 'lv3_box') {
            frame.spriteFrame = this.lv3_box_0
            return
           }else if (frameName === 'lv3_box_0') {
            frame.spriteFrame = this.lv3_box_1
            return
           }else if (frameName === 'lv2_box') {
            frame.spriteFrame = this.lv2_box_0
            return
           }else{
                const animate =  sprite.getComponent(Animation)
                if (animate._hasBeenPlayed) {
                    otherCollider.node.destroy();
                    return
                }else if(animate){
                    // 添加动画播放完成的回调
                    animate.on(Animation.EventType.FINISHED, () => {
                        // 在动画完成后执行销毁操作
                        otherCollider.node.destroy();
                    });
                    // 播放动画
                    animate.play('explosion');
                    //動畫重複撥放
                }
                else {
                    // 如果未找到 Animation 组件，直接销毁节点
                    otherCollider.node.destroy();
                }
             }
           }) 
        }
         //牆壁//板子
        if (otherCollider.tag === 4||otherCollider.tag === 3) {
            this.audio.play('hitBall',1) 
         
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