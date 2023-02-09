// '11+2-8*2/4+4/2+8/2'中给高级运算添加小括号
function addBrackets(expression) {
    const resultArr = [];
    const symbolArr = ['+', '-', '*', '/'];
    const highLevelSymbolArr = ['*', '/'];
    const isSymbolFn = (str) => symbolArr.includes(str);
    const isHighSymbolFn = (str) => highLevelSymbolArr.includes(str);
    const expLen = expression.length;
    var isInBracket = false;
    var currentNum = ''
    for (let i = 0; i < expLen; i++) {
        const isSymbol = isSymbolFn(expression[i]);
        const isHighSymbol = isSymbol && isHighSymbolFn(expression[i]);
        if (isSymbol) {
            if (isHighSymbol) {
                if (!isInBracket) {
                    currentNum = '(' + currentNum;
                }
                isInBracket = true;
                currentNum += expression[i];
            } else {
                if (isInBracket) {
                    resultArr.push(currentNum + ')');
                    isInBracket = false;
                } else {
                    resultArr.push(currentNum);
                }
                resultArr.push(expression[i]);
                currentNum = '';
            }
        } else {
            currentNum = currentNum + expression[i];
        }
    }
    if (currentNum) {
        resultArr.push(currentNum + (isInBracket ? ')' : ''))
    }
    // console.log(resultArr)
    return resultArr.join('')
}

let expression = '11+2-8*2/4+4/2+8/2';
console.log(addBrackets(expression))