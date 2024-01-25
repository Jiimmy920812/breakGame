import { _decorator, Component, Node, Button, Vec3 ,UITransform, PhysicsSystem2D,Input,sys,Label,SpriteFrame,SpriteComponent} from 'cc';
import { Ball } from './Ball'
import {BrickLayout} from './BrickLayout'
import {OverPanel} from './OverPanel'
import { countDownNum } from './CountDownNum';
import {timeBar} from "./TimeBar" 



const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
  


    @property(Button)
    private pauseBtn: Button | null = null;

    @property(Button)
    private keepGoingBtn: Button | null = null;

    @property(Node)
    private keepGoingUI: Node | null = null;

    

    @property(Node)
    private ball: Node | null = null;

    @property(Node)
    private paddle: Node | null = null;

    @property(Node)
    private BrickLayout: Node | null = null;


    @property(Node)
    private OverPanel: Node | null = null;

    @property(Node)
    private touchStartBg:Node = null;

    
    @property(Node)
    private startPanel: Node | null = null;

    @property({type: SpriteFrame})
    startPanl_L1_info: SpriteFrame|null = null;
    
    public startPanl_L1_title:string = '第一關遊戲說明'
    public startPanl_L1_text:string =
    `
    透過左、右方向鍵控制底板擊落磚塊
    最快擊落寶物磚塊者即可獲勝！！
    `
    
    @property({type: SpriteFrame})
    startPanl_L2_info: SpriteFrame|null = null;
    
    public startPanl_L2_title:string = '第二關遊戲說明'
    public startPanl_L2_text:string = 
    `
    歡迎來到第二關~這次難度增加囉！
    多了兩種特殊南瓜，需多敲擊幾次
    加油！！
    `


    @property(Node)
    private levelUI: Node | null = null;

    @property(Node)
    private grayBg: Node | null = null;

    @property(Node)
    private countDown: Node | null = null;
    public countDownExecuted :boolean = false

    @property(Node)
    private timeBarNode: Node | null = null;
    public timeBarExecuted :boolean = false
    

    
    onLoad() {
      
      //起始面板點擊
        if (this.touchStartBg) {
            this.touchStartBg.on(Input.EventType.TOUCH_START, this.closeStartPanel, this);   
                }
        //手指操控
        this.node.on(Input.EventType.TOUCH_MOVE,this.movePaddle,this)
       
        //暫停Btn
        if (this.pauseBtn) {
            this.pauseBtn.node.on('click', this.pauseGame, this);
        }
        //繼續遊戲Btn
        if (this.keepGoingBtn) {
        this.keepGoingBtn.node.on('click', this.keepGoing, this);
        
      }
        this.keepGoingUI.active = false
        PhysicsSystem2D.instance.enable = true;

    }
   
    closeStartPanel(){
       this.startPanel.active = false
       this.touchStartBg.active = false
       this.showLevel()
    }
    showLevel(){
      this.levelUI.active = true
      const  userData = JSON.parse(sys.localStorage.getItem('profiles'));
       const levelLabel =  this.levelUI.getComponent(Label);
       levelLabel.string = `LEVEL${userData.level}`
       setTimeout(() => {
        this.levelUI.active = false
        this.startPlay()
       }, 1000);
    }
    startPlay(){
      this.countDown.active = true  
      setTimeout(() => {
        const countDown = this.countDown.getComponent(countDownNum)
        countDown.isCounting = true
       }, 50); 
      }
    startProgressBar(){
      const timebar = this.timeBarNode.getComponent(timeBar)
      timebar.isCounting = true
     
    }
    pauseGame(){
        PhysicsSystem2D.instance.enable = false;
        this.grayBg.active = true
        this.keepGoingUI.active = true
        //將node移置最上層
        this.keepGoingUI.setSiblingIndex(100);
    }
    keepGoing(){
      PhysicsSystem2D.instance.enable = true;
       this.grayBg.active = false
       this.keepGoingUI.active = false
    }



    movePaddle(e){
        const transform = this.getComponent(UITransform);
        const canvasWidth = transform.width
        const paddleWidth = this.paddle.getComponent(UITransform).width
      
        const touchPos = e.getLocation();
        const borderMin =  -(canvasWidth/2 - paddleWidth/2)
        const borderMax =  canvasWidth/2 - paddleWidth/2
        const currentPosition = this.paddle.position;
        
        if (this.paddle) {
            this.paddle.setPosition(new Vec3(touchPos.x-paddleWidth*2, currentPosition.y, currentPosition.z));
           if (currentPosition.x<borderMin) {
            this.paddle.setPosition(new Vec3(borderMin, currentPosition.y, currentPosition.z));
           }if (currentPosition.x>borderMax) {
            this.paddle.setPosition(new Vec3(borderMax, currentPosition.y, currentPosition.z));
             }
            }
    }
    
    update(deltaTime: number)  {
      const ball = this.ball.getComponent(Ball)
      const layout = this.BrickLayout.getComponent(BrickLayout)
      const panel = this.OverPanel.getComponent(OverPanel)
      const countDown = this.countDown.getComponent(countDownNum)
      const timebar = this.timeBarNode.getComponent(timeBar)
      
      //起始面板資訊
      const SP_title = this.startPanel.getChildByName('title').getComponent(Label)
      const SP_info = this.startPanel.getChildByName('info').getComponent(SpriteComponent)
      const SP_infoText = this.startPanel.getChildByName('infoText').getComponent(Label)
      //讀取資料
      const  userData = JSON.parse(sys.localStorage.getItem('profiles'));
      
      if (userData.level === 1) {
        SP_title.string = this.startPanl_L1_title
        SP_info.spriteFrame = this.startPanl_L1_info
        SP_infoText.string = this.startPanl_L1_text
      }if (userData.level === 2) {
        SP_title.string = this.startPanl_L2_title 
        SP_info.spriteFrame = this.startPanl_L2_info
        SP_infoText.string = this.startPanl_L2_text
      }


      if (countDown.countEnd && !this.countDownExecuted) {
        this.grayBg.active = false
        this.countDown.active =false
        layout.generateRectArray(userData.level)
        ball.startPlay()
        this.startProgressBar()
        this.countDownExecuted =true
      }
      else if (timebar.countEnd && !this.timeBarExecuted) {
        panel.result = false
        panel.playResult()
        this.timeBarExecuted =true
     } 
    }
}

