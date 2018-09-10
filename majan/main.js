//リーチできるかを判定する処理および上がり牌を取得

 var agarihai = {} ;
 var suteru = [];

 var kouzu3 = {};   //3pair
     junzu3 = {};

 var anko_ary = [];
 var jun_ary = [];

 var candelete = [];

 var wait_this = [];
 var tile = [ ];


function init_var(){
 hako = {};
 kouzu3 = {};
 junzu3 = {};
 anko_ary = [];
 jun_ary = [];
 candelete = [];
 wait_this = [];
 tile = [];
}

function howmany(){  //ある配列のカードが何個あるか数える
  hako = {};
  for(var i=0; i<tile_exist.length;i++){ //今あるタイルの配列名のプロパティーを作る
   hako["value"+tile_exist[i]] = 0 ;
     }
  for(var i=0; i<tile_exist.length;i++){
   hako["value"+tile_exist[i]] += 1 ; //そのタイルが何枚あるか数える
     }

}

//hako{} の中に配列A = 1,配列B = 2, と入る
//hakoのvalueが3以上のものを取り出せばいい
//***************
function kouzu(){

 for(var i=0; i<tile_exist.length;i++){
  if(hako['value'+tile_exist[i]]>2){
    //あるカードが3枚以上あるならば
    kouzu3["kouzu"+tile_exist[i]] = tile_exist[i]
  }
 }

  for(key in kouzu3){
    anko_ary.push(kouzu3[key]) ;
  }
}//junzu3 ->anko_ary に入れることで重複が削れる。

//構図の配列を全てシングルで出す



function junzu(){

 for(var i=0;i<tile_exist.length;i++){

  var   left = [tile_exist[i][0],tile_exist[i][1]-1]   //今回は数値
       right = [tile_exist[i][0],tile_exist[i][1]+1]

  if(tile_exist[i][0] != 3){ //字牌でないことが前提
    if( hako["value"+left]>0 && hako["value"+right]>0){//左右の牌があるなら
      junzu3['junzu '+left+' to '+right] = tile_exist[i]

  }}}

   for(key in junzu3){
        jun_ary.push(junzu3[key])
      }
  //junzu3->jun_aryに入れることで重複を削る。
}


function delete_tile_exist(hiki){

  for( var i = 0; i < tile_exist.length; i++ ){
    if( tile_exist[i].toString() == hiki.toString() ){
       tile_exist.splice(i,1);
       break;
    }  }

}

function delete_kouzu(hiki){  //

  for(var i=0; i<3; i++){//一回消すを3回する
       delete_tile_exist(hiki)
    }

}


function delete_junzu(hiki){//真ん中を基準に１つずつ消す

 var   left = [ hiki[0], hiki[1]-1 ],
       cent = hiki,
       right = [ hiki[0], hiki[1]+1 ];

       delete_tile_exist(left)
       delete_tile_exist(cent)
       delete_tile_exist(right)

}


 function init_candelete(){  //candeleteに数を入れていく

   for(var i=0; i<anko_ary.length; i++){
     candelete.push(anko_ary[i])
   }

   for(var i=0; i<jun_ary.length; i++){
     candelete.push(jun_ary[i])
   }

 }


var dddd;
//リーチ処理の開始
function launch(){
   agarihai= {};  //適当な初期化位置を模索中
   suteru =[];
  if(!menzen){ gudge_tenpai_naki(); return;}
  if(menzen){ gudge_tenpai() }
  if(Object.keys(agarihai).length>0){  tenpai()   }//agarihaiがあるならばリーチ可能にする

};



//33345

