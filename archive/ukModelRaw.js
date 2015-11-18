/* Predict survival (derived from script predict.ppl) */



/* Perform survival prediction, reading values from one form, and

   populating a second. */

function perform_prediction() {

  var age, size, nodes;

  age = parseInt(document.getElementById("age").value);

  if (document.getElementById("size").value.match(/^ *$/))

    size = 9998; // Unknown for web interface

  else

    size = parseInt(document.getElementById("size").value);

  if (document.getElementById("nodes").value.match(/^ *$/))

    nodes = 9998; // Unknown for web interface

  else

    nodes = parseInt(document.getElementById("nodes").value);

  var form = document.forms["predictForm"];



  var grade = parseInt(get_radio_value(form.grade));

  var erstat = parseFloat(get_radio_value(form.erstat));

  var detection = parseFloat(get_radio_value(form.detection));

  var comor = 0; //Has no effect on model. Was: parseInt(get_radio_value(form.comor));

  var chemoGen = parseInt(get_radio_value(form.chemoGen));

  var her2 = parseFloat(get_radio_value(form.her2));

  var ki67 = parseFloat(get_radio_value(form.ki67));

  var hideChemo;

  if (chemoGen == 0) {

    // Hide chemotherapy information, but make the model work

    hideChemo = true;

    chemoGen = 1;

  } else {

    hideChemo = false;

  }

// n.b. size & nodes fields are left blank in form if unknown

      //document.getElementById("size").value == "" ||

      //document.getElementById("nodes").value == "" ||

  if (document.getElementById("age").value == "" ||

      grade == -9999 || erstat == -9999 || detection == -9999 ||

      comor == -9999 || chemoGen == -9999 ||

      her2 == -9999 || ki67 == -9999) {

    alert("Please complete all fields before predicting survival.");

    return; // Abort if any fields blank / radio boxes unchecked

  }

  if (age < 0 || size < 0 || nodes < 0) {

    alert("Negative age / tumour size / number of nodes is not possible.")

    return; // Abort if invalid arguments

  }



  var result = predict(age, size, nodes, grade, erstat, detection, comor, chemoGen, her2, ki67);



  var bcSpecSur = result[0];

  var cumOverallSurOL = result[1];

  var cumOverallSurChemo = result[2];

  var cumOverallSurHormo = result[3];

  var cumOverallSurCandH = result[4];

  var cumOverallSurCHT = result[5]

  var pySurv10OL = result[6];

  var pySurv10Chemo = result[7];

  var pySurv10Hormo = result[8];

  var pySurv10CandH = result[9];

  var pySurv10CHT = result[10];





  // print final results

  var ovs = cumOverallSurOL[3];

  document.getElementById("surv4_bcSpec").value = percent(bcSpecSur[3]);

  document.getElementById("surv4_OL").value = percent(ovs);

  document.getElementById("surv4_Chemo").value = percent(cumOverallSurChemo[3]-ovs);

  document.getElementById("surv4_Hormo").value = percent(cumOverallSurHormo[3]-ovs);

  document.getElementById("surv4_CandH").value = percent(cumOverallSurCandH[3]-ovs);

  document.getElementById("surv4_CHT").value = percent(cumOverallSurCHT[3]-ovs);



  ovs = cumOverallSurOL[4];

  document.getElementById("surv5_bcSpec").value = percent(bcSpecSur[4]);

  document.getElementById("surv5_OL").value = percent(ovs);

  document.getElementById("surv5_Chemo").value = percent(cumOverallSurChemo[4]-ovs);

  document.getElementById("surv5_Hormo").value = percent(cumOverallSurHormo[4]-ovs);

  document.getElementById("surv5_CandH").value = percent(cumOverallSurCandH[4]-ovs);

  document.getElementById("surv5_CHT").value = percent(cumOverallSurCHT[4]-ovs);

  var chart5_ovs = chart_percent(ovs);

  var chart5_hormo = chart_percent(cumOverallSurHormo[4]-ovs);

  var chart5_chemo = chart_percent(cumOverallSurChemo[4]-ovs);

  var chart5_candh = chart_percent(cumOverallSurCandH[4]-ovs);

  var chart5_cht = chart_percent(cumOverallSurCHT[4]-ovs)

  // "Fix" rounding of the chart, so that it shows the difference between rounded values, rather than the rounded difference between values

  //chart5_chemo_add = chart_percent(cumOverallSurCandH[4]-cumOverallSurHormo[4]);

  var chart5_chemo_add = chart_percent(parseFloat(chart5_candh)/100 - parseFloat(chart5_hormo)/100);

  // Still correct for ER negative, as hormone benefit is then 0

  var chart5_tram_add = chart_percent(parseFloat(chart5_cht)/100 - parseFloat(chart5_candh)/100);

  var text5_ovs = text_percent(ovs);

  var text5_hormo = text_percent(cumOverallSurHormo[4]-ovs);

  var text5_chemo = text_percent(cumOverallSurChemo[4]-ovs);

  var text5_candh = text_percent(cumOverallSurCandH[4]-ovs);

  var text5_cht = text_percent(cumOverallSurCHT[4]-ovs)



  ovs = cumOverallSurOL[9];

  document.getElementById("surv10_bcSpec").value = percent(bcSpecSur[9]);

  document.getElementById("surv10_OL").value = percent(ovs);

  document.getElementById("surv10_Chemo").value = percent(cumOverallSurChemo[9]-ovs);

  document.getElementById("surv10_Hormo").value = percent(cumOverallSurHormo[9]-ovs);

  document.getElementById("surv10_CandH").value = percent(cumOverallSurCandH[9]-ovs);

  document.getElementById("surv10_CHT").value = percent(cumOverallSurCHT[9]-ovs);

  var chart10_ovs = chart_percent(ovs);

  var chart10_hormo = chart_percent(cumOverallSurHormo[9]-ovs);

  var chart10_chemo = chart_percent(cumOverallSurChemo[9]-ovs);

  var chart10_candh = chart_percent(cumOverallSurCandH[9]-ovs);

  var chart10_cht = chart_percent(cumOverallSurCHT[9]-ovs)

  // "Fix" rounding of the chart, so that it shows the difference between rounded values, rather than the rounded difference between values

  //chart10_chemo_add = chart_percent(cumOverallSurCandH[9]-cumOverallSurHormo[9]);

  var chart10_chemo_add = chart_percent(parseFloat(chart10_candh)/100 - parseFloat(chart10_hormo)/100);

  // Still correct for ER negative, as hormone benefit is then 0

  var chart10_tram_add = chart_percent(parseFloat(chart10_cht)/100 - parseFloat(chart10_candh)/100);

  var text10_ovs = text_percent(ovs);

  var text10_hormo = text_percent(cumOverallSurHormo[9]-ovs);

  var text10_chemo = text_percent(cumOverallSurChemo[9]-ovs);

  var text10_candh = text_percent(cumOverallSurCandH[9]-ovs);

  var text10_cht = text_percent(cumOverallSurCHT[9]-ovs)



  ovs = pySurv10OL;

  document.getElementById("py_OL").value = (ovs).toFixed(2);

  document.getElementById("py_Chemo").value = (pySurv10Chemo-ovs).toFixed(2);

  document.getElementById("py_Hormo").value = (pySurv10Hormo-ovs).toFixed(2);

  document.getElementById("py_CandH").value = (pySurv10CandH-ovs).toFixed(2);

  document.getElementById("py_CHT").value = (pySurv10CHT-ovs).toFixed(2);



// make sure graph variables that should be zero are zero

// this can occur since these are all calculated regardless of regime

  if (erstat > 0.0) {

    // ER positive  (have hormone therapy)

    if (hideChemo) {

      chart5_chemo_add=0.0;

      chart10_chemo_add=0.0;

    }

  } else {

    // ER negative  (no hormone therapy)

    chart5_hormo=0.0;

    chart10_hormo=0.0;

    if (hideChemo) {

      chart5_chemo_add=0.0;

      chart10_chemo_add=0.0;

    }

  }

  // Can only have tras effect if HER2 positive and a chemo regime

  if (her2 != 2 || hideChemo) {

    chart5_tram_add=0.0;

    chart10_tram_add=0.0;

  }

  document.getElementById('chart5_ovs').value = chart5_ovs;

  document.getElementById('chart5_hormo').value = chart5_hormo;

  document.getElementById('chart5_chemo_add').value = chart5_chemo_add;

  document.getElementById('chart5_tram_add').value = chart5_tram_add;

  document.getElementById('chart10_ovs').value = chart10_ovs;

  document.getElementById('chart10_hormo').value = chart10_hormo;

  document.getElementById('chart10_chemo_add').value = chart10_chemo_add;

  document.getElementById('chart10_tram_add').value = chart10_tram_add;



  // Update textual summary

  document.getElementById("surv5_OL_100").innerHTML= text5_ovs;

  document.getElementById("surv5_Hormo_100").innerHTML= text5_hormo;

  document.getElementById("surv5_Chemo_100").innerHTML= text5_chemo;

  document.getElementById("surv5_CandH_100").innerHTML= text5_candh;

  document.getElementById("surv5_CHT_100").innerHTML= text5_cht;

  document.getElementById("surv10_OL_100").innerHTML= text10_ovs;

  document.getElementById("surv10_Hormo_100").innerHTML= text10_hormo;

  document.getElementById("surv10_Chemo_100").innerHTML= text10_chemo;

  document.getElementById("surv10_CandH_100").innerHTML= text10_candh;

  document.getElementById("surv10_CHT_100").innerHTML= text10_cht;



  // Hide or show appropriate textual fields

  var er_pos_display, er_neg_display, cht_extra_text, display;

  if (erstat > 0.0) {

     // ER positive

     er_pos_display = "inline";

     er_neg_display = "none";

     cht_extra_text = 'hormone therapy, '

  } else {

     er_pos_display = "none";

     er_neg_display = "inline";

     cht_extra_text = ''

  }

     //document.getElementById('edetails').style.display='block'

     //or 'none'

  for (var i = 1; i <= 4; i++) {

    if (hideChemo && (i % 2 == 0))

      display = "none";

    else

      display = er_pos_display;

    document.getElementById("er_pos_only_" + i).style.display = display;

  }

  for (var i = 1; i <= 2; i++) {

    if (hideChemo)

      display = "none";

    else

      display = er_neg_display;

    document.getElementById("er_neg_only_" + i).style.display = display;

  }

  for (var i = 1; i <= 2; i++) {

    if (her2 == 2 && !hideChemo) {

      display = "inline";

    } else {

      display = "none";

    }

    document.getElementById("her2_pos_only_" + i).style.display = display;

    document.getElementById("cht_extra_text_" + i).innerHTML= cht_extra_text;

  }



}



