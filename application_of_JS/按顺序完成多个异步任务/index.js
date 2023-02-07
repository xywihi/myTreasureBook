//for循环+asyn/await
(async ()=>{
    const sleep = delay => {
        return new Promise((resolve,reject) => {
            setTimeout(_ => {}, delay);
        })
    }
    
    const task = i => {
        return new Promise(async(resolve,reject) => {
            await sleep(500);
            
            console.log(`now is ${i}`);
            ++i;
            resolve(i)
        })
    }
    let param = 0;
    for (let i = 0; i<4; i++){
        param = await task(param)
    }
})()


//Array.prototype.reduce
const sleep = delay => {
    return new Promise((resolve,reject) => {
        setTimeout(_ => {}, delay);
    })
}

const task = i => {
    return new Promise(async(resolve,reject) => {
        await sleep(500);
        
        console.log(`now is ${i}`);
        ++i;
        resolve(i)
    })
}
[task,task,task,task,task,task].reduce(async (prev, task) => {
    const res = await prev
    return task(res)
},0)