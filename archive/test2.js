function alpha(){
  this.ki67_model=function(){
    return 1
  }
  var c={
    //erPositive
    age: 0,
    node:  0.55850411,
    dia:  0.35537797,
    grade:  0.84479071,
    detection:  -0.35779565,
    chemo:  -0.31066269,
    hormo:  -0.04842342,
    ki67_model:this.ki67_model()
  }
  console.log(c)
}
alpha()

var n = 20
if(n%2==0){
  console.log(odd)
}else{
  console.log(even)
}

var odd=0
var even=0
for(var n=1;n<=100;n++){
  console.log(n)
  if(n%2==0){
    even++
  }else{
    odd++
  }
}
console.log("even numbers %d, odd numbers %d",even,odd)

var intStore = new Array()
for(var n=1;n<=100;n++){
  intStore[n]=n
}
console.log(intStore)

var oddNum = 0
var evenNum = 0
var oddArr = new Array()
var evenArr = new Array()

function isOdd(n){
  if(n%2 != 0){
    return true
  }else{
    return false
  }
}

for(var n = 0;n<100;n++){
  if(isOdd(n+1)){
    oddNum ++
    oddArr[oddNum]=n+1
  }else{
    evenNum ++
    evenArr[evenNum]=n+1
  }
}
