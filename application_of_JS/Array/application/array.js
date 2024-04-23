// 创建指定长度的数组
let arr = Array.apply(undefined,{length:2});
console.log('arr: ', arr);

// ES5开始apply函数的第二个参数除了可以是数组外，还可以是类数组对象（即包含length属性，且length属性值是个数字的对象）。
Array.apply(undefined,{length:2}) 
// 等价于
Array.apply(undefined,[undefined],undefined) 

//注意：Array()与Array.apply()的区别
Array(4)    //确定了数组长度，但未赋初值  [空属性 × 4]，不能使用map,forEach和reduce
Array.apply(null,{length:4})   //确定了数组长度，赋初值  [undefined,undefined,undefined,undefined]

//如果Array(4)中需要定义，则用fill()方法
Array(4).fill(undefined)  // [undefined,undefined,undefined,undefined]