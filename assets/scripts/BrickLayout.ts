import { _decorator, Component, instantiate, Node, Prefab,SpriteFrame,SpriteComponent,UITransform,Collider2D,Animation } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BrickLayout')
export class BrickLayout extends Component {

    @property({type: Prefab})
    public brickPrefab: Prefab|null = null;

  


    private numRows: number = 5;
    private numCols: number = 7;


    // 在Inspector中分配不同紋理
    @property({type: SpriteFrame})
    BrickTexture: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    BrickTexture_2: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    BrickTexture_3: SpriteFrame|null = null;

    @property({type: SpriteFrame})
    PrizeTexture: SpriteFrame|null = null;

    
    onLoad() {
      
    }
    generateRandomArray(length:number, countA:number, countB:number) {
        const array = [];

        for (let i = 0; i < length; i++) {
            let value;
            if (countA > 0) {
                value = 3;
                countA--;
            } else if (countB > 0) {
                value = 2;
                countB--;
            } else {
                value = 1;
            }
            array.push(value);
        }

        // 随机打乱数组
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    generateRectArray() {
        if (!this.brickPrefab) {
            return;
        }
        const numRows = this.numRows; // 行数
        const numCols = this.numCols; // 列数
    
        const totalRectangles = numRows * numCols;
    
        // 取得父節點，用於放置生成的矩形
        const parentNode = new Node();
        this.node.addChild(parentNode);
    
        let rectNode: Node | null = null;
    
        // 随机选择一个矩形作为 PrizeTexture
        const prizeTextureIndex = Math.floor(Math.random() * totalRectangles);

        
    
        for (let i = 0; i < totalRectangles; i++) {
            // 創建一個矩形節點
            rectNode = instantiate(this.brickPrefab);
    
            // 設定矩形的位置
            const col = i % numCols;
            const row = Math.floor(i / numCols);
            const transform = rectNode.getComponent(UITransform);
            const xPos = col * transform.width;
            const yPos = row * transform.height;
            rectNode.setPosition(xPos, yPos,);
            
    
            // 將矩形節點添加到父節點
            parentNode.addChild(rectNode);
    
            // 获取Sprite组件
            const sprite = rectNode.getComponent(SpriteComponent);
            if (sprite) {
                // 根据索引设置不同的纹理
                if (i === prizeTextureIndex) {
                    sprite.spriteFrame = this.PrizeTexture;
                    const animate =  sprite.getComponent(Animation)
                    console.log(animate,'sprite_layout');
                    
                    animate.play('twinkle');
                    // 设置Collider2D的tag为6
                    const collider = rectNode.getComponent(Collider2D);
                    if (collider) {
                        collider.tag = 6;
                    }
                } else {
                    sprite.spriteFrame = this.BrickTexture;
                }
            }
        }
    }

    generateRectArray_level_2(){
        if (!this.brickPrefab) {
            return;
        }
        const numRows = this.numRows; // 行数
        const numCols = this.numCols; // 列数

        const arrayA = [
            1, 2, 3, 3, 3, 2, 1,
            1, 2, 3, 0, 3, 2, 1,
            1, 2, 3, 3, 3, 2, 1
        ];

        const lengthArray =  numRows * numCols;
        const times_3 = 3;
        const times_2 = 2;
        const arrayB = this.generateRandomArray(lengthArray, times_3, times_2);

        const mergedArray = arrayB.concat(arrayA);

        const totalRectangles = mergedArray.length;
        // 取得父節點，用於放置生成的矩形
        const parentNode = new Node();
        this.node.addChild(parentNode);

        let rectNode: Node | null = null;

        
        for (let i = 0; i < totalRectangles; i++) {
            // 創建一個矩形節點
            rectNode = instantiate(this.brickPrefab);
            // 設定矩形的位置
            const col = i % numCols;
            const row = Math.floor(i / numCols);
            const transform = rectNode.getComponent(UITransform);
            const xPos = col * transform.width;
            const yPos = row * transform.height - 50;
            rectNode.setPosition(xPos, yPos,);
            
             // 將矩形節點添加到父節點
             parentNode.addChild(rectNode);
             const type = mergedArray[i]
             const sprite = rectNode.getComponent(SpriteComponent);
             const collider = rectNode.getComponent(Collider2D);
             if (sprite) {
                if (type === 0) {
                    sprite.spriteFrame = this.PrizeTexture;
                    const animate =  sprite.getComponent(Animation)
                    animate.play('twinkle');
                    collider.tag = 6;
                }else if (type === 3) {
                    sprite.spriteFrame = this.BrickTexture_3;
                }else if (type === 2) {
                    sprite.spriteFrame = this.BrickTexture_2;
                } 
                else {
                    sprite.spriteFrame = this.BrickTexture;
                }
            }
        }

    }


    start() {
        // 在這裡可以添加其他初始化程式碼
    }
    update(dt: number): void {
        // 在這裡可以添加更新邏輯
    }
}