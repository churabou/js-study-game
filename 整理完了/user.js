var player, com1, com2, com3;


User = function(name){
  this.name = name;
  this.hand = [];
  this.trash = null;//鳴く時に安全にアクセスできる
  this.trashed = []; //フリテンがあるから捨てた牌を管理

  this.next = null;
  this.enemy = null;
}

User.prototype.say = function(){
  console.log('i am' + this.name);
}

var taro = new User('taro');
taro.say();

player = {
  hand : [], //そのプレイヤーが所持している牌
  trash : null,//プレイヤーが捨てたぱ
  next : com1,//次のプレイヤー
  enemy : [com1,com2,com3],//こいつらに泣かれる
}

//
// function distribute_(){
//
//   for(var i=0; i<3; i++){
//     for(var j=0; j<4; j++){  //var players=[player,com1,com2,com3]
//
//        for(var k=0; k<4; k++){   //四個入れる
//           players[j].distribute()
//         }
//     }
//   }
//
//   for(var k=0; k<4; k++){   //四個入れる
//      players[j].distribute()
//    }
//
// }
