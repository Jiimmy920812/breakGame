import { _decorator, Component, Node, Button, Vec3 ,UITransform, Label, PhysicsSystem2D,Input,SpriteFrame,SpriteComponent} from 'cc';
import { Ball } from './Ball'
import {BrickLayout} from './BrickLayout'

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
  

    @property(Node)
    private touchBg:Node = null;
   

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
    

    @property(Node)
    private timeBarNum: Node | null = null;
    private min: number = 1;
    private sec: number = 0;


    
    onLoad() {
        //取得倒數記數
        const timeNum =  this.timeBarNum.getComponent(Label)
        this.sec =  this.min *60
        timeNum.string = `01:00`;
      

        const timeBar = this.timeBar.getComponent(UITransform);
        this.barUnit = timeBar.width/this.sec 
        console.log(this.barUnit,'unit');
        

        //初始長條
        this.timeBar.getComponent(UITransform).width = this.barUnit
        this.timeBar.position = new Vec3(this.timeBarX, this.timeBarY, 0);
       
        PhysicsSystem2D.instance.enable = true;
        if (this.touchBg) {
            this.touchBg.on(Input.EventType.TOUCH_START, this.closeStartPanel, this);   
                }
        if (this.leftBtn) {
            this.leftBtn.node.on('click', this.onLeftButtonClick, this);
        }
        if (this.rightBtn) {
            this.rightBtn.node.on('click', this.onRightButtonClick, this);
        }
        if (this.pauseBtn) {
            this.pauseBtn.node.on('click', this.pauseGame, this);
        }
    }
    closeStartPanel(){
       this.startPanel.active = false
       this.touchBg.active=false
       this.startPlay()
    }

    startPlay(){
        const ball = this.ball.getComponent(Ball)
        const layout = this.BrickLayout.getComponent(BrickLayout)
        const sprite = this.countDown.getComponent(SpriteComponent);
        let count = 3
        const timer = setInterval(() => {
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
        
        const timer = setInterval(() => {
            if (this.sec > 1&& PhysicsSystem2D.instance.enable) {
              this.sec--;
            if (this.sec<10) {
                timeNum.string = `00:0${this.sec}`;
            }else{
                timeNum.string = `00:${this.sec}`;
            }
              this.timeBarX = this.timeBarX + this.barUnit/2
              this.timeBar.position = new Vec3(this.timeBarX, this.timeBarY, 0);
              console.log(this.timeBar.position,'位置');
              this.timeBar.getComponent(UITransform).width = this.timeBar.getComponent(UITransform).width + this.barUnit
            } else {
              clearInterval(timer); // 清除定时器
             console.log('你輸了');
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

