function getRandomStr(len, hasnum, haslower, hasupper) {
    var str = "",
        num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        arr = [];
 
    len = len || 10;

    if (hasnum) {
        arr = arr.concat(num);
    }

    if (haslower) {
        arr = arr.concat(lower);
    }

    if (hasupper) {
        arr = arr.concat(upper);
    }

    for(var i=0; i<len; i++){
        str += arr[Math.round(Math.random() * (arr.length-1))];
    }

    return str;
}

exports = module.exports = getRandomStr;