function gudge_tenpai(){  //全ての組合せを調べている///おそらくaryで汎用メソッド。


updation()
 //今のタイルを残しておく
 //var ddd = copy_tile_exist() なぜここで宣言してはいけないのかfor文のそ中である必要があるのか
    if ( candelete.length > 0 ){ //123 234
      var first = candelete.length;  //first = 2

       for ( var i=0; i<first; i++){//i = 0;
           var ddd = copy_tile_exist()
           try_delete(i)  //delete 123  //tile_existが減っている
                       //今あるものからひとつ消してみる
           if ( candelete.length > 0 ){
               var second = candelete.length;
               for ( var j=0; j<second; j++){

                 var jjj = copy_tile_exist()  //今のtile_existを保持
                       try_delete(j)  //delete 456

                   if ( candelete.length>0){
                   var third = candelete.length;

                       for ( var k=0; k<third; k++){

                         var kkk = copy_tile_exist()
                           try_delete(k)  //3回目

                         if ( candelete.length>0 ){  //チーやぽんがあるからtile_exist.length<5とかで実行したほうがいい//4ペアあるケース
                              var forth = candelete.length;

                                  for ( var l=0; l<forth; l++){
                                     try_delete(l)

                                          //  if(tile_exist.length ===2){
                                              agarihai['trashed'+tile_exist[1]]=[tile_exist[0]]
                                              agarihai['trashed'+tile_exist[0]]=[tile_exist[1]]
                                              suteru.push(tile_exist[0])
                                              suteru.push(tile_exist[1])
                                            //}
                                    }//消せる組が4組の時頭を待つだけ
                          }else{//ここがtile_exist.lengthが5の時
                                 last5()
                           }
       /////////////////////////////////////////////////////////////
              tile_exist = kkk; updation()} } //else{  tile_exist = jjj;}

         tile_exist = jjj; updation()} } //else{  tile_exist = ddd;}

    tile_exist = ddd; updation()} }//else{  tile_exist = ddd;}

 }//再帰処理でもっと綺麗にかけるかもしれない。


function try_delete(arf){//引数はfor文の変数i j k l
    // if ( candelete.length>0){ //どうせ全て消すからひとつにまとめている
        if( arf<anko_ary.length){
            delete_kouzu(candelete[arf])
          }else{
            delete_junzu(candelete[arf])
          }
        updation();
     //}
}



function copy_tile_exist(){
  var copid = [];
    for(var i=0; i<tile_exist.length; i++){
        copid[i] = [];
        for(var j=0; j<2; j++){
            copid[i][j] = tile_exist[i][j];
           }} return copid;
  }


function copy_array(aaa){
  var copied = [];
  for(var i=0; i<aaa.length; i++){
    copied[i] = aaa[i];
  }
  return copied;
}
//<<<ここら辺は配列をコピー 連想配列をコピーするか>>>>

/////////////////////////////////////////////////////////確定

function decide_head_1(){  //残り5

  for(var i=0; i<tile_exist.length;i++){

     if(hako[ 'value'+tile_exist[i] ] === 2){  //headが一個
           var head = tile_exist[i];
       for(var j=0; j<2; j++){
           delete_tile_exist(head)
          }
     break;
    }
  }
}
function decide_head_2(){

     if( hako['value'+tile_exist[0]] === 1){
       agarihai['trashed'+tile_exist[0]]=[tile_exist[2],tile_exist[4]]
       suteru.push(tile_exist[0])
       console.log(tile_exist[0]+'を捨てて上がり牌は'+tile_exist[2]+' '+tile_exist[4])
     }
     if( hako['value'+tile_exist[2]] === 1){
       agarihai['trashed'+tile_exist[2]]=[tile_exist[0],tile_exist[4]]
       suteru.push(tile_exist[2])
       console.log(tile_exist[2]+'を捨てて上がり牌は'+tile_exist[0]+' '+tile_exist[4])
     }
     if( hako['value'+tile_exist[4]] === 1){
       suteru.push(tile_exist[4])
       agarihai['trashed'+tile_exist[4]]=[tile_exist[0],tile_exist[2]]
       console.log(tile_exist[4]+'を捨てて上がり牌は'+tile_exist[0]+' '+tile_exist[2])
     }

}



function junzu_wait(a,b){//任意のタイル2組において

  if( a[0] === b[0] &&  a[1]+1=== b[1] ){ //クラスが同じ中身が階差
       var wait = []
           left = [ a[0], a[1]-1 ]
           right = [ a[0], b[1]+1 ]
            if( _1_9(left) ){ wait.push(left) }
            if( _1_9(right) ){ wait.push(right) }
            return wait;
      }else{ return false }

}

function kanzu_wait(a,b){
  if( a[0] === b[0] && a[1]+2 === b[1] ){  return  [ a[0] , a[1]+1 ]   }else{
    return false;
  }
}


