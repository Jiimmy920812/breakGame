import { _decorator, Component, Node, Button, Vec3 ,UITransform, PhysicsSystem2D,Input,sys} from 'cc';
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
       
        //暫停控制
        if (this.pauseBtn) {
            this.pauseBtn.node.on('click', this.pauseGame, this);
        }
        PhysicsSystem2D.instance.enable = true;
    }
   
    closeStartPanel(){
       this.startPanel.active = false
       this.touchStartBg.active = false
       this.startPlay()
    }
    
    startPlay(){
        const countDown = this.countDown.getComponent(countDownNum)
        countDown.isCounting = true
      }
    startProgressBar(){
      const timebar = this.timeBarNode.getComponent(timeBar)
      timebar.isCounting = true
     
    }
    pauseGame(){
        PhysicsSystem2D.instance.enable = !PhysicsSystem2D.instance.enable;
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
      if (countDown.countEnd && !this.countDownExecuted) {
        this.grayBg.active = false
        this.countDown.active =false
        //讀取資料
        const  userData = JSON.parse(sys.localStorage.getItem('userData'));
        layout.generateRectArray(userData.level)
        ball.startPlay()
        this.startProgressBar()
        this.countDownExecuted =true
      }
      if (timebar.countEnd && !this.timeBarExecuted) {
        panel.result = false
        panel.playResult()
        this.timeBarExecuted =true
     } 
    }
}

