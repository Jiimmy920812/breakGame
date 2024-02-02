import { _decorator, Component, AudioSource, AudioClip, AudioSourceComponent,Slider } from 'cc';
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

    @property(Slider)
    slider: Slider | null = null;

    
    music = null
    audiolists = null
    volume = null

    onLoad () {
      this.slider!.node.on('slide', this.controlVolume, this); 
      
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

    controlVolume(slider: Slider){
      this.volume = slider.progress
      console.log( this.volume,'1111');
      
    }

    play(name: string, times?: number) {
      if (!name) return;
      
      this.music = this.node.addComponent(AudioSourceComponent);
      
      
      if (this.audiolists[name]) {
        this.music.clip = this.audiolists[name];
       if (this.volume!==null)  this.music._volume = this.volume;
      } else {
          console.error(`未找到名為 ${name} 的音頻片段。`);
          return;
      }
  
     if (times!==null) {
      this.music.playOneShot(this.music.clip, times);
     }else{
      this.music.play()
     }

    }
    
}