/* Predicts survival based on patient input parameters.

   Returns an array of: [bcSpecSur, cumOverallSurOL, cumOverallSurChemo, cumOverallSurHormo, cumOverallSurCandH, cumOverallSurCHT,

   pySurv10OL, pySurv10Chemo, pySurv10Hormo, pySurv10CandH, pySurv10CHT]

   The first 5 are arrays of survival, indexed by number of years (e.g. bcSpecSur[4] is for 5 year survival)

   The remaining 4 are float values, in person years.



   Arguments age, size and nodes are entered as values; the others as lookups

   # This is how the model assigns input parameters (or ranges)

   # into variables

   # i.e. parameter (or ranges) -> Predict model variable setting

   # Age (<40,40-69,>=70) -> (1,2,3)

   # Node group (0,1,2-4,5-9,10-99,>=100,unknown) -> (0,1,2,3,4,1.5,1.5)

   # Tumour size (0-9,10-19,20-29,30-49,>=50,unknown) -> (1,2,3,4,5,1.5)

   # Tumour Grade (1,2,3,unknown) -> (1,2,3,2.13)

   # ER Status (-ve,+ve,unknown) -> (0.0,1.0,0.5)

   # Detection (Clinical,Screening,Other) -> (0.0,1.0,0.204)

   # Comorbidity (no,yes) -> (0,1)

   # Chemo (1st,2nd,3rd) -> (1,2,3)

   # HER2 Status (-ve,+ve,unknown) -> (1,2,0)

   # KI67 Status (-ve,+ve,unknown) -> (1,2,0)

*/

