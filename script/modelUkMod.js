// 对于uk model来说如果her、ki67存在未知值的时候算法是会出错的,grade如果选择未分化的时候也会出错
// 这个必须要在程序里面体现
function StrArray(){
  this.set=false;
  this.val=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  this.valReset=function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
}
function UkBcaCal(){
  this.age = 0;
  this.dia = 0;
  this.nnum = 0;
  this.nknown = false;
  this.grade = 0;
  this.er = 0;
  this.her = 0;
  this.chemoGen = 0;
  this.detection = 0;
  this.ki67 = 0;

  this.chemoGener = function(chemoPara){
    var result = [0,null,null,null,2,3]
    return result[chemoPara]
  }
  this.chemoRed = [0.0,0.0,0.0,0.0];
  this.hormoRed = [0.0,0.0,0.0,0.0];
  this.blSurvival = [0.99948645,0.99845935,0.99743225,0.99640515,0.99537805,0.99435095,0.99332385,0.99229675,0.99126965,0.99024255];
  this.ernIntSurvival=[0.9982,0.9939,0.9941,0.9955,0.9956,0.9966,0.9985,0.99845,0.9985,0.99845];
  this.erpIntSurvival=[0.9999,0.9997,0.9994,0.9992,0.9992,0.9993,0.9992,0.9988,0.9990,0.9990];
  this.ki67_pos = 0.149035579160488;
  this.ki67_neg = -0.113328685307003;
  this._annuIncidence = new StrArray();
  this._annualIncNB=new StrArray();
  this._relHazard=new StrArray();
  this.cumOverallSurOL=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  this.cumOverallSurChemo=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  this.cumOverallSurHormo=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  this.cumOverallSurCandH=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  this.cumOverallSurCHT=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  this.initial = function(age,dia,nnum,nknown,grade,er,her,chemoGen,detection,ki67){
    this.age=age;
    this.dia=dia;
    this.nnum=nnum;
    this.nknown=nknown;
    this.grade=grade;
    this.er=er;
    this.her=her;
    this.chemoGen=this.chemoGener(chemoGen);
    this.detection=detection;
    this.ki67=ki67;
    this.cheHomRed();
    this._annuIncidence.valReset();
    this._annualIncNB.valReset();
    this._relHazard.valReset();
    var parameterOK = true;
    if(her==0 || ki67 == 0 || this.chemoGen == null){
      parameterOK = false
    }
    return parameterOK
  };
  this.ki67_model=function(){
    var result = 0.0;
    if(this.ki67 == 1){
      result = this.ki67_pos;
    }else if(this.ki67 == 2){
      result = this.ki67_neg
    }
    //0,1,2:unknown,neg,pos
    return result
  }
  this.erMod = new Array()
  this.herEr = new Array()
  this.erMod[1]={
    //erPositive
    age: 0,
    node:  0.55850411,
    dia:  0.35537797,
    grade:  0.84479071,
    detection:  -0.35779565,
    chemo:  -0.31066269,
    hormo:  -0.04842342,
    ki67_model:0
  };
  this.erMod[2]={
    //erNegative
    age: 0,
    node:  0.43819463,
    dia:  0.36734320,
    grade:  0.40829403,
    detection:  -0.15051922,
    chemo:  -0.20071834,
    hormo:  0.35787131,
    ki67_model:0
  };
  this.erMod[0]={
    age: 0,
    node:  0,
    dia: 0,
    grade: 0,
    detection:  0,
    chemo:  0,
    hormo: 0,
    ki67_model:0
  }
  this.herEr["er2her2"]=-0.0762;
  this.herEr["er2her1"]=0.2413;
  this.herEr["er1her2"]=[-0.052845376,-0.04630156,-0.039757744,-0.033213928,-0.026670112,-0.020126296,-0.01358248,-0.007038664,-0.000494848000000001,0.006048968]
  this.herEr["er1her1"]=[0.607721824,0.53246794,0.457214056,0.381960172,0.306706288,0.231452404,0.15619852,0.080944636,0.00569075200000001,0.006048968]
  this.ager = function(){
    var age = this.age;
    var newAge=2;

    if (age < 40) newAge=1;

    if (age >= 70) newAge=3;

    return newAge;
  }
  this.noder = function(){
    var nodes = this.nnum;
    var nodesKnown = this.nknown;
    var noder;
    if (nodes > 1) {
      noder=2;
    }else if (nodes > 4) {
      noder=3;
    }else if (nodes > 9) {
      noder=4;
    }else if (nodes == 0){
      noder=1
    }else if(!nodesKnown){
      noder=1.5
    }
    return noder;
  }
  this.sizer = function(){
    var size = this.dia;
    var sizer;
    if(size>9){
      sizer = 2;
    }else if (size>19){
      sizer = 3;
    }else if (size>29){
      sizer = 4;
    }else if(sizer>49){
      sizer = 5;
    }else{
      sizer = 1.5;
    }
    return sizer;
  }
  this.grader = function(){
    var result = [2.13,1,2,3,4]
    //uk的tumor grade里面的1、2、3是怎么个对应啊？
    return result[this.grade]
  }
  this.detectioner = function(){
    var result=[0.204,0,1]
    return result[this.detection]
  }
  this.efficHormo = function(selector){
    var efficH_erp=Math.log((100.0-32.0)/100.0);
    var efficH_eru=Math.log((100.0-23.0)/100.0);
    switch (selector) {
      case "ern":
        return 0.0
        break;
      case "eru":
        return efficH_eru;
        break;
      case "erp":
        return efficH_erp;
        break;
      default:
        console.log("selector unknown"+selector);
    }
  }
  this.riskRedChemoAge = function(ager){
    //这里的ager和之前的不一样
    switch (ager) {
      case 1:
        return {  // access riskRedChemo_age1{ern}[1]

          "ern" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996],

          "eru" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996],

          "erp" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996]

        };
        break;
      case 2:
        return {

          "ern" : [ 0.0,-0.2484613592985,-0.478035800943,-0.673344553263766],

          "eru" : [ 0.0,-0.198450938723838,-0.415515443961666,-0.63487827243597],

          "erp" : [ 0.0,-0.174353387144778,-0.400477566597125,-0.59783700075562]

        };
        break;
      case 3:
        return {

          "ern" : [ 0.0,-0.127833371509885,-0.385662480811985,-0.59783700075562],

          "eru" : [ 0.0,-0.105360515657826,-0.328504066972036,-0.544727175441672],

          "erp" : [ 0.0,-0.083381608939051,-0.301105092783922,-0.510825623765991]

        };
        break;
      default:
        console.log("ager is abnormal"+ager);
        return;
    }
  }
  this.efficTrast = function(){
    return this.her != 2?0.0:Math.log(0.7);
  }
  this.erLabel = function(){
    var result = ["eru","erp","ern"]
    return result[this.er]
  }
  this.cheHomRed = function(){
    var ager;
    if(this.age < 50){
      ager = 1;
    }else if(this.age < 60){
      ager = 2;
    }else{
      ager = 3;
    }
    var erLabel = this.erLabel()
    for(var n=1;n<4;n++){
      this.hormoRed[n] = this.efficHormo(erLabel);
      this.chemoRed[n] = this.riskRedChemoAge(ager)[erLabel][n]
    }
  }
  this.intSurvival = function(){
    var erLabel = this.erLabel();
    return erLabel == "ern"?
      [0.9982,0.9939,0.9941,0.9955,0.9956,0.9966,0.9985,0.99845,0.9985,0.99845]:
      [0.9999,0.9997,0.9994,0.9992,0.9992,0.9993,0.9992,0.9988,0.9990,0.9990];
  }
  this.annualIncNB = function(){
    if(!this._annualIncNB.set){
      var blSurvival=[0.99948645,0.99845935,0.99743225,0.99640515,0.99537805,0.99435095,0.99332385,0.99229675,0.99126965,0.99024255];
      var intSurvival2=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      var annualIncNB= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];    //NB indicates non-breast
      intSurvival2[0]=blSurvival[0];
      for (var n = 1;n<10;n++){
        intSurvival2[n]=blSurvival[n]-blSurvival[n-1]+1.0;
      }
      for (var n=0;n<10;n++){
        annualIncNB[n]=-Math.log(Math.pow(intSurvival2[n],Math.exp(1.274565*(Math.pow(age/50.0,2.38)))));
      }
      this._annualIncNB.val = annualIncNB;
      this._annualIncNB.set = true;
    }
    return this._annualIncNB.val;
  }
  this.relHazard = function(){
    if(!this._relHazard.set){
      var patientParams=[1,this.noder(),this.sizer(),this.grader(),this.detectioner(),0,0,1];
      var relHazard0 = 0.0;
      var relHazard=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      var erMod = this.erMod[this.er];
      var her = this.her;
      var herEr = this.herEr;
      var modelParams = [erMod.age,erMod.node,erMod.dia,erMod.grade,erMod.detection,erMod.chemo,erMod.hormo,erMod.ki67_model]
      for (var n=0;n<patientParams.length;n++){
        relHazard0 += patientParams[n]*modelParams[n];
      }
      for (var n=0;n<10;n++){
        relHazard[n] = relHazard0
      }
      if(her > 0){
        for(var n = 0;n<10;n++){
          if(this.er == 1){
            relHazard[n]+=herEr["er1her"+her][n]
          }else if(this.er == 2){
              relHazard[n]+=herEr["er2her"+her]
          }else{
            continue;
          }
        }
      }
      for(var n = 0;n<10;n++){
        relHazard[n]=Math.exp(relHazard[n])
      }
      this._relHazard.val = relHazard;
      this._relHazard.set = true;
    }
    return this._relHazard.val;
  }
  this.annuIncidence = function(){
    if(!this._annuIncidence.set){
      var annuIncidence= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      var intSurvival = this.intSurvival();
      var relHazard = this.relHazard();
      for(var n=0;n<10;n++){
        annuIncidence[n]=-Math.log(Math.pow(intSurvival[n],relHazard[n]));
      }
      this._annuIncidence.val=annuIncidence;
      this._annuIncidence.set=true;
    }
    return this._annuIncidence.val
  }
  this.bcSpecSur = function(){
    var cumIncidence = 0.0;
    var annuIncidence = this.annuIncidence();
    var bcSpecSur= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    for(var n = 0;n<10;n++){
      cumIncidence+=annuIncidence[n];
      bcSpecSur[n]=Math.exp(-1.0*cumIncidence);
    }
    return bcSpecSur;
  }
  this.pySurv10OL = function(){
    var totalIncid= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
    var annuIncidence = this.annuIncidence();
    var annualIncNB = this.annualIncNB();
    var cumIncidence=0.0;  // reset
    var cumRisk=0.0;
    var prevcumRisk=0.0;
    var pySurv10OL=0.0;
    for (var n = 0;n<10;n++){
      totalIncid[n] = annualIncNB[n]+annuIncidence[n];
      cumIncidence+=totalIncid[n];
      this.cumOverallSurOL[n]=Math.exp(-1.0*cumIncidence);
      cumRisk=1.0-Math.exp(-1.0*cumIncidence);
      pySurv10OL+=0.5*(cumRisk+prevcumRisk);
      prevcumRisk=cumRisk;
    }
    pySurv10OL = 10.0 - pySurv10OL;
    return pySurv10OL;
  }
  this.pySurv10Chemo = function(){
    var chemoConst=Math.exp(this.chemoRed[this.chemoGen]);
    var cumBrIncidTreat=0.0;
    var cumCombIncidTreat=0.0;
    var pySurv10Chemo=0.0;   // person year survival to year 10 (Chemo)
    var cumRisk=0.0;   // reset
    var prevcumRisk=0.0;   // reset
    var annuIncidence = this.annuIncidence();
    var annualIncNB = this.annualIncNB();
    for(var n = 0;n<10;n++){
      cumBrIncidTreat=chemoConst*annuIncidence[n];
      cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n];

      this.cumOverallSurChemo[n]=Math.exp(-1.0*cumCombIncidTreat);

      cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

      pySurv10Chemo+=0.5*(cumRisk+prevcumRisk);

      prevcumRisk=cumRisk;

    }
    pySurv10Chemo = 10.0 - pySurv10Chemo;
    return pySurv10Chemo;
  }
  this.pySurv10Hormo = function(){
    var hormoConst=Math.exp(this.hormoRed[this.chemoGen]);  // n.b. dim is 0:3  0 not used

    var cumBrIncidTreat=0.0;

    var cumCombIncidTreat=0.0;

    var pySurv10Hormo=0.0;   // person year survival to year 10 (Hormo)

    var cumRisk=0.0;   // reset

    var prevcumRisk=0.0;   // reset
    var annuIncidence = this.annuIncidence();
    var annualIncNB = this.annualIncNB();

    for (var n = 0; n < 10; n++) {

      cumBrIncidTreat=hormoConst*annuIncidence[n];

      cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n];

      this.cumOverallSurHormo[n]=Math.exp(-1.0*cumCombIncidTreat);
      cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

      pySurv10Hormo+=0.5*(cumRisk+prevcumRisk);

      prevcumRisk=cumRisk;

    }

    pySurv10Hormo=10.0-pySurv10Hormo;
    return pySurv10Hormo;
  }
  this.pySurv10CandH = function(){
    var CandHConst=Math.exp(this.chemoRed[this.chemoGen]+this.hormoRed[this.chemoGen]);  // n.b. dim is 0:3  0 not used

    var cumOverallSurCandH= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    var cumBrIncidTreat=0.0;

    var cumCombIncidTreat=0.0;

    var pySurv10CandH=0.0;   // person year survival to year 10 (CandH)

    var cumRisk=0.0;   // reset

    var prevcumRisk=0.0;   // reset
    var annuIncidence = this.annuIncidence();
    var annualIncNB = this.annualIncNB();

    for (var n = 0; n < 10; n++) {

      cumBrIncidTreat=CandHConst*annuIncidence[n];

      cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n];

      this.cumOverallSurCandH[n]=Math.exp(-1.0*cumCombIncidTreat);

      cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

      pySurv10CandH+=0.5*(cumRisk+prevcumRisk);

      prevcumRisk=cumRisk;

    }
    pySurv10CandH=10.0-pySurv10CandH;
    return pySurv10CandH;
  }
  this.pySurv10CHT=function(){
    var CHTConst0to5yrs=Math.exp(this.chemoRed[this.chemoGen]+this.hormoRed[this.chemoGen]+this.efficTrast());
    var CHTConst5to9yrs=Math.exp(this.chemoRed[this.chemoGen]+this.hormoRed[this.chemoGen]);

    var CHTConst;

    var cumOverallSurCHT= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    cumBrIncidTreat=0.0;

    cumCombIncidTreat=0.0;

    var pySurv10CHT=0.0;   // person year survival to year 10 (CHT)

    cumRisk=0.0;   // reset

    prevcumRisk=0.0;   // reset
    var annuIncidence = this.annuIncidence();
    var annualIncNB = this.annualIncNB();

    for (var n = 1; n <= 10; n++) {
      CHTConst=CHTConst0to5yrs;
      if (n > 5) CHTConst=CHTConst5to9yrs;  // apply at 5years and over
      cumBrIncidTreat=CHTConst*annuIncidence[n-1];

      cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n-1];
      this.cumOverallSurCHT[n-1]=Math.exp(-1.0*cumCombIncidTreat);

    //alert(CHTConst+" "+cumBrIncidTreat+" "+cumCombIncidTreat+" "+cumOverallSurCHT[n-1]);



      cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

      pySurv10CHT+=0.5*(cumRisk+prevcumRisk);

      prevcumRisk=cumRisk;

    }

    pySurv10CHT=10.0-pySurv10CHT;
    return pySurv10CHT;
  }
  this.predict = function(){
    var bcSpecSur = this.bcSpecSur();
    var pySurv10OL = this.pySurv10OL();
    var pySurv10Chemo = this.pySurv10Chemo();
    var pySurv10Hormo = this.pySurv10Hormo();
    var pySurv10CandH = this.pySurv10CandH();
    var pySurv10CHT = this.pySurv10CHT();
    var result = new Array()
    result["bcSpecSur"]=bcSpecSur
    result["cumOverallSurOL"]=this.cumOverallSurOL
    result["cumOverallSurChemo"]=this.cumOverallSurChemo
    result["cumOverallSurHormo"]=this.cumOverallSurHormo
    result["cumOverallSurCandH"]=this.cumOverallSurCandH
    result["cumOverallSurCHT"]=this.cumOverallSurCHT
    result["pySurv10OL"]=pySurv10OL
    result["pySurv10Chemo"]=pySurv10Chemo
    result["pySurv10Hormo"]=pySurv10Hormo
    result["pySurv10CandH"]=pySurv10CandH
    result["pySurv10CHT"]=pySurv10CHT
    return result
  }
}
