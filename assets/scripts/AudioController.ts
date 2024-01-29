import { _decorator, Component, Node, AudioSource, assert,AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component { 



    @property(AudioSource)
    public audioSource: AudioSource = null!;

    @property(AudioClip)
    public bg: AudioClip = null!; 

    @property(AudioClip)
    public countDown: AudioClip = null!; 

    @property(AudioClip)
    public hitBall: AudioClip = null!; 

    @property(AudioClip)
    public hitBrick: AudioClip = null!; 
   
    @property(AudioClip)
    public loser: AudioClip = null!; 
   
    @property(AudioClip)
    public pauseMusic: AudioClip = null!; 
   
    @property(AudioClip)
    public popUp: AudioClip = null!; 
    
    @property(AudioClip)
    public winner: AudioClip = null!; 
    
    audiolists = null

    onLoad () {
      this.audiolists = {
            bg: this.bg,
            countDown: this.countDown,
            hitBall: this.hitBall,
            hitBrick: this.hitBrick,
            loser: this.loser,
            pauseMusic: this.pauseMusic,
            popUp: this.popUp,
            winner: this.winner,
          };
    }
    play (name:string,times?:number) {
         // 获取 AudioSource 组件
         const audioSource = this.node.getComponent(AudioSource);
         if (name === null) return
         if (this.audiolists.hasOwnProperty(name)) {
            audioSource.clip = this.audiolists[name];
          } else {
            // 可能的錯誤處理或默認行為
            console.error('未找到名為 ' + name + ' 的音頻片段。');
          }
         // 检查是否含有 AudioSource，如果没有，则输出错误消息
         assert(audioSource);
         // 将组件赋到全局变量 _audioSource 中
         this.audioSource = audioSource;
        // 播放音乐
        if (times) {
            this.audioSource.playOneShot(audioSource.clip,1);
        }else{
            this.audioSource.play();
        }
    }

    pause (name:string) {
        // 获取 AudioSource 组件
        const audioSource = this.node.getComponent(AudioSource);
        if (name === null) return
        if (this.audiolists.hasOwnProperty(name)) {
           audioSource.clip = this.audiolists[name];
         } else {
           // 可能的錯誤處理或默認行為
           console.error('未找到名為 ' + name + ' 的音頻片段。');
         }
        // 检查是否含有 AudioSource，如果没有，则输出错误消息
        assert(audioSource);
        // 将组件赋到全局变量 _audioSource 中
        this.audioSource = audioSource;
       // 播放音乐
        this.audioSource.pause();
    }
}