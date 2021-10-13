"use strict"
//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function(){

     //1.localStrogeが使えるか確認
        if(typeof localStorage==="undefined"){
            window.alert("このブラウザはlocal　Stroge機能実装されていません");
            return;
        }else{
            saveLocalStroge(); //2.localStrongへの保存
        }
    }
);


//2.localStrongへの保存
function saveLocalStroge(){
    const save=document.getElementById("save");
    save.addEventListener("click",
        function(e){
            e.preventDefault();
            const key=document.getElementById("textKey").value;
            const value=document.getElementById("textMemo").value;

            //値の入力チェック
            if(key=="" ||value==""){
                window.alert("key, Memoはいずれも必須です。");
                return;

            }else{
             localStorage.setItem(key,value);
             let w_msg="LocalStorageに"+key+" " +value+"保存しました。" ;
             window.alert(w_msg);
             document.getElementById("textKey").value="";
             document.getElementById("textMemo").value="";
            }
        },false
    );
};