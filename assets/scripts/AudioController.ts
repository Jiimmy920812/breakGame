import { _decorator, Component, AudioSource, AudioClip, AudioSourceComponent,Slider,sys,SpriteComponent,SpriteFrame } from 'cc';
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

    @property({type: SpriteFrame})
    Slider_on_bg: SpriteFrame|null = null;

    @property({type: SpriteFrame})
      Slider_off_bg: SpriteFrame|null = null;  


    public volume:number=1
    
    music = null
    audiolists = null
    userData=null

    onLoad () {
      this.userData = JSON.parse(sys.localStorage.getItem('profiles'));  
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
        if (this.userData.Effect_volume===undefined ) {
          this.userData.Effect_volume = this.volume
          this.slider.getComponent(Slider).progress = this.volume
        }else{
          this.slider.getComponent(Slider).progress = this.userData.Effect_volume
        }


        const SliderBgUI =  this.slider.getComponent(SpriteComponent) 
        if (SliderBgUI) {
          if (this.userData.Effect_volume>=0.5) {
            SliderBgUI.spriteFrame = this.Slider_on_bg
          }else if(this.userData.Effect_volume<0.5){
            SliderBgUI.spriteFrame = this.Slider_off_bg
          }
        }
  

        sys.localStorage.setItem('profiles', JSON.stringify(this.userData));
    }

    controlVolume(slider: Slider){
      const userData =  JSON.parse(sys.localStorage.getItem('profiles')); 
      this.volume = slider.progress
      userData.Effect_volume = slider.progress

      const SliderBgUI =  this.slider.getComponent(SpriteComponent) 
      if (SliderBgUI) {
        if (userData.Effect_volume>0.5) {
          this.slider.getComponent(SpriteComponent).spriteFrame = this.Slider_on_bg
        }else{
          this.slider.getComponent(SpriteComponent).spriteFrame = this.Slider_off_bg
        }
      }

      sys.localStorage.setItem('profiles', JSON.stringify(userData));
    }

    play(name: string, times?: number) {
      const userData =  JSON.parse(sys.localStorage.getItem('profiles')); 
      if (!name) return;
      this.music = this.node.addComponent(AudioSourceComponent);
      
      if (this.audiolists[name]) {
        this.music.clip = this.audiolists[name];
       if (this.volume!==null)  this.music._volume = userData.Effect_volume;
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