import { _decorator, Component, Node ,instantiate,Prefab,Label,Button,Input,Director,sys} from 'cc';
import { client } from "./util/tRPC_Server";
const { ccclass, property } = _decorator;

@ccclass('list')
export class list extends Component {
    
    @property({type: Prefab})
    public personPrefab: Prefab|null = null;
    
    @property(Button)
    private gameBtn: Button | null = null;

    scoreBoardList = null
    userData = null

    clickInProgress = false
    
    async start() {
        this.userData= JSON.parse(sys.localStorage.getItem('profiles'));  
        this.scoreBoardList = await client.scoreboard.get.query({size:999, order_by:"DESC"})
        
        const personObj =  this.scoreBoardList.list.find((obj)=>obj.name===this.userData.name)
        const personIndex =  this.scoreBoardList.list.findIndex((obj)=>obj.name===this.userData.name)

        if (this.gameBtn) {
            this.gameBtn.node.on(Input.EventType.TOUCH_START, () => {
                if (this.clickInProgress) {
                    return;
                }
                this.clickInProgress = true;
                this.closeList();
                setTimeout(() => {
                    this.clickInProgress = false;
                }, 1000); 
            }, this);
        }
        
       
        const parentNode = new Node()
        this.node.addChild(parentNode)
        
        let listNode = null;
        listNode = instantiate(this.personPrefab);

           //寫入rank
           const rankNumUI = listNode.getChildByName('rank').getChildByName('rankNum').getComponent(Label); 
           rankNumUI.string = personIndex+1
           
        //    //寫入time跟name
           const nameUI = listNode.getChildByName('bg').getChildByName('name').getComponent(Label); 
           const timeUI = listNode.getChildByName('bg').getChildByName('time').getComponent(Label); 
           nameUI.string = personObj.name
           timeUI.string =`00:${personObj.record}`

           
           const xPos =0;
           const yPos = -197;
           listNode.setPosition(xPos, yPos);
           parentNode.addChild(listNode);
    }
    closeList(){
        setTimeout(() => {
          Director.instance.loadScene('game');
      }, 1000)
      }

    update(deltaTime: number) {
        
    }
}


