function testRun(){
  console.log(oddOrEven(5))
}
function oddOrEven(n){
  var isOdd = false;
  if(n%2 != 0){
    isOdd = true;
  }
  return isOdd
}

testRun()
