// コンピュータークラスを作りインスタンスを三つ作る。

var  next_player;

Com = function(num,next){
  this.num = num;
//  this.next = next;
}

Com.prototype.hoge = function(){
  console.log("hoge"+" from "+this.num)
}


Com.prototype.get = function(){
  //get -- 捨てる牌を決める--
  this.trash(pair_rand[0])
}

Com.prototype.trash = function(ary){//プレイヤーの墓地にaryの杯を捨てる

            var card = document.createElement('div');
            card.innerHTML = tiles[kind[ary[0]]]['val'+ary[1]][0]
            card.className = tiles[kind[ary[0]]]['class']+'_ed'
            _$('trashed'+this.num).appendChild(card)

            if( ron_() ){ return }

            if(!reach.doing){ //リーチしたらチーはできない
               naki_gudge(ary)//ここでオプションが出る//捨てる牌に対して
            }
            //this.trash = ary this.trashed.push(ary)
            turn+=1
            pair_rand.shift()
            next_player = this.next

            if(_$('naku').style.display==='none'){//オプションがなしなら
              //  //setTimeout(this.next.get(),200)
               setTimeout(function(){
                next_player.get()//this
              },200)

             }

    }




var com1 = new Com(1)
var com2 = new Com(2)
var com3 = new Com(3)
com1.next = com2;
com2.next = com3;
com3.next = player;

var players = [player,com1,com2,com3];



function naki_gudge(ary){//コンピューターが捨てた時Userが泣けるかの判定

  for (var i = 0; i < pon.able.length; i++) {
    if(pon.able[i].toString() == ary.toString()){
      _$('naku').style.display='inline-block'//画面処理
      _$('pon').className='pon'
      pon.obj = ary//
    }
  }
  for (var i = 0; i < qi.able.length/4; i++) {
    if(qi.able[i*4].toString() == ary.toString()){
      _$('naku').style.display='inline-block' //画面処理
      _$('tii').className='pon'
       qi.pair.push(qi.able[4*i+1],qi.able[4*i+2],qi.able[4*i+3])
       qi.obj = qi.able[4*i]//ary[0]//
    }
  }

}

//
//
// function roop(i){
//
//   players[i].get()
//   i+1
//
//   if(_$('naku').style.display==='none'){
//     setTimeout(roop(i),500)
//   }
//
// }




//agarihai及びwait_this wait_lastらへんがよくわからない。
//泣いた時の処理。
//ロンする時は役がある時。
