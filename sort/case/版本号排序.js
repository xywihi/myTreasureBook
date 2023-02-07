import React from 'react';
class RefsDome extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            newArr: []
        }
        this.fn = this.fn.bind(this)
        this.getSortFn = this.getSortFn.bind(this)
    }
    getSortFn() {
        let newArrCopy = Array.from(this.state.newArr);
        let repeat = false
        let num = 0
        return function InnerFn(preIndex) {
            repeat = false;
            for (let i = 0; i < newArrCopy.length; i++) {
                if (newArrCopy[i + 1])
                    if (Number(newArrCopy[i][preIndex]) == Number(newArrCopy[i + 1][preIndex])) {
                        if (Number(newArrCopy[i][preIndex + 1]) > Number(newArrCopy[i + 1][preIndex + 1])) {
                            let value = newArrCopy[i];
                            newArrCopy[i] = newArrCopy[i + 1]
                            newArrCopy[i + 1] = value
                            repeat = true;
                        }
                    }
            }
            if (repeat) InnerFn(num);
            newArrCopy.reverse();
            console.log('newArrCopy', newArrCopy);
            return newArrCopy;
        }
    }
    fn() {
        let arr = ['0.1.1', '2.3.3', '1.24.1', '7.32.1', '5.1.1', '11.302.1.4.5', '2.212.1', '2.22.1', '4.2', '4.3.5', '4.3.4.5']
        let newArr = arr.map(ele => '0.' + ele).map(ele => ele.split('.'))
        this.setState({ newArr }, () => {
            let sortFn = this.getSortFn();
            let resultArr = [];
            console.log(this.state.newArr);
            Array.apply(undefined, { length: 6 }).forEach((item, i) => { resultArr = sortFn(i) });
            let lastresultArr = resultArr.map(item => item.slice(1).join('.'));
            console.log('lastresultArr', lastresultArr);
        });
    }
    render() {
        return (
            <></>
        )
    }
}
export default RefsDome
