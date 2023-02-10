var reg = new RegExp(/\d{0,9}/);

console.log(reg.test(1000000))

/*是否带有小数*/

function isDecimal(strValue ) {

    var objRegExp= /^\d+\.\d+$/;
    
    return objRegExp.test(strValue);
    
    }