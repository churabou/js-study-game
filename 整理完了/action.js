var own={};

var qi, pon, kan, kouzu, junzu, tenpai;



kouzu = {

 able : [],

 find : function(){

            for(var i=0, len=tile_own.length; i<len; i++){
                if(own['value'+tile_own[i]]>2){
                  this.able.push(tile_own[i]);
                //  this.able["kouzu"+tile_own[i]] = tile_own[i]]
            }
                this.able = single(this.able)
          }
 },

//this.able にコウ図を満たす組が入る
 delete : function(hiki){
            for(var i=0; i<3; i++){//一回消すを3回する
                ary_remove(tile_own,hiki)
           }
 }

},

junzu = {

 able : [],

 find : function(){

               for(var i=0;i<tile_own.length;i++){

                if(tile_own[i][0] == 3){ continue;}//字牌でないことが前提
                var   left = [tile_own[i][0],tile_own[i][1]-1]   //今回は数値
                     right = [tile_own[i][0],tile_own[i][1]+1]

                  if( own["value"+left]>0 && own["value"+right]>0){//左右の牌があるなら
                    //junzu3['junzu '+left+' to '+right] = tile_own[i]
                    this.able.push(tile_own[i])
                    }
               }
                    this.able = single(this.able);
 },

 delete : function(hiki){

            var   left = [ hiki[0], hiki[1]-1 ],
                  cent = hiki,
                  right = [ hiki[0], hiki[1]+1 ];

                  ary_remove(tile_own,left)
                  ary_remove(tile_own,cent)
                  ary_remove(tile_own,right)

 }

},

pon = {

  doing : false,
  able : [],
  obj : null,  //ポンされる牌pair_rand[zzz]を安全に管理

  find : function(){
              this.able = [];
              for(var i=0, len = (tile_own.length-1); i<len; i++){
                   if(tile_own[i].toString() === tile_own[i+1].toString()){
                        this.able.push(tile_own[i]);
                   }
               this.able = single(this.able)//ダブりを除く
              }
  },

  process : function(){

                  //tile_ownからポンした分減らす
                  // 小さいタイルを追加
                  //
  }

}

qi = {

  doing : false,
  able : [],  //チーしたいやつ、チーしてできるやつ size=4
  pair : [],  //ある杯をチーすることでできる組み合わせを保持する。
  obj : null,   //チーされる杯 pair_rand[zzz]だがこちらで安全に管理


//できる組み合わせとじっさいに待つ組み合わせ

  find : function(){//境界をとっているから重複はない。

              this.able = [];
              for(var i=0, len=(tile_own.length-1); i< len; i++){

                 if(tile_own[i][0]==3){ continue; } //字牌を除外する

                 var left = [ tile_own[i][0],tile_own[i][1]-1]
                     cent = tile_own[i]
                     right = [ tile_own[i][0],tile_own[i][1]+1]
                     rightright = [ tile_own[i][0],tile_own[i][1]+2]

                  if( tile_own[i+1].toString() === right.toString() ){  // 2 3 --> 1 123 4 234
                     if( _1_9(left) ){  this.able.push(left,left,cent,right)  }
                     if( _1_9(rightright) ){   this.able.push(rightright,cent,right,rightright)}
                   }
               }
         },

  process : function(){}
}




function include(a,b){   //配列aに要素bが入っている--ture
  for(var i=0, len=a.length; i<len; i++){
      if(a[i].toString() == b.toString()){
        return true;
      }
  }
  return false;
}

function single(ary){//配列の要素にダブりがあったら削る
  var aim = [];
  for(var i=0, len=ary.length; i<len; i++ ){
      if(!include(aim,ary[i])){aim.push(ary[i])};
  }
  return aim;
}



function tile_own_s(a,b){
  return tile_own[2*a+b];
}

function tile_own_w(a){
  return [tile_own[2*a],tile_own[2*a+1]]
}


function count_tile(){

  own = {};
  for(var i=0, len=tile_own.length; i<len; i++){
     own["value"+tile_own[i]] = 0;
  }
  for(var i=0, len=tile_own.length; i<len; i++){
     own["value"+tile_own[i]] += 1;
  }

}


//ある配列からある要素をひとつ減らす。・・必ずあるはず

function ary_remove(ary,hiki){

  for( var i = 0; i < ary.length; i++ ){
    if( ary[i].toString() == hiki.toString() ){
       ary.splice(i,1);
       break;
    }  }

}
