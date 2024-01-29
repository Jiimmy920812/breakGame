import { _decorator, Component, Node,SpriteFrame,Input,SpriteComponent,PhysicsSystem2D,Director,Animation,sys, Label,Button} from 'cc';
import {timeBar} from "./TimeBar" 
import { client } from "./util/tRPC_Server";
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;
@ccclass('OverPanel')
export class OverPanel extends Component {



    @property(Node)
    private grayBg:Node = null;

    @property(Node)
    private timeBarNode:Node = null;

    @property(Button)
    private gameBtn: Button | null = null;

    @property(Button)
    private checkBtn: Button | null = null;

    public result:boolean = false;

    @property(Node)
    private audioController: Node | null = null;
  
    @property({type: SpriteFrame})
    victory_Bg: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    fail_Bg: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    victory_context: SpriteFrame|null = null;
    
    @property({type: SpriteFrame})
    fail_context: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    victory_1: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    fail_1: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    victory_2: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    fail_2: SpriteFrame|null = null;


    start() {
      //結束面板初始化
    this.node.active = false
    if (this.gameBtn) {
    this.gameBtn.node.on(Input.EventType.TOUCH_START, this.closeOverPanel, this);   
        }
    if (this.checkBtn) {
      this.checkBtn.node.on(Input.EventType.TOUCH_START, this.checkList, this);   
          }

    }
    playResult(){
        
        this.grayBg.active = true  
        this.node.active = true
        const animate = this.node.getComponent(Animation);
        const bg = this.node.getChildByName("Bg")
        const context = this.node.getChildByName("Context")
        const title = this.node.getChildByName("Title")
        const gameBtn = this.node.getChildByName("GameBtn").getChildByName("Label")
        const name = this.node.getChildByName("Name")
        const time = context.getChildByName("Time")
       
        const bg_sprite = bg.getComponent(SpriteComponent);
        const context_sprite = context.getComponent(SpriteComponent);
        const title_sprite = title.getComponent(SpriteComponent);
        const nameSprite = name.getComponent(Label);
        const timeSprite = time.getComponent(Label);
        const gameBtnSprite = gameBtn.getComponent(Label);
        
   
        
        const timebar = this.timeBarNode.getComponent(timeBar)
        //讀取資料
        const  userData = JSON.parse(sys.localStorage.getItem('profiles'));   

        //寫入名字及結果時間
        const timeUI = timebar.node.getChildByName('countText').getComponent(Label)
        let overTime = ` ${timeUI.string}`
        nameSprite.string =  userData.name
        timeSprite.string =  overTime
        
        
        //時間取秒數
        let lastTwoDigits = parseInt(overTime.slice(-2), 10)
        userData.score = lastTwoDigits
        
        //開啟gameBtn/關閉查看checkBtn
        this.gameBtn.node.active = true
        this.checkBtn.node.active = false
      
       
        //關閉背景音樂
        const audioController = this.audioController.getComponent(AudioController)
        audioController.pause('bg')
        //設定結果面板
        if (this.result) {
          //勝利音樂
          audioController.play('winner',1)
          //設定樣式
          bg_sprite.spriteFrame = this.victory_Bg
          context_sprite.spriteFrame = this.victory_context
          if (userData.level===1) {
          title_sprite.spriteFrame = this.victory_1
          gameBtnSprite.string = '往下一關'
          userData.level++
         }else if (userData.level===2) {
          this.gameBtn.node.active = false
          this.checkBtn.node.active = true
          title_sprite.spriteFrame = this.victory_2
          gameBtnSprite.string = '查看排行'
          userData.level = 1
          //後端更新資料
          client.scoreboard.update.mutate({ userId:userData.userId , score: String(lastTwoDigits) })
         }
        }else{
          //失敗音樂
          audioController.play('loser',1)
          bg_sprite.spriteFrame = this.fail_Bg
          context_sprite.spriteFrame = this.fail_context
          gameBtnSprite.string = '再玩一次'
          if (userData.level===1) {
            title_sprite.spriteFrame = this.fail_1
          }if (userData.level===2) {
            title_sprite.spriteFrame = this.fail_2
          }
          userData.level = 1
        }
        //儲存資料
        sys.localStorage.setItem('profiles', JSON.stringify(userData));
        //暫停遊戲
        PhysicsSystem2D.instance.enable = false;
        //執行動畫
        animate.play('result');
      }
      
      checkList(){
        console.log('checkList');
        setTimeout(() => {
          Director.instance.loadScene('rankList');
      }, 1000)
      }
      closeOverPanel(){
        setTimeout(() => {
          Director.instance.loadScene('game');
      }, 1000)
      }
    update(deltaTime: number) {
    }
}


