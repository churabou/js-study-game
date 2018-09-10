//チーポンリーチ時の処理

function tenpai_display(){//リーチのディスプレイ表示

  _$('naku').style.display='inline-block'
  _$('pon').className='naku_inactive'
  _$('tii').className='naku_inactive'
  _$('kan').className='naku_inactive'
  _$('reach').className='pon'

}

function naku_inactive(){//メニューのディスプレイを消す

  _$('pon').className='naku_inactive'
  _$('tii').className='naku_inactive'
  _$('kan').className='naku_inactive'
  _$('reach').className='naku_inactive'
  _$('naku').style.display='none'

}


_$('cancel').addEventListener('click',function(){

  for(var i=0; i<tile_own.length; i++){  //カードを元に戻す //リーチのキャンセル
      var card_tile = document.getElementById('card'+i)
      if(card_tile.style.background==='pink'){
         card_tile.style.background = 'white'
      }}

      _$('aaaaa').innerHTML='';
      naku_inactive()//画面を消す
      qi.pair = []//新しくfind qi ponするかs
      qi.obj = [];
      pon.obj = [];//果たしてここら辺は初期化する必要があるのだろうか。/あり
      istiied = false;

      next_player.get()

})


_$('reach').addEventListener('click',function(){

   for(var i=0; i<suteru.length; i++){  //捨てられる牌の色を変える
     visialize(suteru[i])
   }

})


var istiied = false;//メニューのチーのボタンは一回しか押したくない。

_$('tii').addEventListener('click',function(){
    if( !istiied ){
     for(var i=0; i<qi.pair.length/3; i++){
     add_qi_btn(i);
     istiied = true;
    }}


})

_$('pon').addEventListener('click',function(){

      _$('naku_ed').appendChild(make(pon.obj))
      _$('naku_ed').appendChild(make(pon.obj))
      _$('naku_ed').appendChild(make(pon.obj))

      for (var i = 0; i < 2; i++) {
         adjust(pon.obj)
         }
        lasttile = _$( 'card'+(tile_own.length-1) )
        _$('aaaaa').innerHTML='';
        naku_inactive()
        menzen = false;
        pon.able = null;
        //setTimeout(next_player,500)
})



_$('tumo').addEventListener('click',function(){

  _$('aaaaa').innerHTML = 'つも'
  setTimeout(function(){
    _$('big').style.display='none'
    _$('end').style.display='inline-block'
  },1000)

})


_$('ron').addEventListener('click',function(){

  _$('aaaaa').innerHTML = 'ロン'
  setTimeout(function(){
    _$('big').style.display='none'
    _$('end').style.display='inline-block'
  },1000)
})



var doing_reachi = false;
var menzen = true;

function add_qi_btn(i){//チーできるタイプのボタンを設置

  var btn = document.createElement('div');
      btn.appendChild(_make(qi.pair[3*i]))
      btn.appendChild(_make(qi.pair[3*i+1]))
      btn.appendChild(_make(qi.pair[3*i+2]))
      btn.appendChild(document.createElement('br'))

      btn.onclick = function(){

         _$('naku_ed').appendChild(make(qi.pair[3*i]))
         _$('naku_ed').appendChild(make(qi.pair[3*i+1]))
         _$('naku_ed').appendChild(make(qi.pair[3*i+2]))

         if(  qi.pair[3*i].toString() !== qi.obj.toString()  ){  adjust(qi.pair[3*i]) }
         if(  qi.pair[3*i+1].toString() !== qi.obj.toString()  ){  adjust(qi.pair[3*i+1])}
         if(  qi.pair[3*i+2].toString() !== qi.obj.toString()  ){  adjust(qi.pair[3*i+2])}

          lasttile = _$( 'card'+(tile_own.length-1) )
          //console.log(lasttile)
          _$('aaaaa').innerHTML='';
          naku_inactive()
          qi.pair = [];
          qi.obj = [];
          istiied = false;
          qi.doing = true;
          menzen = false;
          //setTimeout(next_player,500)
          //console.log(tile_own)
        }
      _$('aaaaa').appendChild(btn)
}


function adjust(hiki){  //鳴いた分のタイルを手持ちから消す

  for (var j=0; j < tile_own.length; j++) {
    if( what_tile(_$('card'+j)).toString() == hiki.toString() ){
      _$('myhand').removeChild( _$('card'+j) );  //displlay
      ary_remove(tile_own,hiki)                    //tile_own
      for (var k = j+1; k < tile_own.length+1; k++) {
        _$('card'+k).id= 'card'+(k-1);  //先にずらしとく
      }
      break;
    }
  }

}



function visialize(hiki){//タイルの色を変える

for(var i=0; i<tile_own.length; i++){
  if( what_tile(_$('card'+i)).toString() === hiki.toString() )
     _$('card'+i).style.background='pink'
    }

}
