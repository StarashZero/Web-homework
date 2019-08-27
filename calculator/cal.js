var buffer = [];    //设置缓存区
var opearr = ['+','-','*','/'];//操作符号
/*输入数字*/
function clicknum(num) {
    'use strict'
    buffer.push(num);
    display(buffer.join(''));
}
/*输入操作*/
function clickope(ope) {
    'use strict'
    if(opearr.indexOf(buffer[buffer.length-1])!==-1) {
        buffer.pop();
    }
    buffer.push(ope);
    display(buffer.join(''));
}
/*缓冲区后退一位*/
function dele() {
    'use strict'
    buffer.pop();
    display(buffer.join(''));
}
/*清空缓冲区*/
function bfclear() {
    'use strict'
    buffer = [];
    display(buffer.join(''));
}
/*计算结果*/
function equal() {
    'use strict'
    try {
        if(buffer.length !== 0) {
            var result = eval(buffer.join(''));
            result = parseFloat((result).toFixed(15))
            display('='+result);
            buffer = [];
        }
    }catch (error) {
        alert("运算错误");
        bfclear();
    }
}
/*显示*/
function display(str) {
    'use strict'
    document.getElementById("screen").value = str;
}