function predict(age, size, nodes, grade, erstat, detection, comor, chemoGen, her2, ki67) {



  var ki67_pos=0.149035579160488;

  var ki67_neg=-0.113328685307003;

  var ki67_model=0.0;

  if (ki67 == 2) ki67_model=ki67_pos;

  if (ki67 == 1) ki67_model=ki67_neg;



  var erPos = {

    age: 0,

    node:  0.55850411,

    size:  0.35537797,

    grade:  0.84479071,

    screen:  -0.35779565,

    chemo:  -0.31066269,

    hormo:  -0.04842342,

    ki67:  ki67_model};



  var erNeg = {

    age: 0,

    node:  0.43819463,

    size:  0.36734320,

    grade:  0.40829403,

    screen:  -0.15051922,

    chemo:  -0.20071834,

    hormo:  0.35787131,

    ki67:  0.0};



  //

  // Her2 coefficients correspond to case of ER -ve and +ve

  // i.e. 4 cases of combinations of HER2 and ER -ve and +ve

  //

  var her2_ern_her2n= -0.0762;

  var her2_ern_her2p= 0.2413;

  var her2_erp_her2n=[-0.052845376,-0.04630156,-0.039757744,-0.033213928,-0.026670112,-0.020126296,-0.01358248,-0.007038664,-0.000494848000000001,0.006048968];

  var her2_erp_her2p=[0.607721824,0.53246794,0.457214056,0.381960172,0.306706288,0.231452404,0.15619852,0.080944636,0.00569075200000001,0.006048968];



  // Node group (0,1,2-4,5-9,10-99,>=100,unknown) -> (0,1,2,3,4,1.5,1.5)

  // Tumour size (0-9,10-19,20-29,30-49,>=50,unknown) -> (1,2,3,4,5,1.5)



  // TODO: Negative / zero noder / sizer arguments??? Maybe fix can-run validation

  var ager=2;

  if (age < 40) ager=1;

  if (age >= 70) ager=3;

  var noder=nodes;

  if (nodes > 1) noder=2;

  if (nodes > 4) noder=3;

  if (nodes > 9) noder=4;

  if (nodes > 99) noder=1.5;

  // take care of undef value of 77 (-> 1.5)

  //if (nodes == 77) noder=1.5;   // bcou data // Not needed for web interface

  if (nodes == 99) noder=1.5;

  //if (nodes =~ /a/) noder=1.5; // Not needed for web interface

  if (nodes == 9998) noder=1.5; // "Unknown" for web interface

  var sizer=1;

  if (size > 9) sizer=2;

  if (size > 19) sizer=3;

  if (size > 29) sizer=4;

  if (size > 49) sizer=5;

  //if (size =~ /a/) sizer=1.5; // Not needed for web interface

  //if (size == "") sizer=1.5; // Not needed for web interface

  if (size == 9998) sizer=1.5; // "Unknown" for web interface



  var er = erNeg;

  if (erstat > 0.0) er = erPos;



  var erLabel="eru";     // refers to ER Unknown

  if (erstat < 0.1) erLabel="ern";

  if (erstat > 0.9) erLabel="erp";

  //alert("ER label is: " + erLabel + erstat);

  //

  // end of data input section

  //

  // Basically the model calculate a set of tables (arrays) for various

  // predictions over 1-10 years then you can look up whatever piece

  // of data you need for outputting

  //

  // define risk reduction model coefficients

  // n.b. combo (chemo + hormo) not used

  var efficH_erp=Math.log((100.0-32.0)/100.0);  // natural log (ER Positive)

  var efficH_eru=Math.log((100.0-23.0)/100.0);  // natural log (ER Unknown)

  var efficHormo={"ern" : 0.0, "eru" : efficH_eru, "erp" : efficH_erp};



  var riskRedChemo_age1 = {  // access riskRedChemo_age1{ern}[1]

    "ern" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996],

    "eru" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996],

    "erp" : [ 0.0,-0.356674943938732,-0.579818495252942,-0.776528789498996]

  };

  var riskRedChemo_age2 = {

    "ern" : [ 0.0,-0.2484613592985,-0.478035800943,-0.673344553263766],

    "eru" : [ 0.0,-0.198450938723838,-0.415515443961666,-0.63487827243597],

    "erp" : [ 0.0,-0.174353387144778,-0.400477566597125,-0.59783700075562]

  };

  var riskRedChemo_age3 = {

    "ern" : [ 0.0,-0.127833371509885,-0.385662480811985,-0.59783700075562],

    "eru" : [ 0.0,-0.105360515657826,-0.328504066972036,-0.544727175441672],

    "erp" : [ 0.0,-0.083381608939051,-0.301105092783922,-0.510825623765991]

  };



  // define Efficacy of Trastuzumab addition

  var efficTrast=Math.log(0.7);

  // n.b. Efficacy of Trastuzumab is independent on Chemo Generation

  // and is only relevant for HER2 Positive (zero if otherwise)





  if (her2 != 2) efficTrast=0.0;



  var chemoRed= [0.0, 0.0, 0.0, 0.0];

  var hormoRed= [0.0, 0.0, 0.0, 0.0];

  // loop over 3 chemo generation types

  // n.b. combo (chemo + hormo) risk reduction NOT used

  for (var n = 1; n <= 3; n++) {

    hormoRed[n]=efficHormo[erLabel];

    if( age < 50 ) {

      chemoRed[n]=riskRedChemo_age1[erLabel][n];

    } else if( age >= 60 ) {

      chemoRed[n]=riskRedChemo_age3[erLabel][n];

    } else {

      chemoRed[n]=riskRedChemo_age2[erLabel][n];

    }

  //alert("" + chemoRed[n] + " " + hormoRed[n]);

  }

  // Baseline Hazard section

  // define interval survival for years 1-10 for erp & ern

  // if er unknown default to er pos

  //

  var intSurvival=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  if ( erLabel == "ern" ) {

    intSurvival=[0.9982,0.9939,0.9941,0.9955,0.9956,0.9966,0.9985,0.99845,0.9985,0.99845];

  } else {

    intSurvival=[0.9999,0.9997,0.9994,0.9992,0.9992,0.9993,0.9992,0.9988,0.9990,0.9990];

  }



  // model for competing death (non-breast mortality - age adjusted)

  var blSurvival=[0.99948645,0.99845935,0.99743225,0.99640515,0.99537805,0.99435095,0.99332385,0.99229675,0.99126965,0.99024255];



  var intSurvival2=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  intSurvival2[0]=blSurvival[0];

  for (var n = 2; n <= 10; n++) {

    intSurvival2[n-1]=blSurvival[n-1]-blSurvival[n-2]+1.0;

  }

  var annualIncNB= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];    // NB indicates non-breast

  for (var n = 1; n <= 10; n++) {

    annualIncNB[n-1]=-Math.log(Math.pow(intSurvival2[n-1],Math.exp(1.274565*(Math.pow(age/50.0,2.38)))));

  //alert("" + intSurvival[n-1] + " " + intSurvival2[n-1] + " " + annualIncNB[n-1]);

  }



  // model table for chemo or hormone

  // calculate relative hazard as exp sum of model coefficients * patient parameters

  // n.b. effect of chemo and hormo not curently modelled in this calculation

  //

  var patientParams=[1,noder,sizer,grade,detection,0,0,1];

  var relHazard0=0.0;

  var relHazard=[0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];



  var modelParams=[er["age"],er["node"],er["size"],er["grade"],er["screen"],er["chemo"],er["hormo"],er["ki67"]];

  // n.b. at this stage relative hazard is constant over years

  for (var n = 0; n < patientParams.length; n++) {

    relHazard0+=patientParams[n]*modelParams[n];

  }

  for (var n = 1; n <= 10; n++) {

    relHazard[n-1]=relHazard0;

  }

  // HER2 effects introduces time dependence on relative hazard

  // N.B. There must be no effect from Her2 model if ER status is unknown

  if ( her2 > 0 ) {

    for (var n = 1; n <= 10; n++) {

      if ( erLabel == "erp" && her2 == 1 ) {

        relHazard[n-1]+=her2_erp_her2n[n-1];

      } else if ( erLabel == "erp" && her2 == 2 ) {

        relHazard[n-1]+=her2_erp_her2p[n-1];

      } else if ( erLabel == "ern" && her2 == 1 ) {

        relHazard[n-1]+=her2_ern_her2n;

      } else if ( erLabel == "ern" && her2 == 2 ) {

        relHazard[n-1]+=her2_ern_her2p;

      }

    }

  }

  for (var n = 1; n <= 10; n++) {

    relHazard[n-1]=Math.exp(relHazard[n-1]);

  }

  //alert(modelParams);

  //alert(patientParams);

  //alert("Rel haz: " + relHazard);

  var annuIncidence= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  for (var n = 1; n <= 10; n++) {

    annuIncidence[n-1]=-Math.log(Math.pow(intSurvival[n-1],relHazard[n-1]));

  }

  //alert(annuIncidence);

  //

  // BC specific life table

  //

  var cumIncidence=0.0;

  var bcSpecSur= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  for (var n = 1; n <= 10; n++) {

    cumIncidence+=annuIncidence[n-1];

    bcSpecSur[n-1]=Math.exp(-1.0*cumIncidence);

  }

  //

  // overall life (OL) table

  //

  var totalIncid= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  var cumOverallSurOL= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  cumIncidence=0.0;  // reset

  var cumRisk=0.0;

  var prevcumRisk=0.0;

  var pySurv10OL=0.0;   // person year survival to year 10 (Overall Life)

  for (var n = 1; n <= 10; n++) {



    totalIncid[n-1]=annualIncNB[n-1]+annuIncidence[n-1];

    cumIncidence+=totalIncid[n-1];

    cumOverallSurOL[n-1]=Math.exp(-1.0*cumIncidence);

    //alert("" + bcSpecSur[n-1] + "" + cumOverallSurOL[n-1]);



    cumRisk=1.0-Math.exp(-1.0*cumIncidence);

    pySurv10OL+=0.5*(cumRisk+prevcumRisk);

    prevcumRisk=cumRisk;

  }

  pySurv10OL=10.0-pySurv10OL;

  //alert("PY sur 10 (OL): " + pySurv10OL);

  //

  // Various treatment effects tables follow

  //

  // 1) Chemo table

  //

  var chemoConst=Math.exp(chemoRed[chemoGen]);  // n.b. dim is 0:3  0 not used

  var cumOverallSurChemo= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  var cumBrIncidTreat=0.0;

  var cumCombIncidTreat=0.0;

  var pySurv10Chemo=0.0;   // person year survival to year 10 (Chemo)

  cumRisk=0.0;   // reset

  prevcumRisk=0.0;   // reset

  for (var n = 1; n <= 10; n++) {

    cumBrIncidTreat=chemoConst*annuIncidence[n-1];

    cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n-1];

    cumOverallSurChemo[n-1]=Math.exp(-1.0*cumCombIncidTreat);

  //alert("" + chemoConst + " " + cumBrIncidTreat + " " + cumCombIncidTreat + " " + cumOverallSurChemo[n-1]);



    cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

    pySurv10Chemo+=0.5*(cumRisk+prevcumRisk);

    prevcumRisk=cumRisk;

  }

  pySurv10Chemo=10.0-pySurv10Chemo;

  //alert("PY sur 10 (OL): " + pySurv10Chemo);

  //

  // 2) Hormo table

  //

  // n.b. although hormo const not a function of chemo it is dimensioned such

  var hormoConst=Math.exp(hormoRed[chemoGen]);  // n.b. dim is 0:3  0 not used

  var cumOverallSurHormo= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  cumBrIncidTreat=0.0;

  cumCombIncidTreat=0.0;

  var pySurv10Hormo=0.0;   // person year survival to year 10 (Hormo)

  cumRisk=0.0;   // reset

  prevcumRisk=0.0;   // reset

  for (var n = 1; n <= 10; n++) {

    cumBrIncidTreat=hormoConst*annuIncidence[n-1];

    cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n-1];

    cumOverallSurHormo[n-1]=Math.exp(-1.0*cumCombIncidTreat);

  //alert("" + hormoConst + " " + cumBrIncidTreat + " " + cumCombIncidTreat + " " + cumOverallSurHormo[n-1]);



    cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

    pySurv10Hormo+=0.5*(cumRisk+prevcumRisk);

    prevcumRisk=cumRisk;

  }

  pySurv10Hormo=10.0-pySurv10Hormo;

  //alert("PY sur 10 (OL): " + pySurv10Hormo);

  //

  // 3) Combined Chemo & Hormo table (CandH)

  //

  var CandHConst=Math.exp(chemoRed[chemoGen]+hormoRed[chemoGen]);  // n.b. dim is 0:3  0 not used

  var cumOverallSurCandH= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  cumBrIncidTreat=0.0;

  cumCombIncidTreat=0.0;

  var pySurv10CandH=0.0;   // person year survival to year 10 (CandH)

  cumRisk=0.0;   // reset

  prevcumRisk=0.0;   // reset

  for (var n = 1; n <= 10; n++) {

    cumBrIncidTreat=CandHConst*annuIncidence[n-1];

    cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n-1];

    cumOverallSurCandH[n-1]=Math.exp(-1.0*cumCombIncidTreat);

  //alert("" + CandHConst + " " + cumBrIncidTreat + " " + cumCombIncidTreat + " " + cumOverallSurCandH[n-1]);



    cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

    pySurv10CandH+=0.5*(cumRisk+prevcumRisk);

    prevcumRisk=cumRisk;

  }

  pySurv10CandH=10.0-pySurv10CandH;

  //alert("PY sur 10 (OL): " + pySurv10CandH);



  //

  // 4) Combined Chemo & Hormo & Trastuzumab table (CHT)

  //

  var CHTConst0to5yrs=Math.exp(chemoRed[chemoGen]+hormoRed[chemoGen]+efficTrast);

  var CHTConst5to9yrs=Math.exp(chemoRed[chemoGen]+hormoRed[chemoGen]);

  var CHTConst;

  var cumOverallSurCHT= [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

  cumBrIncidTreat=0.0;

  cumCombIncidTreat=0.0;

  var pySurv10CHT=0.0;   // person year survival to year 10 (CHT)

  cumRisk=0.0;   // reset

  prevcumRisk=0.0;   // reset

  for (var n = 1; n <= 10; n++) {

    CHTConst=CHTConst0to5yrs;

    if (n > 5) CHTConst=CHTConst5to9yrs;  // apply at 5years and over

    cumBrIncidTreat=CHTConst*annuIncidence[n-1];

    cumCombIncidTreat+=cumBrIncidTreat+annualIncNB[n-1];

    cumOverallSurCHT[n-1]=Math.exp(-1.0*cumCombIncidTreat);

  //alert(CHTConst+" "+cumBrIncidTreat+" "+cumCombIncidTreat+" "+cumOverallSurCHT[n-1]);



    cumRisk=1.0-Math.exp(-1.0*cumCombIncidTreat);

    pySurv10CHT+=0.5*(cumRisk+prevcumRisk);

    prevcumRisk=cumRisk;

  }

  pySurv10CHT=10.0-pySurv10CHT;

  //alert("PY sur 10 (OL): " + pySurv10CHT);



  return [bcSpecSur, cumOverallSurOL, cumOverallSurChemo, cumOverallSurHormo, cumOverallSurCandH, cumOverallSurCHT,

          pySurv10OL, pySurv10Chemo, pySurv10Hormo, pySurv10CandH, pySurv10CHT];

}



