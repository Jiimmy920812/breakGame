import { _decorator, Component, Node, Button, Vec3 ,UITransform,EventTarget} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component {
    @property(Node)
    private paddle: Node | null = null;
    private splace:number = 50;

    @property(Button)
    private BgBtn: Button | null = null;
   
    @property({ type: Node })
    private startNode: any = null
    public  static startGame:boolean = false
    public eventTarget: EventTarget = new EventTarget();

    @property(Button)
    private leftButton: Button | null = null;

    @property(Button)
    private rightButton: Button | null = null;

    
    onLoad() {
        if (this.BgBtn) {
                    this.BgBtn.node.on('click', this.startPlay, this);
                }
        if (this.leftButton) {
            this.leftButton.node.on('click', this.onLeftButtonClick, this);
        }
        if (this.rightButton) {
            this.rightButton.node.on('click', this.onRightButtonClick, this);
        }
    }
    startPlay(){
        if (this.startNode) {
                    this.startNode.active = false;
                    GameControl.startGame = true;
                    this.eventTarget.emit('gameStart',GameControl.startGame);
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

