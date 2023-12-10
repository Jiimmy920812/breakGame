import { _decorator, Component, Node,Input,Button, EditBox,sys} from 'cc';




const { ccclass, property } = _decorator;
@ccclass('OverPanel')
export class OverPanel extends Component {

    @property(Node)
    private touchStartBg: Node | null = null;

    @property(Node)
    private startPanel: Node | null = null;

    @property(Node)
    private countNum: Node | null = null;

    @property(Button)
    btn_ok: Button | null = null;
    
    @property({type: EditBox})
    editbox: EditBox|null = null;
   
    userData = {
      name: '',
      level: 1,
    };

    

    onLoad() {
        this.startPanel.active = false
        this.countNum.active = false
        this.btn_ok.node.on(Button.EventType.CLICK, this.postInfo, this);
         //讀取資料
         const  userData = JSON.parse(sys.localStorage.getItem('userData'));
         if (userData === null) this.node.active = true
         else{
            this.node.active = false
            this.startPanel.active = true
            this.touchStartBg.active = true
            this.countNum.active = true
         }
    }

    postInfo(){
       if (this.editbox.string==='') return
       this.userData.name = this.editbox.string;
       sys.localStorage.setItem('userData', JSON.stringify(this.userData));
       this.editbox.string = '';
       this.node.active = false
       this.startPanel.active = true
       this.touchStartBg.active = true
       this.countNum.active = true
    }


    update(deltaTime: number) {
    }
}


