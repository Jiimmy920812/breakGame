import { _decorator, Component, Node,SpriteFrame,Input,SpriteComponent,PhysicsSystem2D,Director,Animation,sys} from 'cc';




const { ccclass, property } = _decorator;
@ccclass('OverPanel')
export class OverPanel extends Component {



    @property(Node)
    private grayBg:Node = null;
    @property(Node)
    private touchOverBg:Node = null;

    
    public result:boolean = false;
    public gameLevel:number = 1;

  
    
    @property({type: SpriteFrame})
    winer: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    loser: SpriteFrame|null = null;


    start() {
    //結束面板初始化
    this.node.active = false
    this.touchOverBg.active = false
    if (this.touchOverBg) {
    this.touchOverBg.on(Input.EventType.TOUCH_START, this.closeOverPanel, this);   
        }
    //讀取資料
    const  userData = JSON.parse(sys.localStorage.getItem('userData'));    

    }
    playResult(){
        this.grayBg.active = true  
        this.node.active = true
        this.touchOverBg.active = true
        const animate = this.node.getComponent(Animation);
        const bg = this.node.getChildByName("Bg")
        const sprite = bg.getComponent(SpriteComponent);
        
        //讀取資料
        const  userData = JSON.parse(sys.localStorage.getItem('userData'));    
        if (this.result) {
          sprite.spriteFrame = this.winer
          userData.level++
        }else{
          sprite.spriteFrame = this.loser
          userData.level = 1
        }
        //儲存資料
        sys.localStorage.setItem('userData', JSON.stringify(userData));
        //暫停遊戲
        PhysicsSystem2D.instance.enable = false;
        //執行動畫
        animate.play('result');
      }
      closeOverPanel(){
        this.node.active = false
        this.touchOverBg.active = false
        setTimeout(() => {
          Director.instance.loadScene('game');
      }, 1000)
      }
    update(deltaTime: number) {
    }
}


