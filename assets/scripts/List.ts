import { _decorator, Component, Node ,instantiate,Prefab,Label,Button,Input,Director} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('list')
export class list extends Component {
    
    @property({type: Prefab})
    public personPrefab: Prefab|null = null;
    
    @property(Button)
    private gameBtn: Button | null = null;


    list_person = {name:'jimmy',time:'00:23',order:3};
    
    start() {
        if (this.gameBtn) {
            this.gameBtn.node.on(Input.EventType.TOUCH_START, this.closeList, this);   
                }
       
        const parentNode = new Node()
        this.node.addChild(parentNode)
        
        let listNode = null;
        listNode = instantiate(this.personPrefab);

           //寫入rank
           const rankNumUI = listNode.getChildByName('rank').getChildByName('rankNum').getComponent(Label); 
           rankNumUI.string = this.list_person.order
           
           //寫入time跟name
           const nameUI = listNode.getChildByName('bg').getChildByName('name').getComponent(Label); 
           const timeUI = listNode.getChildByName('bg').getChildByName('time').getComponent(Label); 
           nameUI.string = this.list_person.name
           timeUI.string =this.list_person.time
           
           const xPos =0;
           const yPos = -197;
           listNode.setPosition(xPos, yPos);
           parentNode.addChild(listNode);
    }
    closeList(){
        // this.node.active = false
        setTimeout(() => {
          Director.instance.loadScene('game');
      }, 1000)
      }

    update(deltaTime: number) {
        
    }
}


