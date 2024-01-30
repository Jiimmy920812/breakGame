import { _decorator, Component, AudioSource, AudioClip, AudioSourceComponent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("AudioController")
export class AudioController extends Component { 
    @property(AudioSourceComponent)
    public audioSource: AudioSourceComponent = null!;

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
    
    @property(AudioClip)
    public paddle: AudioClip = null!; 
    
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

    play(name: string, times?: number) {
      if (!name) return;
  
      const audioSource = this.node.addComponent(AudioSourceComponent);
      
      if (this.audiolists[name]) {
          audioSource.clip = this.audiolists[name];
      } else {
          console.error(`未找到名為 ${name} 的音頻片段。`);
          return;
      }
  
     if (times!==null) {
       audioSource.playOneShot(audioSource.clip, times);
     }else{
       audioSource.play()
     }

    }
    
 
}