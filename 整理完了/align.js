//並び替えに関する関数
var manzu_Number;

function how_many_manzu(){//持っている牌全てを調べる
   for(var i=0; i<tile_own.length ;i++){
     if(cards['class'+i] === 'manzu_class'){
       manzu_Number +=1;
     }}
}

function change_card(naw,i){  //クラスと文字を入れ替える
  _$('card'+naw).className = cards["class"+i]
  _$('card'+naw).innerHTML = cards["value"+i]
  _$('card'+i).className = cards["class"+naw]
  _$('card'+i).innerHTML = cards["value"+naw]
  update_cards();
}

function manzu_slice(){//マンズを左に寄せる
    for(var i=1;i<tile_own.length;i++){
    var naw = i-1;
    if(cards['class'+i] === 'manzu_class'){
    change_card(naw,i)
  }}}

  function pinzu_slice(){//筒子をマンズの隣に寄せる

    for(var i=manzu_Number;i<tile_own.length;i++){
    var naw = i-1;
    if(cards['class'+i] === 'pinzu_class'){
    change_card(naw,i)
  }}}


  function jihai_slice(){//字牌を右端に寄せる
    for(var i=0;i<tile_own.length;i++){
    var naw = i-1;
    if(cards['class'+naw] === 'jihai_class'){
    change_card(naw,i)
  }}}



  function increse(){ //数字を降べきの順に並べる
    for(var i=1;i<tile_own.length;i++){
    var naw = i-1;
    if(cards['class'+i] ===  cards['class'+naw]){
      if(cards['value'+i] <  cards['value'+naw]){
     _$('card'+naw).innerHTML =cards["value"+i]
     _$('card'+i).innerHTML =cards["value"+naw]
     update_cards();
   }}}
  }

function align(){

    manzu_Number=1;
    how_many_manzu()

    for(var i=0;i<15;i++){ manzu_slice(); }
    for(var i=0;i<15;i++){ pinzu_slice(); }
    for(var i=0;i<15;i++){ jihai_slice(); }
    for(var i=0;i<15;i++){ increse();}
    align_tile_own()
   //null_to_13()
   //console.log(manzu_Number)
 }
