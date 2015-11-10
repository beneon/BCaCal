var nvsr_death_prob_yearly = new Array(0, 0.006083, 0.000414, 0.000301, 0.000218, 0.000172, 0.000158, 0.000141, 0.000128, 0.000117, 0.000108, 0.000105, 0.000110, 0.000132, 0.000173, 0.000228, 0.000292, 0.000355, 0.000407, 0.000440, 0.000456, 0.000471, 0.000489, 0.000501, 0.000509, 0.000515, 0.000506, 0.000516, 0.000531, 0.000552, 0.000578, 0.000609, 0.000646, 0.000693, 0.000753, 0.000827, 0.000864, 0.000949, 0.001047, 0.001157, 0.001273, 0.001393, 0.001514, 0.001639, 0.001774, 0.001919, 0.002045, 0.002211, 0.002383, 0.002560, 0.002746, 0.002949, 0.003176, 0.003431, 0.003718, 0.004039, 0.004462, 0.004859, 0.005304, 0.005809, 0.006384, 0.007060, 0.007817, 0.008596, 0.009350, 0.010100, 0.011305, 0.012297, 0.013426, 0.014706, 0.016123, 0.017603, 0.019196, 0.021033, 0.023175, 0.025585, 0.028661, 0.031295, 0.034315, 0.037906, 0.042094, 0.046670, 0.051554, 0.057062, 0.063411, 0.070761, 0.079054, 0.087065, 0.095796, 0.105294, 0.115605, 0.126771, 0.138833, 0.151829, 0.165787, 0.180734, 0.196684, 0.213644, 0.231608, 0.250560, 0.270467, 0.295466253,0.317857963,0.341365799,0.365989493,0.39172287,0.418553461,0.44646215,0.475422854,0.50540224,0.53635949,0.568246115,0.601005825,0.634574456,0.66887997,0.703842512,0.73937455,0.775381082,0.811759916,0.848402039,0.88519205,0.92200867,0.958725335,0.995210852);
var L_breastcancer_distribution = new Array(0.031545, 0.076709, 0.094483, 0.091899, 0.083154, 0.079074, 0.073931, 0.069022, 0.066901, 0.059433, 0.061200, 0.058224, 0.054612, 0.052216, 0.047595);
var nvsr_life_expect = new Array(80.5, 80.0, 79.0, 78.0, 77.1, 76.1, 75.1, 74.1, 73.1, 72.1, 71.1, 70.1, 69.1, 68.1, 67.2, 66.2, 65.2, 64.2, 63.2, 62.3, 61.3, 60.3, 59.4, 58.4, 57.4, 56.4, 55.5, 54.5, 53.5, 52.6, 51.6, 50.6, 49.7, 48.7, 47.7, 46.8, 45.8, 44.8, 43.9, 42.9, 42.0, 41.1, 40.1, 39.2, 38.3, 37.3, 36.4, 35.5, 34.6, 33.6, 32.7, 31.8, 30.9, 30.0, 29.2, 28.3, 27.4, 26.5, 25.7, 24.8, 24.0, 23.1, 22.3, 21.5, 20.7, 19.9, 19.1, 18.4, 17.6, 16.9, 16.1, 15.4, 14.7, 14.0, 13.3, 12.7, 12.0, 11.4, 10.8, 10.2, 9.6, 9.0, 8.5, 8.0, 7.5, 7.0, 6.6, 6.2, 5.8, 5.4, 5.0, 4.7, 4.4, 4.1, 3.8, 3.5, 3.3, 3.1, 2.8, 2.6, 2.5, 2.3, 2.1, 2.0, 1.8, 1.7, 1.5, 1.4, 1.2, 0.8, 0.4, 0.2, 0.1, 0.05, 0.03, 0.01, 0.006, 0.003, 0.001, 0.002, 0.0008);

//User input gathering slot
var age = 0
var dia = 0
var nnum = 0
var er = 0
var pr = 0
var her = 0
var his = 0
var grade = 0
var yearTotal = 15
var L_breastcancer_percentage = new Array(yearTotal);
var L_nonbreastcancer_prob=new Array(yearTotal);
var L_breastcancer_death_yearly=new Array(yearTotal);
var L_cancer_death_cumm=new Array(yearTotal);
var L_nonbreastcancer_death_yearly=new Array(yearTotal);
var L_noncancer_death_cumm=new Array(yearTotal);
var L_overall_death_yearly=new Array(yearTotal);
var L_overall_death_cumm=new Array(yearTotal);
var remaining_percentage=new Array(yearTotal);
var cancer_death_hazard = new Array(yearTotal);
var cancer_death_dist_cumm = new Array(yearTotal);
var calc_num_surviving = new Array();
var calc_person_years_lived_between_years = new Array();
var calc_total_num_of_person_years_lived_above = new Array();

