import { _decorator, Component, Node,Button,PhysicsSystem2D,Director, Input} from 'cc';
const { ccclass, property } = _decorator;
import { AudioController } from './AudioController';

@ccclass('SettingPanel')
export class SettingPanel extends Component {
    
    @property(Button)
    private settingBtn: Button | null = null;


    @property(Button)
    private Btn_reset: Button | null = null;

    @property(Button)
    private Btn_leave: Button | null = null;

    @property(Node)
    private audioController: Node | null = null;


    @property(Node)
    private grayBg: Node | null = null;

    
    audio = null;

    clickInProgress = false

    onLoad() {
        this.node.active = false
        this.audio = this.audioController.getComponent(AudioController)
         //設定Btn
         if (this.settingBtn) {
            this.settingBtn.node.on('click', this.settingPanelOpen, this);
          }

           //設定Btn
         if (this.Btn_reset) {
            this.Btn_reset.node.on('click', this.settingPanelOpen, this);
          }

        if (this.Btn_reset) {
            this.Btn_reset.node.on(Input.EventType.TOUCH_START, () => {
                if (this.clickInProgress) {
                    return;
                }
                this.clickInProgress = true;
                this.reset();
                setTimeout(() => {
                    this.clickInProgress = false;
                }, 1000); 
            }, this);
        }


           //設定Btn
         if (this.Btn_leave) {
            this.Btn_leave.node.on('click', this.settingPanelClose, this);
          }


    }

        settingPanelOpen(){
            if (this.grayBg.active) return
            if (!this.settingBtn.interactable) return
            this.audio.play('pauseMusic',1)
            PhysicsSystem2D.instance.enable = false;
            this.node.active =true
            this.grayBg.active = true
        }
    
        settingPanelClose(){
            PhysicsSystem2D.instance.enable = true;
            this.grayBg.active = false
            this.node.active = false
        }
        reset(){
            setTimeout(() => {
                Director.instance.loadScene('game');
            }, 1000);
        }



        update(deltaTime: number) {
            
        }
}


