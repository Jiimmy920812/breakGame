import { _decorator, Component, Event, Node, Slider, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass("Btn_slider")
export class Btn_slider extends Component {

    onLoad () {
        const sliderEventHandler = new EventHandler();
        // 这个 node 节点是事件处理脚本组件所属的节点
        sliderEventHandler.target = this.node; 
        // 这个是脚本类名
        sliderEventHandler.component = 'Btn_slider';
        sliderEventHandler.handler = 'callback';
        sliderEventHandler.customEventData = 'foobar';

        const slider = this.node.getComponent(Slider);
        slider!.slideEvents.push(sliderEventHandler);
    }

    callback(slider: Slider, customEventData: string) {
    
      
    
    }
}