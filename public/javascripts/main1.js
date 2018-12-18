//Create Answer Automatically
var alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z'];
var ansAry = [];

function createWord(ary) {
    var i = ary.length;
    while(i){
        var j = Math.floor(Math.random()*i--);
        var t = ary[i];
        ary[i] = ary[j];
        ary[j] = t;
    }

    for (var n = 0; n < 4; n++){
        ansAry += alp[n];
    }
    ansAry = ansAry.split('');

    return ary;
}
console.log(createWord(alp));
console.log(ansAry);


//Predict Scene
var pre, preAry, preList, hit, blow;

function getValue2(idname) {
    hit = 0;
    blow = 0;

    pre = document.getElementById(idname).value;
    preAry = pre.split('');
    console.log(preAry);

    for (var i = 0; i < preAry.length; i++) {
        for (var j = i + 1; j < pre.length; j++) {
            if (preAry[i] == preAry[j]) {
                alert('do not use the same word!');
                return false;
            } else {
                console.log('Go Next!');
            }
        }
    }

    for (var i = 0; i < preAry.length; i++) {
        if (preAry[i] == ansAry[i]) {
            hit += 1;
        }
    }
    console.log(hit);
    for (var i = 0; i < preAry.length; i++) {
        for (j = 0; j < preAry.length; j++) {
            if (preAry[i] == ansAry[j]) {
                blow += 1;
            }
        }
    }
    console.log(blow);
    if (hit == preAry.length) {
        alert('COMPLETE');
    } else {
        preList = document.getElementById('preList');
        var apnd = document.createElement('p');
        var text = document.createTextNode(pre + '=' + hit + '+' + blow);
        apnd.appendChild(text);
        preList.appendChild(apnd);
    }
}
