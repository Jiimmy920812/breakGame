import { _decorator, Component, Node,Prefab,instantiate,Label ,sys,SpriteComponent,SpriteFrame} from 'cc';
import { client } from "./util/tRPC_Server";
const { ccclass, property } = _decorator;

@ccclass('List')
export class List extends Component {
    
    @property({type: Prefab})
    public otherPrefab: Prefab|null = null;

     
    @property({type: Prefab})
    public personPrefab: Prefab|null = null;

    @property({type: SpriteFrame})
    lv1: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    lv2: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    lv3: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    lv_none: SpriteFrame|null = null;

   scoreBoardList = null
   userData = null
   
   async start() {
       this.userData = JSON.parse(sys.localStorage.getItem('profiles'));   
       this.scoreBoardList = await client.scoreboard.get.query({size: 20, order_by:"DESC"})
        this. createList()
    }
    createList(){
        const parentNode = new Node()
        this.node.addChild(parentNode)
        
        let listNode = null;
       
       
        for (let i = 0; i < this.scoreBoardList.list.length; i++) {
             // 創建一個矩形節點
            const obj = this.scoreBoardList.list[i]
             if (obj.name===this.userData.name) {
                listNode = instantiate(this.personPrefab);
             }else{
                listNode = instantiate(this.otherPrefab);
             }

           
             
             //寫入rank
             const rankNumUI = listNode.getChildByName('rank').getChildByName('rankNum') 
             const rankNumBg = listNode.getChildByName('rank').getComponent(SpriteComponent)
             const rank = i+1
             rankNumUI.getComponent(Label).string = rank
             


             console.log(this.otherPrefab,'perhabs');
             console.log(rankNumBg.spriteFrame  ,'rankNumBg');
             
             
             
             if (rank===1) rankNumBg.spriteFrame = this.lv1
             else if (rank===2) rankNumBg.spriteFrame = this.lv2
             else if (rank===3) rankNumBg.spriteFrame = this.lv3
             else{
                rankNumBg.spriteFrame = this.lv_none
             }


             //寫入time跟name
             const nameUI = listNode.getChildByName('bg').getChildByName('name').getComponent(Label); 
             const timeUI = listNode.getChildByName('bg').getChildByName('time').getComponent(Label); 
             nameUI.string = obj.name
             timeUI.string =`00:${obj.record}`
             const xPos =0;
             const yPos = -35-50*i;
             listNode.setPosition(xPos, yPos);
             parentNode.addChild(listNode);
        }


    }

    createPerson(){
        
    }


    update(deltaTime: number) {
        
    }
}


