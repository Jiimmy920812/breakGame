import { _decorator, Component, Node, Button, Vec3 ,UITransform, PhysicsSystem2D,Input,sys,Label,SpriteFrame,SpriteComponent,Director} from 'cc';
import { Ball } from './Ball'
import {BrickLayout} from './BrickLayout'
import {OverPanel} from './OverPanel'
import { countDownNum } from './CountDownNum';
import {timeBar} from "./TimeBar" 
import { AudioController } from './AudioController';
import { BgAudio } from './BgAudio';


const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
  

    @property(Button)
    private settingBtn: Button | null = null;

    @property(Button)
    private pauseBtn: Button | null = null;

    @property(Button)
    private keepGoingBtn: Button | null = null;

    @property(Node)
    private keepGoingUI: Node | null = null;

    @property(Node)
    private audioController: Node | null = null;

    @property(Node)
    private bgAudioController: Node | null = null;

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

    @property(Node)
    private settingPanel: Node | null = null;

    @property({type: SpriteFrame})
    startPanl_L1_info: SpriteFrame|null = null;
    
    public startPanl_L1_title:string = '第一關遊戲說明'
    public startPanl_L1_text:string =
    `
    透過拖曳左、右方向移動跳板，在時間
    內拯救貓咪即可獲勝！！
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
    
    audio = null;
    BgAudio = null;
    
    clickInProgress = false
    showLevel_screen = false
    startPlay_screen = false
    
    onLoad() {
      //起始面板點擊
        if (this.touchStartBg) {
            this.touchStartBg.on(Input.EventType.TOUCH_START, this.closeStartPanel, this);   
                }
        //手指操控
        this.node.on(Input.EventType.TOUCH_MOVE,this.movePaddle,this)
       
        //設定Btn
        if (this.settingBtn) {
          this.settingBtn.node.on('click', this.settingPanelOpen, this);
        }
        //暫停Btn
        if (this.pauseBtn) {
            this.pauseBtn.node.on('click', this.pauseGame, this);
        }
        //繼續遊戲Btn
        if (this.keepGoingBtn) {
        this.keepGoingBtn.node.on('click', this.keepGoing, this);
        
      }
      
        this.pauseBtn.interactable  = false
        this.keepGoingUI.active = false
        PhysicsSystem2D.instance.enable = true;
        this.audio = this.audioController.getComponent(AudioController)
        this.BgAudio = this.bgAudioController.getComponent(BgAudio)
        
        this.clickInProgress
        this.showLevel_screen = false
        this.startPlay_screen = false
    }
   
    closeStartPanel(){
       this.startPanel.active = false
       this.touchStartBg.active = false
       this.showLevel_screen = true
       this.showLevel()
    }
    showLevel(){
      if (!this.showLevel_screen) return;
      this.audio.play('popUp', 1);
      this.levelUI.active = true;
      const userData = JSON.parse(sys.localStorage.getItem('profiles'));
      const levelLabel = this.levelUI.getComponent(Label);
      levelLabel.string = `LEVEL ${userData.level}`;
      setTimeout(() => {
        this.startPlay_screen = true;
        this.startPlay();
        this.levelUI.active = false;
      }, 1000);
    }
    startPlay(){
      if (!this.startPlay_screen) return;
      if (this.audio) {
        this.audio.play('popUp', 1);
        setTimeout(() => {
          this.audio.play('popUp', 1);
        }, 1000);
        setTimeout(() => {
          this.audio.play('popUp', 1);
        }, 2000);
        this.countDown.active = true;
        setTimeout(() => {
          const countDown = this.countDown.getComponent(countDownNum);
          countDown.isCounting = true;
          this.levelUI.active = false; // Move this line inside the setTimeout callback
        }, 50);
       }
      }
    startProgressBar(){
      const timebar = this.timeBarNode.getComponent(timeBar)
      timebar.isCounting = true
     
    }
    pauseGame(){
      if (!this.pauseBtn.interactable) return
      this.audio.play('pauseMusic',1)
      PhysicsSystem2D.instance.enable = false;
        this.grayBg.active = true
        this.keepGoingUI.active = true
        //將node移置最上層
        this.keepGoingUI.setSiblingIndex(100);
    }

    settingPanelOpen(){
      this.settingPanel.active =true
    }

    settingPanelClose(){
      this.settingPanel.active =false
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


        const touchPos = e.getUILocation();
        
        const borderMin =  -(canvasWidth/2 - paddleWidth/2)
        const borderMax =  canvasWidth/2 - paddleWidth/2
        const currentPosition = this.paddle.position;
        if (this.paddle) {
            this.paddle.setPosition(new Vec3(touchPos.x-canvasWidth/2, currentPosition.y, currentPosition.z));
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
        this.pauseBtn.interactable  = true
        this.grayBg.active = false
        this.countDown.active =false
        layout.generateRectArray(userData.level)
        ball.startPlay()
        //背景音樂
        this.BgAudio.play('bg')
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

