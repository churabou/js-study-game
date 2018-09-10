
var agarihai={},suteru=[];

tenpai = {

  gudge : function(){

           updation()//数える

        if ( candelete.length > 0 ){ //123 234
          var first = candelete.length;  //first = 2

           for ( var i=0; i<first; i++){//i = 0;
               var ddd = copy_tile_own()
               try_delete(i)  //delete 123  //tile_ownが減っている
                           //今あるものからひとつ消してみる
               if ( candelete.length > 0 ){
                   var second = candelete.length;
                   for ( var j=0; j<second; j++){

                     var jjj = copy_tile_own()  //今のtile_ownを保持
                           try_delete(j)  //delete 456

                       if ( candelete.length>0){
                       var third = candelete.length;

                           for ( var k=0; k<third; k++){

                             var kkk = copy_tile_own()
                               try_delete(k)  //3回目

                             if ( candelete.length>0 ){  //チーやぽんがあるからtile_own.length<5とかで実行したほうがいい//4ペアあるケース
                                  var forth = candelete.length;

                                      for ( var l=0; l<forth; l++){
                                         try_delete(l)

                                              //  if(tile_own.length ===2){
                                                  agarihai['trashed'+tile_own[1]]=[tile_own[0]]
                                                  agarihai['trashed'+tile_own[0]]=[tile_own[1]]
                                                  suteru.push(tile_own[0])
                                                  suteru.push(tile_own[1])
                                                //}
                                        }//消せる組が4組の時頭を待つだけ
                              }else{//ここがtile_own.lengthが5の時
                                     last5()
                               }

                  tile_own = kkk; updation()} }

             tile_own = jjj; updation()} }

        tile_own = ddd; updation()} }

     },
  //ex再起処理は  ,gudge : guge(hiki){},

  gudge_naki : function(){}

}

//ここら辺は長いけど割と感覚的に読める


function decide_head_1(){  //残り5この時に発動する処理。

  for(var i=0; i<tile_own.length;i++){

     if(own[ 'value'+tile_own[i] ] === 2){  //headが一個
           var head = tile_own[i];
       for(var j=0; j<2; j++){
           ary_remove(tile_own,tile_own[i])
          }
     break;
    }
  }
}

function decide_head_2(){//頭が二個あるのが確定している時に発動する処理。

     if( own['value'+tile_own[0]] === 1){
       agarihai['trashed'+tile_own[0]]=[tile_own[2],tile_own[4]]
       suteru.push(tile_own[0])
       console.log(tile_own[0]+'を捨てて上がり牌は'+tile_own[2]+' '+tile_own[4])
     }
     if( own['value'+tile_own[2]] === 1){
       agarihai['trashed'+tile_own[2]]=[tile_own[0],tile_own[4]]
       suteru.push(tile_own[2])
       console.log(tile_own[2]+'を捨てて上がり牌は'+tile_own[0]+' '+tile_own[4])
     }
     if( own['value'+tile_own[4]] === 1){
       suteru.push(tile_own[4])
       agarihai['trashed'+tile_own[4]]=[tile_own[0],tile_own[2]]
       console.log(tile_own[4]+'を捨てて上がり牌は'+tile_own[0]+' '+tile_own[2])
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
  //ここでtile_ownは3個しかない
  if( junzu_wait(tile_own[0],tile_own[1]) ){
       console.log( tile_own[2]+'を捨てて上がり牌は'+junzu_wait(tile_own[0],tile_own[1]))
       agarihai['trashed'+tile_own[2]]=junzu_wait(tile_own[0],tile_own[1])
       suteru.push(tile_own[2])
      }
  if( kanzu_wait(tile_own[0],tile_own[1]) ){
       console.log( tile_own[2]+'を捨てて上がり牌は'+kanzu_wait(tile_own[0],tile_own[1]))
       agarihai['trashed'+tile_own[2]]=[kanzu_wait(tile_own[0],tile_own[1])]
       suteru.push(tile_own[2])
  }

  if(  junzu_wait(tile_own[1],tile_own[2]) ){
       console.log( tile_own[0]+'を捨てて上がり牌は'+junzu_wait(tile_own[1],tile_own[2]))
       agarihai['trashed'+tile_own[0]]=junzu_wait(tile_own[1],tile_own[2])
       suteru.push(tile_own[0])
      }
  if(  kanzu_wait(tile_own[1],tile_own[2]) ){
       console.log( tile_own[0]+'を捨てて上がり牌は'+kanzu_wait(tile_own[1],tile_own[2]))
       agarihai['trashed'+tile_own[0]]=[kanzu_wait(tile_own[1],tile_own[2])]
       suteru.push(tile_own[0])
  }

}

function last5(){

   count_tile()
    if( Object.keys(own).length === 3 ){
        decide_head_2()
        //decide_head_1()
        return
     }
   decide_head_1()
    if( tile_own.length === 3 ){
     which_to_trush()
    }
}



function init_var(){
 own = {};
 kouzu.able = [];
 junzu.able = [];
 candelete = [];
 wait_this = [];
 tile = [];
}


var candelete = [];

function init_candelete(){  //candeleteに数を入れていく//ひとつにまとめる

  for(var i=0; i<kouzu.able.length; i++){
    candelete.push(kouzu.able[i])
  }
  for(var i=0; i<junzu.able.length; i++){
    candelete.push(junzu.able[i])
  }

}

function try_delete(arf){//引数はfor文の変数i j k l
    // if ( candelete.length>0){ //どうせ全て消すからひとつにまとめている
        if( arf < kouzu.able.length){
            kouzu.delete(candelete[arf])
          }else{
            junzu.delete(candelete[arf])
          }
        updation();
     //}
}

function updation(){
     init_var()  //変数の初期化
     count_tile();  // どの配列が何個あるかを数える
     kouzu.find()   //重複込みで同じ牌を数えて anko_aryにadd;
     junzu.find()   //重複込みで同じ牌を数えて junzu_aryにadd;
     init_candelete() //candeleteは  [  anko anko junzu junzu junzu  ] となる
}//candeleteに今持っているtile_ownで３ペアを満たす組が全て入っている。



function copy_tile_own(){//連想配列をコピーする関数。
  var copid = [];
    for(var i=0; i<tile_own.length; i++){
        copid[i] = [];
        for(var j=0; j<2; j++){
            copid[i][j] = tile_own[i][j];
           }} return copid;
  }







//上がり杯をどうやって管理するか
//
// テンパイするとき候補がいくつか出る。
// どの杯を捨てるか及びその杯を捨てたときの上がり杯
// やはり捨てられる杯を配列で管理
// オブジェクトでその杯をkeyに答えをinclude,
// //
// function hoge(ary,count){
//  updation()
//  var copy = copy_ary(ary)
//   for(var i=0 ; i<ary.length; i++){
//
//     if(candelete.length>0){
//     try_delete(i)
//     //count += 1;
//     if(count = 3){ last5()}
//     hoge(ary,count)
//     ary = copy
//   }
//   }
// }
