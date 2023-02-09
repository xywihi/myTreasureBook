function asyncFn(){
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res(true)
            console.log('数据加载完毕')
        }, 1000);
    })
}

async function fn(params) {
    const [err,data]=await asyncFn().then(data=>[null,data]).catch(err=>[err,null])
    console.log(err,data)
}
fn();

const asyncFn2=async ()=>{
    console.log(11111)
    // setTimeout(() => {
    //     Promise.resolve(5555).then(res=>console.log(res))
    // }, 1000);
    // await Promise.resolve(4444).then(res=>console.log(res))
    const aaa= await console.log(77777)
    console.log('aaa',aaa)
}
asyncFn2()
// setTimeout(() => {
//     Promise.resolve(6666).then(res=>console.log(res))
// }, 500);
// Promise.resolve(3333).then(res=>console.log(res))
console.log(2222)

