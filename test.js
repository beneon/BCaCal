herER = new Array()
herER["er0her0"]=-0.0762;
herER["er0her1"]=0.2413;
herER["er1her0"]=[-0.052845376,-0.04630156,-0.039757744,-0.033213928,-0.026670112,-0.020126296,-0.01358248,-0.007038664,-0.000494848000000001,0.006048968]
herER["er1her1"]=[0.607721824,0.53246794,0.457214056,0.381960172,0.306706288,0.231452404,0.15619852,0.080944636,0.00569075200000001,0.006048968]
console.log(herER)
function test(){
  this.er = 0
  this.erMod = new Array()
  erMod[1]={
    //erPositive
    age: 0,
    node:  0.55850411,
    dia:  0.35537797,
    grade:  0.84479071,
    screen:  -0.35779565,
    chemo:  -0.31066269,
    hormo:  -0.04842342,
    ki67_model:0
  };
  erMod[2]={
    //erNegative
    age: 0,
    node:  0.43819463,
    dia:  0.36734320,
    grade:  0.40829403,
    screen:  -0.15051922,
    chemo:  -0.20071834,
    hormo:  0.35787131,
    ki67_model:0
  };
  erMod[0]={
    age: 0,
    node:  0,
    dia: 0,
    grade: 0,
    screen:  0,
    chemo:  0,
    hormo: 0,
    ki67_model:0
  }
  console.log(this.erMod[this.er])
}
test()
