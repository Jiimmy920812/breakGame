import { _decorator, Component, Node, AudioSource, assert,EventHandler,Slider,Event,sys, ProgressBar,SpriteFrame,SpriteComponent, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("BgAudio")
export class BgAudio extends Component { 


  @property(AudioSource)
  public _audioSource: AudioSource = null!;
  
  public volume:number=1

  @property({type: SpriteFrame})
    Slider_on_bg: SpriteFrame|null = null;

  @property({type: SpriteFrame})
    Slider_off_bg: SpriteFrame|null = null;  

  @property(Slider)
    slider: Slider | null = null;
    
    userData=null

  onLoad () {
    this.userData = JSON.parse(sys.localStorage.getItem('profiles'));  
    this.slider!.node.on('slide', this.callback, this);
    // 获取 AudioSource 组件
      const audioSource = this.node.getComponent(AudioSource)!;
      // 检查是否含有 AudioSource，如果没有，则输出错误消息
      assert(audioSource);
      // 将组件赋到全局变量 _audioSource 中
      this._audioSource = audioSource;

      //設定初始音樂
      if (this.userData.Bg_volume===undefined ) {
        this.userData.Bg_volume = this.volume
        this._audioSource.volume = this.volume
        this.slider.getComponent(Slider).progress = this.volume
      }else{
        this._audioSource.volume = this.userData.Bg_volume
        this.slider.getComponent(Slider).progress = this.userData.Bg_volume
      }

       const SliderBgUI =  this.slider.getComponent(SpriteComponent) 
      if (SliderBgUI) {
        if (this.userData.Bg_volume>=0.5) {
          SliderBgUI.spriteFrame = this.Slider_on_bg
        }else if(this.userData.Bg_volume<0.5){
          SliderBgUI.spriteFrame = this.Slider_off_bg
        }
      }
      
      
      sys.localStorage.setItem('profiles', JSON.stringify(this.userData));
    }


  play () {
      // 播放音乐
      this._audioSource.play();
  }

  pause () {
      // 暂停音乐
      this._audioSource.pause();
  }
  callback(slider: Slider, customEventData: string) {
      const userData =  JSON.parse(sys.localStorage.getItem('profiles')); 
      userData.Bg_volume =  slider.progress
      this._audioSource.volume = slider.progress

      const SliderBgUI =  this.slider.getComponent(SpriteComponent) 
      if (SliderBgUI) {
        if (slider.progress>=0.5) {
          SliderBgUI.spriteFrame = this.Slider_on_bg
        }else if(slider.progress<0.5){
          SliderBgUI.spriteFrame= this.Slider_off_bg
        }
      }
      
      sys.localStorage.setItem('profiles', JSON.stringify(userData));
  }
 
}