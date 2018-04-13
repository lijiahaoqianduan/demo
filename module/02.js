// import {a, fn} from './01.js';
// console.log(a)
// fn();

// 导入的时候也可以对变量重命名
// import {m1 as m,n1} from './01.js';
// console.log(m,n1)

// import * as obj from './01.js';
// console.log(obj.m1)
// console.log(obj.n1)

// 导入具有默认设置的模块
import abc, {foo,bar} from './01.js';
console.log(abc)
foo();
bar();