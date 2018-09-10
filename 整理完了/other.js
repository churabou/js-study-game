
function another_game(){

     _$('big').style.display='block'
     _$('end').style.display='none'


     tile_own = [];
     _$('myhand').innerHTML = ''
     _$('aaaaa').innerHTML = ''
     _$('trashed').innerHTML = ''
     _$('trashed1').innerHTML = ''
     _$('trashed2').innerHTML = ''
     _$('trashed3').innerHTML = ''
     _$('tumo').className = 'naku_inactive'
     _$('ron').className = 'naku_inactive'
     _$('cancel').style.display = 'inline-block'
     _$('naku').style.display = 'none'

     for(var i=0; i<14;i++){
      create(i);  //からの牌を作る
     }

     pair_random();
     distribute(); //牌を入れる
     update_cards(); //オブジェクトで今ある牌を管理
     isStarted = false;
     lasttile = document.getElementById('card13');
//その他初期化処理
}
