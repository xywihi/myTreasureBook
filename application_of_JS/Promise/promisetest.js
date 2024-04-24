const {MyPromise} = require('./index.js');

test=new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello, world!');
    }, 1000);
});

test.then((value) => {
    console.log(value);
})
test.then((value) => {
    console.log(value);
})

// 输出：
// Hello, world!