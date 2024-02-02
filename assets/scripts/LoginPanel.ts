import { _decorator, Component, Node,Input,Button, EditBox,sys,Director} from 'cc';
import DataControlPanel from './DataControlPanel';
import { client } from "./util/tRPC_Server";



const { ccclass, property } = _decorator;
@ccclass('OverPanel')
export class OverPanel extends Component {


    @property(Button)
    btn_ok: Button | null = null;
    
    @property({type: EditBox})
    editbox: EditBox|null = null;
   
    profiles = null 

    clickInProgress = false

    async start(){
      DataControlPanel.init()
      this.profiles = await client.users.generateAccount.query();

    }
    onLoad() {
        if (this.btn_ok) {
          this.btn_ok.node.on(Input.EventType.TOUCH_START, () => {
              if (this.clickInProgress) {
                  return;
              }
              this.clickInProgress = true;
              this.postInfo();
              setTimeout(() => {
                  this.clickInProgress = false;
              }, 1000); 
          }, this);
      }
    }

   async postInfo(){
   let updateResult = null
    if (this.editbox.string==='') {
        updateResult = await client.users.update
        .mutate({
          userId:  this.profiles.userId,
          name:  this.profiles.name,
        })
    }else{
         updateResult = await client.users.update
        .mutate({
          userId:  this.profiles.userId,
          name:  this.editbox.string,
        })
    }
      const personData = 
      {
        userId:  updateResult.userId,
        name:  updateResult.name,
        level:1
      }
       sys.localStorage.setItem('profiles', JSON.stringify(personData));

       setTimeout(() => {
        Director.instance.loadScene('game');
      }, 1000)   
    
    }


    update(deltaTime: number) {
    }
}


