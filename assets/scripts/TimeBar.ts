import { _decorator, Component,ProgressBar,Label ,PhysicsSystem2D} from 'cc';
const { ccclass, property } = _decorator;



@ccclass('timeBar')
export class timeBar extends Component {
    private GameMSec: number = 60; // 60 seconds in milliseconds
    private CountDownSec : number = 60
    private elapsedMilliseconds: number = 0;
    public isCounting: boolean = false;
    public countEnd : boolean = false;

    start() {
     this.isCounting =false
     this.countEnd = false
    }

    update(deltaTime: number) {
        let countDownStr = ''
        if (this.isCounting &&  PhysicsSystem2D.instance.enable) {
            // Accumulate elapsed milliseconds
            this.elapsedMilliseconds += deltaTime ; // Convert seconds to milliseconds
            
            let progress = 1 - this.elapsedMilliseconds / this.GameMSec;

            // If progress is less than 0, set it to 0 (timer finished)
            if (progress < 0) {
                progress = 0;
                this.isCounting = false;
                this.countEnd = true
            }
            this.getComponent(ProgressBar).progress = progress;
            let countNum = this.CountDownSec - Math.floor(this.elapsedMilliseconds)
            
            if (countNum===60) {
                countDownStr = `01:00`
            }if (countNum<60&&countNum>=10) {
                countDownStr =`00:${countNum}`
            }if (countNum<10) {
                countDownStr = `00:0${countNum}`
            }
            this.node.getChildByName('countText').getComponent(Label).string = countDownStr
        }
    }

   
}
