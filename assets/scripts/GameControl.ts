import { _decorator, Component, Node, Button, Vec3 ,UITransform, Label, PhysicsSystem2D,Input,SpriteFrame,SpriteComponent,find} from 'cc';
import { Ball } from './Ball'
import {BrickLayout} from './BrickLayout'
import {OverPanel} from './OverPanel'

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
  


   

    @property(Button)
    private leftBtn: Button | null = null;

    @property(Button)
    private rightBtn: Button | null = null;

    @property(Button)
    private pauseBtn: Button | null = null;


    @property(Node)
    private ball: Node | null = null;

    @property(Node)
    private paddle: Node | null = null;
    private splace:number = 50;

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
    @property({type: SpriteFrame})
    num_2: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    num_1: SpriteFrame|null = null;



    @property(Node)
    private timeBar: Node | null = null;
    private timeBarX:number = -150 ;
    private timeBarY:number = 7.7 ;
    public barUnit:number = 0 ; 
    public timer = null;

    @property(Node)
    private timeBarNum: Node | null = null;
    private min: number = 1;
    private sec: number = 0;


    
    onLoad() {
        //起始面板點擊
        if (this.touchStartBg) {
            this.touchStartBg.on(Input.EventType.TOUCH_START, this.closeStartPanel, this);   
                }
        //方向控制
        if (this.leftBtn) {
            this.leftBtn.node.on('click', this.onLeftButtonClick, this);
        }
        if (this.rightBtn) {
            this.rightBtn.node.on('click', this.onRightButtonClick, this);
        }
        //暫停控制
        if (this.pauseBtn) {
            this.pauseBtn.node.on('click', this.pauseGame, this);
        }
        this.init()
    }
    init(){
        //取得倒數記數
        const timeNum =  this.timeBarNum.getComponent(Label)
        this.sec =  this.min *60
        timeNum.string = `01:00`;

        const timeBar = this.timeBar.getComponent(UITransform);
        this.barUnit = timeBar.width/this.sec 

        //初始長條
        clearInterval(this.timer); // 清除定时器
        this.timeBarX = -150
        this.timeBarY = 7.7
        PhysicsSystem2D.instance.enable = true;
        this.timeBar.getComponent(UITransform).width = this.barUnit
        this.timeBar.position = new Vec3(this.timeBarX, this.timeBarY, 0);
    }
    closeStartPanel(){
       this.startPanel.active = false
       this.touchStartBg.active=false
       this.startPlay()
    }
    
    startPlay(){
        const ball = this.ball.getComponent(Ball)
        const layout = this.BrickLayout.getComponent(BrickLayout)
        const sprite = this.countDown.getComponent(SpriteComponent);
        let count = 3
        const timer  = setInterval(() => {
            if (count > 1) {
              count--;
              if (count===2) {
                sprite.spriteFrame = this.num_2
              }
              if (count===1) {
                sprite.spriteFrame = this.num_1
              }
            } else {
              clearInterval(timer); // 清除定时器
              this.countDown.active = false
              this.grayBg.active = false
              layout.generateRectArray()
              ball.startPlay()
              this.gameCountDown()
            }
          }, 1000);
        }
    gameCountDown(){
       //取得倒數記數
        const timeNum =  this.timeBarNum.getComponent(Label)
        const panel = this.OverPanel.getComponent(OverPanel)
 
        this.timer = setInterval(() => {
          console.log(this.timeBar,'111111111111111111111111111111'); 
          if (this.sec > 0&& PhysicsSystem2D.instance.enable) {
              this.sec--;
            if (this.sec<10) {
                timeNum.string = `00:0${this.sec}`;
            }else{
                timeNum.string = `00:${this.sec}`;
            }
              this.timeBarX = this.timeBarX + this.barUnit/2
              console.log(this.timeBar,'2222222222222222222');
              console.log(this.timeBarX,this.timeBarY);
              this.timeBar.position = new Vec3(this.timeBarX, this.timeBarY, 0);
              this.timeBar.getComponent(UITransform).width = this.timeBar.getComponent(UITransform).width + this.barUnit
            }if (this.sec===0) {
              clearInterval(this.timer); // 清除定时器
              panel.result = false
              panel.playResult()
            }
          }, 1000);
        }

    pauseGame(){
        PhysicsSystem2D.instance.enable = !PhysicsSystem2D.instance.enable;
        if (PhysicsSystem2D.instance.enable) {
            this.gameCountDown()
        }
    }

    onLeftButtonClick() {
        const transform = this.getComponent(UITransform);
        const canvasWidth = transform.width
        const paddleWidth = this.paddle.getComponent(UITransform).width
        // 处理左按钮点击事件，将滑板向左移动
        const currentPosition = this.paddle.position;
        const borderMin =  -(canvasWidth/2 - paddleWidth/2)
        if (this.paddle) {
            this.paddle.setPosition(new Vec3(currentPosition.x - this.splace, currentPosition.y, currentPosition.z));
            if (currentPosition.x < borderMin) {
                this.paddle.setPosition(new Vec3(borderMin, currentPosition.y, currentPosition.z));
               }
         }
    }
    onRightButtonClick() {
        const transform = this.getComponent(UITransform);
        const canvasWidth = transform.width
        const paddleWidth = this.paddle.getComponent(UITransform).width
        
        // 处理右按钮点击事件，将滑板向右移动
        const currentPosition = this.paddle.position;
        const borderMax =  canvasWidth/2 - paddleWidth/2
        if (this.paddle) {
            this.paddle.setPosition(new Vec3(currentPosition.x + this.splace, currentPosition.y, currentPosition.z));
            if (currentPosition.x > borderMax) {
                this.paddle.setPosition(new Vec3(borderMax, currentPosition.y, currentPosition.z));
               }
         }
    }
    


}

