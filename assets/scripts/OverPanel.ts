import { _decorator, Component, Node,SpriteFrame,Input,SpriteComponent,PhysicsSystem2D,Director,Animation} from 'cc';




const { ccclass, property } = _decorator;
@ccclass('OverPanel')
export class OverPanel extends Component {



    @property(Node)
    private grayBg:Node = null;
    @property(Node)
    private touchOverBg:Node = null;
    @property(Node)
    private OverPanel: Node | null = null;
    
    public result:boolean = false;
    public gameLevel:number = 1;
    
    @property({type: SpriteFrame})
    winer: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    loser: SpriteFrame|null = null;


    start() {
    //結束面板初始化
    this.OverPanel.active = false
    this.touchOverBg.active = false
    if (this.touchOverBg) {
    this.touchOverBg.on(Input.EventType.TOUCH_START, this.closeOverPanel, this);   
        }
    }
    playResult(){
        this.grayBg.active = true  
        this.OverPanel.active = true
        this.touchOverBg.active = true
        const animate = this.node.getComponent(Animation);
        const bg = this.OverPanel.getChildByName("Bg")
        const sprite = bg.getComponent(SpriteComponent);
        if (this.result) {
          sprite.spriteFrame = this.winer
          this.gameLevel++
        }else{
          sprite.spriteFrame = this.loser
          this.gameLevel = 1
        }
        PhysicsSystem2D.instance.enable = false;
        animate.play('result');
      }
      closeOverPanel(){
        this.OverPanel.active = false
        this.touchOverBg.active = false
        setTimeout(() => {
          Director.instance.loadScene('game');
      }, 1000)
      }
    update(deltaTime: number) {
        
    }
}


