"use strict"
//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function(){

     //1.localStrogeが使えるか確認
        if(typeof localStorage==="undefined"){
            window.alert("このブラウザはlocal　Stroge機能実装されていません");
            return;
        }else{
            viewStorage();    //localStorageからのデータ取得とテーブルへ表示
            saveLocalStorage(); //2.localStrongへの保存
            delLocalStorage();//3.LocalStorageから削除
            allClearLocalStorage();//4.localStorageからすべて削除
            selectTable();//5.データ選択
        }
    }
);


//2.localStrongへの保存
function saveLocalStorage(){
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
                let w_confirm=window.confirm("LocalStorageに\n"+key+"の"+value+"\nを保存しますか？");
                if(w_confirm===true){
                    localStorage.setItem(key,value);
                    viewStorage();
                    let w_msg="LocalStorageに"+key+" "+value+"を保存しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value="";
                    document.getElementById("textMemo").value="";
                }
            }
        },false
    );
};

//3.LocalStorageから削除
function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function(e) {
            e.preventDefault();
            const checkbox1 = document.getElementsByName("checkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;  //選択　されていれば、"1"が返却される
            w_cnt = selectCheckBox("del"); //テーブルからデータ選択
        
            if(w_cnt >= 1) {
                let w_confirm = confirm("Local Storageから選択されている  " + w_cnt + "  件削除しますか？");
                if(w_confirm === true) {  
                    for (let i = 0; i < checkbox1.length; i++) {
                        if (checkbox1[i].checked) {
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }
                    }   
                    viewStorage(); //localStorageからデータの取得とテーブルへ表示
                    let w_msg = "LocalStorageから  " + w_cnt + "  件を削除しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
}; 

//4.localStorageからすべて削除
function allClearLocalStorage(){
    const allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm=window.confirm("LocalStorageのデータをすべて削除しますか？。？(すべて削除(allClear)します。");
            //確認ダイアログ「ok」を押されたら、すべて削除する
            if(w_confirm===true){
                localStorage.clear();
                viewStorage();//localStorageからのデータの取得とテーブルへ表示
                let w_msg="LocalStorageのデータをすべて削除(allClear)しました";
                window.alert(w_msg);
                document.getElementById("textKey").value="";
                document.getElementById("textMemo").value="";
            }
        },false
    )
};

//5.データ選択
function selectTable(){
    const select=document.getElementById("select");
    select.addEventListener("click",
        function(e){
            e.preventDefault;
            selectCheckBox("select"); //テーブルからデータ選択
        },false
    );
};

//テーブルからデータ選択
function selectCheckBox(mode){
    let w_sel = "0"; //選択されてれば、"1"にする
    let w_cnt =0;
    const checkbox1 = document.getElementsByName("checkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";
  
    for(let i=0; i < checkbox1.length; i++){
      if(checkbox1[i].checked) {
            if(w_cnt === 0){
                w_textKey =table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo =table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode === "select") {
        if(w_cnt === 1){
            return w_sel = "1";
        }else{
            window.alert("１つ選択(select)してください");
        }
    }

    if (mode === "del") {
        if (w_cnt >= 1) {
          return w_cnt;  
        }
        else {
          window.alert("１つ以上を選択してください。");
        } 
    }
    
};


//localStorageからのデータ取得とテーブルへ表示
function viewStorage(){
    const list=document.getElementById("list");
    //htmlのテーブル職化
    while(list.rows[0]) list.deleteRow(0);

    //localStrogeすべての情報の取得
    for(let i=0; i<localStorage.length; i++){
        let w_key=localStorage.key(i);


        //localStrogeのキーと値を表示
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML="<input name='checkbox1' type='checkbox'>";
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
    //jQueryのplugin tablesorterを使ってテーブルのソート
    //sortList: 引数１...最初からソートしておく列を
    $("#table1").tablesorter({
        sortList:[[1,0]]
    });
    $("#table1").trigger("update");
};