import { _decorator, Component, Node, Button, Vec3 ,UITransform, Label, PhysicsSystem2D} from 'cc';
import { Ball } from './Ball'
import {BrickLayout} from './BrickLayout'

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
  

    @property(Button)
    private BgBtn: Button | null = null;
   

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


    @property(Node)
    private timeBar: Node | null = null;
    public barUnit:number = 0
    

    @property(Node)
    private timeBarNum: Node | null = null;


    
    onLoad() {
        //取得倒數記數
        const timeBarNum60 =  this.timeBarNum.getComponent(Label)
        let count = parseInt(timeBarNum60.string)
        //取得容器寬
        const transform = this.getComponent(UITransform);
        this.barUnit = transform.width/count

        //初始長條
        this.timeBar.getComponent(UITransform).width = this.barUnit
       
       
        PhysicsSystem2D.instance.enable = true;
        if (this.BgBtn) {
                    this.BgBtn.node.on('click', this.closeStartPanel, this);
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
       this.startPlay()
    }

    startPlay(){
        const ball = this.ball.getComponent(Ball)
        const layout = this.BrickLayout.getComponent(BrickLayout)
        const countDownNum = this.countDown.getComponent(Label);
        let count = parseInt(countDownNum.string);
        const timer = setInterval(() => {
            if (count > 1) {
              count--;
              countDownNum.string = count.toString();
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
        const timeBarNum60 =  this.timeBarNum.getComponent(Label)
        let count = parseInt(timeBarNum60.string)
       
        const timer = setInterval(() => {
            if (count > 1&& PhysicsSystem2D.instance.enable) {
              count--;
              timeBarNum60.string = count.toString();
              this.timeBar.getComponent(UITransform).width = this.timeBar.getComponent(UITransform).width + this.barUnit*2
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

