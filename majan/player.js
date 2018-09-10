//player関数
function get(){

   lasttile.innerHTML = tiles[kind[pair_rand[0][0]]]['val'+pair_rand[0][1]][0]
   lasttile.className = tiles[kind[pair_rand[0][0]]]['class']//牌の中身を入れて
   tile_own.push(pair_rand[0])

   if(!reach.doing){//通常時
      console.log(tile_own.length)//デバッグ用
      turn+=1
      pair_rand.shift();
      player.gudge()//リーチできるかの判定
    }


   if(reach.doing){//もしプレイヤーがリーチしているならば
         tumo_()//つもの判定
         player_trash(lasttile)
         setTimeout(function(){
           com1.get()
         },200)
    }

  }


function tumo_(){  //pair_rand[0] or uset.get
  for(var i=0; i<wait_last.length; i++){  //ゲットした牌が待ち牌なら
     if(wait_last[i].toString() === what_tile(lasttile).toString()){
        _$('naku').style.display='inline-block'
        _$('tumo').className='pon'
        return;
      }
    }
}

function ron_(){
       for(var i=0; i<wait_last.length; i++){  //ゲットした牌が待ち牌なら
         if(wait_last[i].toString() === pair_rand[0].toString()){
           _$('naku').style.display='inline-block'
           _$('ron').className='pon'
           return true;
            }
         }
}

function launch(){//自分の手持ちのリーチ判定
  agarihai= {};  //適当な初期化位置を模索中
  suteru =[];
  if(menzen){ tenpai.gudge() }
  if(!menzen){ tenpai.gudge_naki(); return;}
  if(Object.keys(agarihai).length>0){  tenpai_display()   }//agarihaiがあるならばリーチ可能にする
};




var player = {
      get : get,
      trash : player_trash,
      gudge : launch,  //リーチならリーチのメニューを出す
      reach : start_reach
}

var reach = {};

reach.doing = false;
