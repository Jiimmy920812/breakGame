import { _decorator, Component, Node ,instantiate,Prefab,Label} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ListPersonal')
export class ListPersonal extends Component {
    
    @property({type: Prefab})
    public personPrefab: Prefab|null = null;
    
    
    list_person = {name:'jimmy',time:'00:23',order:3};
    
    start() {
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

    update(deltaTime: number) {
        
    }
}


