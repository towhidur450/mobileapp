"use strict";
window.addEventListener("DOMContentLoaded",
    function(){
        //ページ本体が読み込まれたタイミングで実行するコード

        // ヘッダーのテキストエフェクト
        $("header").textillate({
            loop: false, // ループのオンオフ
            minDisplayTime: 2000, // テキストが置き換えられるまでの表示時間
            initialDelay: 2000, // 遅延時間
            autoStart: true, // アニメーションを自動的にスタート
            in: { // フェードインのエフェクトの詳細設定
                effect: "fadeInLeftBig", // エフェクトの名前(animate.css参照)
                delayScale: 1.5, // 遅延時間の指数
                delay: 50, // 文字ごとの遅延時間
                sync: false, // trueはアニメーションをすべての文字に同時に適用
                shuffle: true // trueは文字を順番にではなく、ランダムに
            }
        });

        // おみくじボタン(id="btn1") ボヤァと表示させる

        $(function(){
            ScrollReveal().reveal("#btn1", { duration: 9000 });
        });

        setTimeout(
            function(){
                 //ポップアップメッセージ
                let popMessage="いらっしゃい！おみくじ引いてって！";
                window.alert(popMessage);
            },
            "5000"
        );
    },false
);


//おみくじボタン１
const btn1=document.getElementById("btn1");
btn1.addEventListener("click",

    function(){
      
        let resultText = ["大吉!!!!!","吉!!!!","中吉!!!","小吉!!","末吉!","凶。。"];
        let resultColor = ["#ff0000","#c71585","#ff1493","#ff69b4","ff8c00","#1e90ff"];
        let resultFontSize = ["90px","80px","70px","60px","50px","30px"];
        let resultsMaxSpeed = [10,10,8,5,5,5];
        let resultsMinSpeed =[1,1,1,1,1,1];
        let resultMaxSize = [60,55,50,45,40,35];
        let resultImage = ["img/star.png","img/sakura_hanabira.png","img/love2.png","img/maple.png","img/leaf.png","img/snowflakes.png"];
        let resultSound =["sound/omikuji_sound1.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound2.mp3","sound/omikuji_sound3.mp3"];
        let n=Math.floor(Math.random()*resultText.length);
        omikijiText.textContent=resultText[n];
        omikijiText.style.color=resultColor[n];
        omikijiText.style.fontSize=resultFontSize[n];
    
        // snowfall stop
        $(document).snowfall("clear");
        // jQueryのsnowfall
        $(document).ready(function(){
            $(document).snowfall({
                maxSpeed : resultsMaxSpeed[n], // 最大速度
                minSpeed : resultsMinSpeed[n],
                maxSize  : resultMaxSize[n], // 最大サイズ
                image    :resultImage[n],
            });
           
        });
        //sound
        let music=new Audio(resultSound[n]);
        music.currentTime=0;
        music.play();    
    },false
);