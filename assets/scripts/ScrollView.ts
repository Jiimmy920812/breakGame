import { _decorator, Component, Node,Prefab,instantiate,Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('List')
export class List extends Component {
    
    @property({type: Prefab})
    public otherPrefab: Prefab|null = null;

     
    @property({type: Prefab})
    public personPrefab: Prefab|null = null;


    list = [
        {name:'erq',time:'00:10'},
        {name:'a',time:'00:15'},
        {name:'jimmy',time:'00:23'},
        {name:'c',time:'00:28'},
        {name:'3441',time:'00:30'},
        {name:'e',time:'00:35'},
        {name:'f',time:'00:36'},
        {name:'g',time:'00:38'},
        {name:'h',time:'00:40'},
        {name:'i',time:'00:41'},
        {name:'hh',time:'00:44'},
        {name:'er',time:'00:56'},
        {name:'aff',time:'00:56'},
        {name:'bbb',time:'00:56'},
        {name:'ccc',time:'00:57'},
        {name:'eee',time:'00:58'},
        {name:'qqq',time:'00:59'},
        {name:'afafsf',time:'00:59'},
        {name:'qewqe',time:'00:59'},
        {name:'rrrrf',time:'00:59'},
    ];
    list_person = {name:'jimmy',time:'00:23'};
  
    
    start() {
        this. createList()
    }
    createList(){
        const parentNode = new Node()
        this.node.addChild(parentNode)
        
        let listNode = null;
        for (let i = 0; i < this.list.length; i++) {
             // 創建一個矩形節點
             if (this.list[i].name===this.list_person.name) {
                listNode = instantiate(this.personPrefab);
             }else{
                listNode = instantiate(this.otherPrefab);
             }
            
             //寫入rank
             const rankNumUI = listNode.getChildByName('rank').getChildByName('rankNum').getComponent(Label); 
             rankNumUI.string = i+1
             
             //寫入time跟name
             const nameUI = listNode.getChildByName('bg').getChildByName('name').getComponent(Label); 
             const timeUI = listNode.getChildByName('bg').getChildByName('time').getComponent(Label); 
             nameUI.string = this.list[i].name
             timeUI.string = this.list[i].time
             
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


