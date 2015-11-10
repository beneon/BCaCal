var StrArray = {
  set:false,
  val:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  valReset:function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
  //这个是用来储存一个10个元素的数组，同时还另外加了一个set这个boolen，相当于一个optional的感觉
}
var UkBcaCal = {
    age:0,dia:0,nnum:0,grade:0,er:0,her:0,
    chemoGen:0,detection:0,ki67:0,hideChemo:false,
    chemoRed:[0.0,0.0,0.0,0.0],
    hormoRed:[0.0,0.0,0.0,0.0],
    blSurvival:[0.99948645,0.99845935,0.99743225,0.99640515,0.99537805,0.99435095,0.99332385,0.99229675,0.99126965,0.99024255],
    ernIntSurvival:[0.9982,0.9939,0.9941,0.9955,0.9956,0.9966,0.9985,0.99845,0.9985,0.99845],
    erpIntSurvival:[0.9999,0.9997,0.9994,0.9992,0.9992,0.9993,0.9992,0.9988,0.9990,0.9990],
    ki67_pos:0.149035579160488,
    ki67_neg:-0.113328685307003,
    _annuIncidence:{
  set:false,
  val:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  valReset:function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
},
    _annuIncidence:{
  set:false,
  val:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  valReset:function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
},
    _annualIncNB:{
  set:false,
  val:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  valReset:function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
},
    _relHazard:{
  set:false,
  val:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  valReset:function(){
    this.set = false;
    this.val = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  }
},
    cumOverallSurOL:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    cumOverallSurChemo:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    cumOverallSurHormo:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    cumOverallSurCandH:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    cumOverallSurCHT:[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    erpMod:{
      age: 0,
      node:  0.55850411,
      dia:  0.35537797,
      grade:  0.84479071,
      screen:  -0.35779565,
      chemo:  -0.31066269,
      hormo:  -0.04842342,
      ki67_model:0
    },
    ernMod:{
      age: 0,
      node:  0.43819463,
      dia:  0.36734320,
      grade:  0.40829403,
      screen:  -0.15051922,
      chemo:  -0.20071834,
      hormo:  0.35787131,
      ki67_model:0
    },
    herEr:{
      her2_ern_her2n:-0.0762,
      her2_ern_her2p:0.2413,
      her2_erp_her2n:[-0.052845376,-0.04630156,-0.039757744,-0.033213928,-0.026670112,-0.020126296,-0.01358248,-0.007038664,-0.000494848000000001,0.006048968],
      her2_erp_her2p:[0.607721824,0.53246794,0.457214056,0.381960172,0.306706288,0.231452404,0.15619852,0.080944636,0.00569075200000001,0.006048968],
    },
    initial:function(age,dia,nnum,grade,er,her,chemoGen,detection,ki67){
      this.age=age;
      this.dia=dia;
      this.nnum=nnum;
      this.grade=grade;
      this.er=er;
      this.her=her;
      this.chemoGen=chemoGen;
      this.detection=detection;
      this.ki67=ki67;
      this.cheHomRed();
      this._annuIncidence.valReset();
      this._annuIncidence.valReset();
      this._annualIncNB.valReset();
      this._relHazard.valReset();
    },
    ki67_model:function(){
      switch (this.ki67){
        case 1:
          return this.ki67_pos;
          break;
        case 2:
          return this.ki67_neg;
          break;
        default:
          return 0.0
      }
    },
    //erpos and er neg was corporated into er function
    erMod:function(){
      var erState = this.er;
      var ki67_model;
      var erMod;
      switch (erState) {
        case 1:
          ki67_model = this.ki67_model();
          erMod = this.erpMod;
          break;
        case 2:
          ki67_model = 0.0;
          erMod = this.ernMod;
          break;
        default:
          console.log("erState should be 1 for pos,2 for neg");
      }
      erMod.ki67_model = ki67_model;
      return erMod;
    },
    //her2这一块好像还不好
    ager:function(){
      var age = this.age;
      var newAge=2;

      if (age < 40) newAge=1;

      if (age >= 70) newAge=3;

      return newAge;
    },
    noder:function(){
      var nodes = this.nnum;
      var noder;
      if (nodes > 1) {
        noder=2;
      }else if (nodes > 4) {
        noder=3;
      }else if (nodes > 9) {
        noder=4;
      }else{
        noder=1.5
        //原来程序里面用的是1.5代表不正常情况，为什么用1.5
      }
      return noder;
    },
    sizer:function(){
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
    },
    efficHormo:function(selector){
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
    },
    riskRedChemoAge:function(ager){
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
    },
    efficTrast:function(){
      return this.her != 2?0.0:Math.log(0.7);
    },
    erLabel:function(){
      switch (this.er) {
        case 2:
          return "erp";
          break;
        case 1:
          return "ern";
          break;
        default:
          return "eru";
      }
    },
    cheHomRed:function(){

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
    },
    intSurvival:function(){
      var erLabel = this.erLabel();
      return erLabel == "ern"?
        [0.9982,0.9939,0.9941,0.9955,0.9956,0.9966,0.9985,0.99845,0.9985,0.99845]:
        [0.9999,0.9997,0.9994,0.9992,0.9992,0.9993,0.9992,0.9988,0.9990,0.9990];
    },
    //下面这些计算量会比较大，算过以后就存储起来比较好
    annualIncNB:function(){
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
    },
    relHazard:function(){
      if(!this._relHazard.set){
        var patientParams=[1,this.nnum,this.dia,this.grade,this.detection,0,0,1];
        var relHazard0 = 0.0;
        var relHazard=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
        var erMod = this.erMod();
        var erLabel = this.erLabel();
        var her = this.her;
        var herEr = this.herEr;
        var modelParams = [erMod.age,erMod.node,erMod.dia,erMod.grade,erMod.screen,erMod.chemo,erMod.hormo,erMod.ki67_model]
        for (var n=0;n<patientParams.length;n++){
          relHazard0 += patientParams[n]*modelParams[n];
        }
        for (var n=0;n<10;n++){
          relHazard[n] = relHazard0
        }
        if(her > 0){
          for(var n = 0;n<10;n++){
            if(erLabel == "erp"){
              if(her == 1){
                relHazard[n]+=herEr.her2_erp_her2n[n];
              }else if(her == 2){
                relHazard[n]+=herEr.her2_erp_her2p[n];
              }else{
                console.log("her2 is neither 1 or 2:"+her);
              }
            }else if(erLabel == "ern"){
              if(her == 1){
                relHazard[n]+=herEr.her2_ern_her2n;
              }else if(her == 2){
                relHazard[n]+=herEr.her2_ern_her2p;
              }else{
                console.log("her2 is neither 1 or 2:"+her);
              }
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
    },
    annuIncidence:function(){
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
    },
    bcSpecSur:function(){
      var cumIncidence = 0.0;
      var annuIncidence = this.annuIncidence();
      var bcSpecSur= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
      for(var n = 0;n<10;n++){
        cumIncidence+=annuIncidence[n];
        bcSpecSur[n]=Math.exp(-1.0*cumIncidence);
      }
      return bcSpecSur;
    },
    pySurv10OL:function(){
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
    },
    pySurv10Chemo:function(){
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
    },
    pySurv10Hormo:function(){
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
    },
    pySurv10CandH:function(){
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
    },
    pySurv10CHT:function(){
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
    },
    predict:function(){
      var bcSpecSur = this.bcSpecSur();
      var pySurv10OL = this.pySurv10OL();
      var pySurv10Chemo = this.pySurv10Chemo();
      var pySurv10Hormo = this.pySurv10Hormo();
      var pySurv10CandH = this.pySurv10CandH();
      var pySurv10CHT = this.pySurv10CHT();
      return [bcSpecSur, this.cumOverallSurOL, this.cumOverallSurChemo, this.cumOverallSurHormo, this.cumOverallSurCandH, this.cumOverallSurCHT,
              pySurv10OL, pySurv10Chemo, pySurv10Hormo, pySurv10CandH, pySurv10CHT];
    }
}
