/*

  ES6的模块化规则
  导出 export 
  导入 import   

*/

// export let a = 123;
// export let fn = () => {
//   console.log('hello')
// }

let m = 1;
let n = 2;

// export {m,n}
// 等效于下面写法
// export {
//   m: m,
//   n: n
// }

// 导出成员的时候可以修改名字
// export {
//   m as m1,
//   n as n1
// }

export let foo = () => {
  console.log('foo');
}

export let bar = () => {
  console.log('bar');
}


// 导出成员的时候，可以不强制指定名字，让模块的使用者决定名字
export default {
  tom: '1',
  jerry: '2'
}

