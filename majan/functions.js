//
function create(i){
   var card = document.createElement('div')
       card.id="card"+i
       card.style.display = 'inline-block'
       card.addEventListener('click',function(){
//swichで書いた方が綺麗?
         if(this.style.background === 'pink' ){   player.reach(this); return  }//リーチ確定するとき

         if(qi.doing){ qi.doing = false; setTimeout(com_trash1,500); return;}   //泣いて捨てる時
         if(pon.doing){ pon.doing = false; setTimeout(com_trash1,500); return;}

         if(_$('naku').style.display === 'none' && lasttile.innerHTML != ''){ //メニューが出てない&&一枚多く持っている時//ノーマル
              if( agarihai["trashed"+what_tile(this)] !== undefined ){//テンパイかつリーチしてない
                   console.log(agarihai["trashed"+what_tile(this)])
                   wait_last=[]
                   for(var i=0; i<agarihai["trashed"+what_tile(this)].length; i++){
                      wait_last.push( agarihai["trashed"+what_tile(this)][i] )//待ち牌を配列にする
                     }
                  }

              _trash_(this)
              setTimeout(function(){
                com1.get()
               },700)
          }
      })

       _$('myhand').appendChild(card)
}



var wait_last = [];

function start_reach(hiki){

  wait_last = [];

  for(var i=0; i<agarihai["trashed"+what_tile(hiki)].length; i++){//待ち牌の個数
    _$('aaaaa').appendChild(make(agarihai["trashed"+what_tile(hiki)][i]))  //待ち牌を表示
     wait_last.push( agarihai["trashed"+what_tile(hiki)][i] )//待ち牌を配列に入れる
  }

  for(var i=0; i<14; i++){  //カードピンクを元に戻す
    var card_tile = document.getElementById('card'+i)
    if(card_tile.style.background==='pink'){
       card_tile.style.background = 'white'
    }}

    naku_inactive()//メニューを消す
    _$('cancel').style.display='inline-block'

     player_trash(hiki)
     update_cards();
     align();//整列


     reach.doing = true;

     //com_trash1_reachi();  //自動動作を開始
     setTimeout(function(){
       com1.get()
     },200)
     //playerは上りはいいがい捨て続けるので別で関数の定義が必要
}


function _trash_(hiki){
    splice_tile_own(what_tile(hiki))
    player_trash(hiki)
    update_cards();  //cardsオブジェクトを更新
    align()         //cardを整列
    find_naku()  //自分が泣くことができる牌を見つけておく

 }

function player_trash(hiki){
  var tile = document.createElement('div')  //クリックしたタイルをtrashedに捨てる
      tile.className = hiki.className +'_ed'
      tile.innerHTML = hiki.innerHTML
      trashed.appendChild(tile);

      hiki.className = lasttile.className   //画面上の辻褄合わせ
      hiki.innerHTML = lasttile.innerHTML
      lasttile.className = ''
      lasttile.style.display = 'inline-block'
      lasttile.innerHTML = ''
}


function pair_random(){//牌をシャッフル
 init_pair()
 for(var i=0;i<134;i++){
     var rand = Math.floor(Math.random()*pair.length);
     pair_rand.push(pair[rand])
     pair.splice(rand,1)
   }
 }


function distribute(){ //card0 からcard12に中身の牌を入れる
  for(var i=0; i<13;i++){
   var card = document.getElementById('card'+i)
    card.className = tiles[kind[pair_rand[0][0]]]['class']
    card.innerHTML = tiles[kind[pair_rand[0][0]]]['val'+pair_rand[0][1]][0]
    tile_own.push(pair_rand[0])
    pair_rand.shift()
  }
}


function make(hiki){ //引数の配列に対応した文字とクラスのカードを作る
  var card = document.createElement('div');
      card.className = tiles[kind[hiki[0]]]['class']
      card.innerHTML = tiles[kind[hiki[0]]]['val'+hiki[1]][0]
      return card;
}

function _make(hiki){ //引数の配列に対応した文字とクラスのカードを作る(小さい)
  var card = document.createElement('div');
      card.className = tiles[kind[hiki[0]]]['class']+'_ed'
      card.innerHTML = tiles[kind[hiki[0]]]['val'+hiki[1]][0]
      return card;
}


function  align_tile_own(){
  for(var i=0; i<tile_own.length; i++){
    tile_own[i] =  what_tile(_$('card'+i));
        }
}



function splice_tile_own(hiki){

  for (var i = 0; i < tile_own.length; i++) {
       if( tile_own[i].toString() == hiki.toString() ){
          tile_own.splice(i,1);
          break;
              }   }
 }


function find_naku(){
  qi.find()
  pon.find()
}

function _1_9(hiki){   //配列の１番目の数字が1以上9以下を満たす
  if(hiki[1]>0 && hiki[1]<10){ return true  }
}


function what_tile(hiki){ //指定したタイルの配列番号を返す
         var ary = [];
       if( hiki.className === 'manzu_class'){ ary[0] = 0 }
  else if( hiki.className === 'pinzu_class'){ ary[0] = 1 }
  else if( hiki.className === 'souzu_class'){ ary[0] = 2 }

        if( hiki.innerHTML === '東'){ ary = [3,1] }
   else if( hiki.innerHTML === '南'){ ary = [3,2] }
   else if( hiki.innerHTML === '西'){ ary = [3,3] }
   else if( hiki.innerHTML === '北'){ ary = [3,4] }
   else if( hiki.innerHTML === '白'){ ary = [3,5] }
   else if( hiki.innerHTML === '發'){ ary = [3,6] }
   else if( hiki.innerHTML === '中'){ ary = [3,7] }
      else{  ary[1] = parseInt(hiki.innerHTML) }
        return ary;
}
