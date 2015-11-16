function a(){
  this.b = function(){
    return 3
  }
  this.c = function c(){
    return 4
  }
}
var e = new a()
console.log(e.b())

function b(){
  function aa(){
    return 100
  }
  return aa()
}

console.log(b())

function her(herPara){
  var gPara = [1,1.515,0.9662]
  if(herPara <= 2 && herPara>=0){
    return gPara[herPara]
  }else{
    console.log("herPara is wrong")
    return 1
  }
}
console.log(her(10))