function calculateSurvival(){
  for(i=0;i<yearTotal;i++){
    L_breastcancer_percentage[i]=0
    L_nonbreastcancer_prob[i]=0
    L_breastcancer_death_yearly[i]=0
    L_cancer_death_cumm[i]=0
    L_nonbreastcancer_death_yearly[i]=0
    L_noncancer_death_cumm[i]=0
    L_overall_death_yearly[i]=0
    L_overall_death_cumm[i]=0
    remaining_percentage[i]=0
    cancer_death_hazard[i]=0
    cancer_death_dist_cumm[i]=0
  }
  remaining_percentage[0]=1

  Qs=0.010054;
  j_primary=0.8057;
  Z=1; //initializes Z value
  R=0.07581; //initializes R value

  gParaBase = 1
  var gPara = new Array()
  gPara["age0"] = 1
  gPara["age1"] = 1
  gPara["age2"]=1.2035
  gPara["age3"]=1.0705
  gPara["age4"]=0.85655
  gPara["age5"]=1.0228
  gPara["age6"]=1.0248
  gPara["age7"]=1.01945
  gPara["age8"]=1.17735
  gPara["age9"]=1.32845
  //年龄其他情况需要转换成age0
  gPara["er0pr0"]=1
  gPara["er0pr1"]=0.9166
  gPara["er0pr2"]=1.1701
  gPara["er1pr0"]=0.953
  gPara["er1pr1"]=0.91685
  gPara["er1pr2"]=1.15415
  gPara["er2pr0"]=1.1753
  gPara["er2pr1"]=1.0131
  gPara["er2pr2"]=1.1904
  //histology需要根据string进行书写>这个应该是在control层面进行的
  gPara["his0"]=1
  gPara["his1"]=1.04495
  gPara["his2"]=0.97825
  gPara["his3"]=0.8624
  gPara["his4"]=0.42355
  gPara["his5"]=0.55305
  gPara["his6"]=0.2639
  gPara["his7"]=0.84305
  gPara["his8"]=1.51235
  gPara["his9"]=3.1544
  gPara["his10"]=1.42765
  gPara["his11"]=0.49
  gPara["his12"]=0.70395
  gPara["his13"]=0.8505
  gPara["his14"]=0.14972
  //grade
  gPara["grade0"]=1
  gPara["grade1"]=0.41345
  gPara["grade2"]=0.8267
  gPara["grade3"]=1.11584
  gPara["grade4"]=1.23275
  gParaResult = gParaBase*gPara["age"+age]*gPara["er"+er+"pr"+pr]*gPara["his"+his]*gPara["grade"+grade]
  L_primary = 1 - Math.exp(-Qs*gParaResult*j_primary*Math.pow(dia*10,Z));
  L_nodes = 1 - Math.exp(-nnum*R);
  L_breastcancer_KM = L_primary + L_nodes - (L_primary*L_nodes)

  for(i=1;i<=yearTotal;i++){
    cancer_death_dist_cumm[i] = cancer_death_dist_cumm[i-1] + L_breastcancer_distribution[i-1]*L_breastcancer_KM;

    cancer_death_hazard[i] = L_breastcancer_distribution[i-1]*L_breastcancer_KM / (1-cancer_death_dist_cumm[i-1]);

    L_breastcancer_death_yearly[i]=remaining_percentage[i-1] * cancer_death_hazard[i];

    L_nonbreastcancer_prob[i] = age==0?0:nvsr_death_prob_yearly[i+age]

    L_nonbreastcancer_death_yearly[i]=(remaining_percentage[i-1] - L_breastcancer_death_yearly[i]) *L_nonbreastcancer_prob[i];

    L_overall_death_yearly[i]=L_breastcancer_death_yearly[i]+L_nonbreastcancer_death_yearly[i];

    remaining_percentage[i]=remaining_percentage[i-1]-L_overall_death_yearly[i];
    /********************************************************************
    * STEP 2.f  Calculate 15 values for cumulative breast cancer, non-breast cancer, and total death rates by summing the respective yearly values computed in the steps above.
    ****************************************************************************/
    L_cancer_death_cumm[i]=L_cancer_death_cumm[i-1]+L_breastcancer_death_yearly[i];

    L_noncancer_death_cumm[i]=L_noncancer_death_cumm[i-1]+L_nonbreastcancer_death_yearly[i];

    L_overall_death_cumm[i]=L_overall_death_cumm[i-1]+L_overall_death_yearly[i];

  }

  calc_life_expectation = 0;
  for (i=1; i<=15; i++){
      calc_life_expectation = calc_life_expectation + L_overall_death_yearly[i] * (i-0.5);
  }
  calc_life_expectation = calc_life_expectation + (1 - L_overall_death_cumm[15]) * (nvsr_life_expect[age + 15] +15)

  expect_years_life_lost = nvsr_life_expect[age] - calc_life_expectation;

  age_difference = 100-age;

  if (age_difference<15){
    for (i=age_difference; i<=15; i++) {
      L_cancer_death_cumm[i]=L_cancer_death_cumm[age_difference];
      L_noncancer_death_cumm[i]=L_noncancer_death_cumm[age_difference];
      L_overall_death_cumm[i]=L_overall_death_cumm[age_difference];
    }
  }

  j=0;
  for (i=0; i<15; i++) {
    if(L_overall_death_cumm[i]<1){
      j=j+1;
    } else{
    }
  }

  if(L_overall_death_cumm[j]>=1) {
    for (k=j;k<=15;k++) {
      L_overall_death_cumm[k]=1;
      L_cancer_death_cumm[k]=L_cancer_death_cumm[j];
      L_noncancer_death_cumm[k]=L_noncancer_death_cumm[j];
    }
  }
  console.log("life_expect:"+Math.round(nvsr_life_expect[age]*10)/10)
  console.log("expect_life_lost:"+Math.round(expect_years_life_lost*10)/10)
  console.log("life_expect_with_cancer:"+Math.round((nvsr_life_expect[age] - expect_years_life_lost)*10)/10)
  console.log("l_km:"+Math.round(L_breastcancer_KM*1000)/10)
  console.log("l_expected:"+Math.round(L_cancer_death_cumm[15]*1000)/10)
}