/* Returns the contents of a radio field, or "-9999" if nothing selected. */

function get_radio_value(field) {

  var result = "-9999";

  for (var i=0; i < field.length; i++) {

    if (field[i].checked) {

      result = field[i].value;

    }

  }

  return result;

}



/* Format a floating point number as a percentage */

function percent(x) {

  return "" + (x*100).toFixed(1) + "%";

}



/* Format a floating point number as a percentage value, for a chart */

function chart_percent(x) {

  return "" + (x*100).toFixed(1);

}



/* Format a floating point number as a percentage value, for a textual description */

function text_percent(x) {

  return "" + (x*100).toFixed(0);

}

/* Reset chart images and text display */

function reset_displays() {

  document.getElementById('chart5_ovs').value = "";

  document.getElementById('chart5_hormo').value = "";

  document.getElementById('chart5_chemo_add').value = "";

  document.getElementById('chart5_tram_add').value = "";

  document.getElementById('chart10_ovs').value = "";

  document.getElementById('chart10_hormo').value = "";

  document.getElementById('chart10_chemo_add').value = "";

  document.getElementById('chart10_tram_add').value = "";

  resetChart();

// reset text under graph legend

  document.getElementById("surv5_OL_100").innerHTML= "XX";

  document.getElementById("surv5_OL_100").style.display = "display";

  document.getElementById("surv10_OL_100").innerHTML= "XX";

  document.getElementById("surv10_OL_100").style.display = "display";

  for (var i = 1; i <= 4; i++) {

    document.getElementById("er_pos_only_" + i).style.display = "none";

  }

  for (var i = 1; i <= 2; i++) {

    document.getElementById("er_neg_only_" + i).style.display = "none";

  }

  for (var i = 1; i <= 2; i++) {

    document.getElementById("her2_pos_only_" + i).style.display = "none";

  }

}
