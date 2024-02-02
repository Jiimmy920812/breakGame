import { _decorator, Component, Node, AudioSource, assert,EventHandler,Slider,Event } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("BgAudio")
export class BgAudio extends Component { 


  @property(AudioSource)
  public _audioSource: AudioSource = null!;
  
  public volume:number=1

  @property(Slider)
    slider: Slider | null = null;


  onLoad () {
   
    this.slider!.node.on('slide', this.callback, this);
    // 获取 AudioSource 组件
      const audioSource = this.node.getComponent(AudioSource)!;
      // 检查是否含有 AudioSource，如果没有，则输出错误消息
      assert(audioSource);
      // 将组件赋到全局变量 _audioSource 中
      this._audioSource = audioSource;
      
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
    this._audioSource.volume = slider.progress
  }
 
}