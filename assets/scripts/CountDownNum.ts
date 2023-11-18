import { _decorator, Component,SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;



@ccclass('countDownNum')
export class countDownNum extends Component {
    private CountDownNum : number = 3
    private elapsedMilliseconds: number = 0;
    public isCounting: boolean = false;
    public countEnd: boolean = false;

    @property({type: SpriteFrame})
    num_2: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    num_1: SpriteFrame|null = null;

    start() {
        this.isCounting =false
        this.countEnd = false
    }
    update(deltaTime: number) {
        if (this.isCounting) {
            this.elapsedMilliseconds += deltaTime ; // Convert seconds to milliseconds
            let countNum = this.CountDownNum - Math.floor(this.elapsedMilliseconds)
            if (countNum ===2) {
                this.getComponent(Sprite).spriteFrame = this.num_2
            }
            if (countNum===1) {
                this.getComponent(Sprite).spriteFrame = this.num_1
            }if(countNum===0){
                this.isCounting = false
                this.countEnd = true
            }
        }
    }
}
