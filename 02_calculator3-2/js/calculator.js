'use strict';
// ページ上の要素(Element)を参照
const elementSelect=document.getElementById("calcType");
const elementNum1=document.getElementById("num1");
const elementNum2=document.getElementById("num2");
const elementResult=document.getElementById("result");

//イベントを
elementSelect.addEventListener("change",update)
elementNum1.addEventListener("change",update)
elementNum2.addEventListener("change",update)

//関数「update」を作り,処理をまとめる
function update(){
    //計算結果を求める
    const result=calculate(
        Number(elementNum1.value),//1番目のテキスト入力フォームの値
        Number(elementNum2.value),//2番目のテキスト入力フォームの値
        elementSelect.value
    );
    //画面に表示
    elementResult.innerHTML=result; 

}

//関数「update」を作り,処理をまとめる
function calculate(num1,num2,calcType){
    let result;
    //計算の
    switch(calcType){
        case "type-add"://足し算の場合
            result=num1+num2;
            break;
        case "type-substract"://引き算の場合
            result=num1-num2;
            break;
        case "type-multiply"://掛け算の場合
            result=num1*num2;
            break;
        case "type-divide"://割り算の場合
            result=num1/num2;
            break;
    }
    return result;
}