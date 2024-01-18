import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('List')
export class List extends Component {
    
    list = [
        {name:'jimmy',time:'00:10'},
        {name:'a',time:'00:15'},
        {name:'b',time:'00:23'},
        {name:'c',time:'00:28'},
        {name:'d',time:'00:30'},
        {name:'e',time:'00:35'},
        {name:'f',time:'00:36'},
        {name:'g',time:'00:38'},
        {name:'h',time:'00:40'},
        {name:'i',time:'00:41'},
        {name:'hh',time:'00:44'},
        {name:'er',time:'00:56'},
        {name:'aff',time:'00:56'},
        {name:'bbb',time:'00:56'},
        {name:'ccc',time:'00:57'},
        {name:'eee',time:'00:58'},
        {name:'qqq',time:'00:59'},
        {name:'afafsf',time:'00:59'},
        {name:'qewqe',time:'00:59'},
        {name:'rrrrf',time:'00:59'},
    ];
    list_person:{name:'jimmy',time:'00:23'};
  
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}


