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
             localStorage.setItem(key,value);
             viewStorage();    //localStorageからのデータ取得とテーブルへ表示
             let w_msg="LocalStorageに"+key+" " +value+"を保存しました。" ;
             window.alert(w_msg);
             document.getElementById("textKey").value="";
             document.getElementById("textMemo").value="";
            }
        },false
    );
};

//3.LocalStorageから削除
function  delLocalStorage(){
    const del=document.getElementById("del");
    del.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_sel="0"; //選択されていれば、"1"が返却される
            w_sel=selectRadioBtn();//テーブルからデータ選択

            if(w_sel==="1"){
                const key=document.getElementById("textKey").value;
                const value=document.getElementById("textMemo").value;
                localStorage.removeItem(key);
                viewStorage();//localStorageからのデータの取得とテーブルへ表示
                let w_msg="LocalStorageに"+key+" " +value+"を削除しました。" ;
                window.alert(w_msg);
                document.getElementById("textKey").value="";
                document.getElementById("textMemo").value="";
            }
        },false
    
    );

};

//4.localStorageからすべて削除
function allClearLocalStorage(){
    const allClear=document.getElementById("allClear");
    allClear.addEventListener("click",
        function(e){
            e.preventDefault();
            let w_confirm=window.confirm("LocalStorageのデータをすべて削除か？(allか？(allClear)します。\nよろしいですか？");
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
            selectRadioBtn(); //テーブルからデータ選択
        },false
    );
};

//テーブルからデータ選択
function selectRadioBtn(){
    let w_sel="0";//選択されていれば,"1"にする
    const radio=document.getElementsByName("radio1");
    const table=document.getElementById("table1");

    for(let i=0; i<radio.length; i++){
        if(radio[i].checked){
            document.getElementById("textKey").value=table.rows[i+1].cells[1].firstChild.data;
            document.getElementById("textMemo").value=table.rows[i+1].cells[2].firstChild.data;
            return w_sel="1";
        }
    }

    window.alert("1つ選択(select)してください。");
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

        td1.innerHTML="<input name='radio1' type='radio'>";
        td2.innerHTML=w_key;
        td3.innerHTML=localStorage.getItem(w_key);
    }
};