//頭いっっことニコで分けている
function   which_to_trush(){
  //ここでtile_existは3個しかない
  if( junzu_wait(tile_exist[0],tile_exist[1]) ){
       console.log( tile_exist[2]+'を捨てて上がり牌は'+junzu_wait(tile_exist[0],tile_exist[1]))
       agarihai['trashed'+tile_exist[2]]=junzu_wait(tile_exist[0],tile_exist[1])
       suteru.push(tile_exist[2])
      }
  if( kanzu_wait(tile_exist[0],tile_exist[1]) ){
       console.log( tile_exist[2]+'を捨てて上がり牌は'+kanzu_wait(tile_exist[0],tile_exist[1]))
       agarihai['trashed'+tile_exist[2]]=[kanzu_wait(tile_exist[0],tile_exist[1])]
       suteru.push(tile_exist[2])
  }

  if(  junzu_wait(tile_exist[1],tile_exist[2]) ){
       console.log( tile_exist[0]+'を捨てて上がり牌は'+junzu_wait(tile_exist[1],tile_exist[2]))
       agarihai['trashed'+tile_exist[0]]=junzu_wait(tile_exist[1],tile_exist[2])
       suteru.push(tile_exist[0])
      }
  if(  kanzu_wait(tile_exist[1],tile_exist[2]) ){
       console.log( tile_exist[0]+'を捨てて上がり牌は'+kanzu_wait(tile_exist[1],tile_exist[2]))
       agarihai['trashed'+tile_exist[0]]=[kanzu_wait(tile_exist[1],tile_exist[2])]
       suteru.push(tile_exist[0])
  }

}

function last5(){

   howmany()
    if( Object.keys(hako).length === 3 ){
        decide_head_2()
        //decide_head_1()
        return
     }
   decide_head_1()
    if( tile_exist.length === 3 ){
     which_to_trush()
    }
}


//tile_existに残った組を見つける
function updation(){
     init_var()  //変数の初期化
     howmany();  // どの配列が何個あるかを数える
     kouzu()   //重複込みで同じ牌を数えて anko_aryにadd;
     junzu()   //重複込みで同じ牌を数えて junzu_aryにadd;
     init_candelete() //candeleteは  [  anko anko junzu junzu junzu  ] となる
}


//泣いた時のテンパイ判定

function gudge_tenpai_naki(){

//  var length = Math.floor(tile_exist.length/3);
  if(tile_exist.length === 5 ){
     var aaa = copy_tile_exist();
     last5_naki() ;
     tile_exist = aaa;
  }

  updation()

  if ( candelete.length > 0 ){ //123 234
    var first = candelete.length;  //first = 2

       for ( var i=0; i<first; i++){//i = 0;
             var ddd = copy_tile_exist()
             try_delete(i)  //delete 123  //tile_existが減っている
             if(tile_exist.length === 5 ){  last5_naki() }
             if ( candelete.length > 0 ){
                 var second = candelete.length;
                 for ( var j=0; j<second; j++){

                       var jjj = copy_tile_exist()  //今のtile_existを保持
                       try_delete(j)  //delete 456
                       last5_naki()
                       tile_exist = jjj; updation();
                 }
              }
            tile_exist = ddd; updation();
        }
    }

}

function last5_naki(){

   updation()
   if( candelete.length === 1 ){
       try_delete(0)
       agarihai['trashed'+tile_exist[1]]=[tile_exist[0]]
       agarihai['trashed'+tile_exist[0]]=[tile_exist[1]]
       suteru.push(tile_exist[0])
       suteru.push(tile_exist[1])
   }


    if( Object.keys(hako).length === 3 ){
        decide_head_2()
        //decide_head_1()    688 99
        return
     }

   decide_head_1()
     if( tile_exist.length === 3 ){
     which_to_trush()
    }

}



//nihhonnkokuminnnghaseitounisennktsr


//get したやつが上がりはい

//  クラスが違う-->break
//  かいさが２以上 --> break
//   for(var i=0; i<(tile_exist.length-1); i++){   23334
//        for(var j=1 ; j<=4){
//               if(!kanzu_wait( tile_exist[i],tile_exist[i+j])){  //感ずでない
//                if( tile_exist[i][0] !== tile_exist[i+j][0] ){ break } クラスが違うなら調べる価値ない
//                if( tile_exist[i][1]+2 < tile_exist[i+j][1] ){ break } クラスが同じでも差がニコ以上g
//                } else{ can_tii.push()  break 重複させない}  組があったら   33455
//                  }
//           }
// }
//
//ちゃんと感ずを取れるようになってgudge_tenpaiをいじって23456以外の街に対応できるようにする
//役の判定を開始します
