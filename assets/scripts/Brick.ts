import { _decorator, Component,SpriteFrame ,instantiate, Prefab,SpriteComponent,Button} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Brick')
export class Brick extends Component {

    @property({type: Prefab})
    public prefab: Prefab|null = null;
 
    // 在Inspector中分配不同状态下的纹理
    @property({type: SpriteFrame})
    BrickTexture: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    PrizeTexture: SpriteFrame|null = null;

    private isConditionMet: boolean = false;

    onLoad() {
       // 注册按钮的点击事件
       const button = this.node.getComponent(Button);
       if (button) {
           button.node.on('click', this.onClickButton, this);
       }
    }
    onClickButton() {
        // 根据条件更改isConditionMet的值
        this.isConditionMet = !this.isConditionMet;

        // 获取Prefab实例
        const prefabInstance = instantiate(this.prefab);

        // 获取Prefab实例上的Sprite组件
        const sprite = prefabInstance.getComponent(SpriteComponent);

        // 根据条件设置不同的纹理
        if (this.isConditionMet) {
            sprite.spriteFrame = this.BrickTexture;
        } else {
            sprite.spriteFrame = this.PrizeTexture;
        }

        // 将Prefab实例添加到场景中
        this.node.addChild(prefabInstance);
    }
    start() {
        // 在這裡可以添加其他初始化程式碼
    }
    update(dt: number): void {
        // 在這裡可以添加更新邏輯
    }
}