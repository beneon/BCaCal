function LifeMathCal(){
  /********************************************************************
  * Array of probability of dying between year x and x+1, where x is age, starting at age x=0, taken from:
  * 	-National Vital Statistics Reports Vol 54 No 14, April 19, 2006, United States Life Tables 2003,
  * 	Table 3. Life table for females: United States, 2003.
  * adjusted to exclude the probability of dying from breast cancer using data from:
  *  -National Vital Statistics Reports Vol 55, No 19, August 21, 2007, Deaths: Final Data for 2004,
  *  Table 3. Number of deaths and death rates by age, race, and sex: United States, 2004
  *  Table 10. Number of deaths from 113 selected causes by age: United States, 2004
  * q(x)
  ****************************************************************************/
  var nvsr_death_prob_yearly = new Array(0, 0.006083, 0.000414, 0.000301, 0.000218, 0.000172, 0.000158, 0.000141, 0.000128, 0.000117, 0.000108, 0.000105, 0.000110, 0.000132, 0.000173, 0.000228, 0.000292, 0.000355, 0.000407, 0.000440, 0.000456, 0.000471, 0.000489, 0.000501, 0.000509, 0.000515, 0.000506, 0.000516, 0.000531, 0.000552, 0.000578, 0.000609, 0.000646, 0.000693, 0.000753, 0.000827, 0.000864, 0.000949, 0.001047, 0.001157, 0.001273, 0.001393, 0.001514, 0.001639, 0.001774, 0.001919, 0.002045, 0.002211, 0.002383, 0.002560, 0.002746, 0.002949, 0.003176, 0.003431, 0.003718, 0.004039, 0.004462, 0.004859, 0.005304, 0.005809, 0.006384, 0.007060, 0.007817, 0.008596, 0.009350, 0.010100, 0.011305, 0.012297, 0.013426, 0.014706, 0.016123, 0.017603, 0.019196, 0.021033, 0.023175, 0.025585, 0.028661, 0.031295, 0.034315, 0.037906, 0.042094, 0.046670, 0.051554, 0.057062, 0.063411, 0.070761, 0.079054, 0.087065, 0.095796, 0.105294, 0.115605, 0.126771, 0.138833, 0.151829, 0.165787, 0.180734, 0.196684, 0.213644, 0.231608, 0.250560, 0.270467, 0.295466253,0.317857963,0.341365799,0.365989493,0.39172287,0.418553461,0.44646215,0.475422854,0.50540224,0.53635949,0.568246115,0.601005825,0.634574456,0.66887997,0.703842512,0.73937455,0.775381082,0.811759916,0.848402039,0.88519205,0.92200867,0.958725335,0.995210852);

  /********************************************************************
  * A 15-part step function (L_breastcancer_distribution) to represent the fraction
  * of deaths that occurs in each of the 15 years after diagnosis.
  * This is the probability density function of the SEER cohort from which we derived our parameters,
  * normalized to 1 at 15 years.
  ***************************************************************************/
  var L_breastcancer_distribution = new Array(0.031545, 0.076709, 0.094483, 0.091899, 0.083154, 0.079074, 0.073931, 0.069022, 0.066901, 0.059433, 0.061200, 0.058224, 0.054612, 0.052216, 0.047595);

  /********************************************************************
  *  Expectation of life in years at age x, starting at age x=0, taken from:
  * 	-National Vital Statistics Reports Vol 54 No 14, April 19, 2006, United States Life Tables 2003,
  * 	Table 3. Life table for females: United States, 2003.
  * adjusted to exclude the probability of dying from breast cancer using data from:
  *  -National Vital Statistics Reports Vol 55, No 19, August 21, 2007, Deaths: Final Data for 2004,
  *  Table 3. Number of deaths and death rates by age, race, and sex: United States, 2004
  *  Table 10. Number of deaths from 113 selected causes by age: United States, 2004
  * e(x)
  ****************************************************************************/
  var nvsr_life_expect = new Array(80.5, 80.0, 79.0, 78.0, 77.1, 76.1, 75.1, 74.1, 73.1, 72.1, 71.1, 70.1, 69.1, 68.1, 67.2, 66.2, 65.2, 64.2, 63.2, 62.3, 61.3, 60.3, 59.4, 58.4, 57.4, 56.4, 55.5, 54.5, 53.5, 52.6, 51.6, 50.6, 49.7, 48.7, 47.7, 46.8, 45.8, 44.8, 43.9, 42.9, 42.0, 41.1, 40.1, 39.2, 38.3, 37.3, 36.4, 35.5, 34.6, 33.6, 32.7, 31.8, 30.9, 30.0, 29.2, 28.3, 27.4, 26.5, 25.7, 24.8, 24.0, 23.1, 22.3, 21.5, 20.7, 19.9, 19.1, 18.4, 17.6, 16.9, 16.1, 15.4, 14.7, 14.0, 13.3, 12.7, 12.0, 11.4, 10.8, 10.2, 9.6, 9.0, 8.5, 8.0, 7.5, 7.0, 6.6, 6.2, 5.8, 5.4, 5.0, 4.7, 4.4, 4.1, 3.8, 3.5, 3.3, 3.1, 2.8, 2.6, 2.5, 2.3, 2.1, 2.0, 1.8, 1.7, 1.5, 1.4, 1.2, 0.8, 0.4, 0.2, 0.1, 0.05, 0.03, 0.01, 0.006, 0.003, 0.001, 0.002, 0.0008);

  /********************************************************************
  STEP 2 calculate yearly and cumulative cancer and total death rates
  ****************************************************************************/
  /********************************************************************
  Initizes all arrays necessary for calculations

  ****************************************************************************/

  var L_breastcancer_percentage=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * L_cancer_percentage: contains the distribution of breast cancer lethality for 15 years

  var L_breastcancer_death_yearly=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * L_cancer_death_yearly: describes to the total number of deaths due to breast cancer at a single year

  var L_cancer_death_cumm=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * L_cancer_death_cumm: describes the cummulative number of deaths due to breast cancer for a given year and all its previous years

  var L_nonbreastcancer_death_yearly=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_nonbreastcancer_prob=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_noncancer_death_cumm=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * L_noncancer_prob: contains the probability of survival from the nsvr data adjusted to exclude the probability of dying from breast cancer as mentioned previously
  // * L_noncancer_death_yearly: describes to the total number of deaths due to non-breast cancer causes at a single year
  // * L_noncancer_death_cumm: describes the cummulative number of deaths due to non-breast cancer causes for a given year and all its previous years

  var L_overall_death_yearly=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_overall_death_cumm=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * L_overall_death_yearly: describes to the total number of deaths due to all causes at a single year
  // * L_overall_death_cumm: describes the cummulative number of deaths due to all causes for a given year and all its previous years
  var remaining_percentage=new Array(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * remaining_percentage: describes the percentage of the initial population surviving to a specific year

  var cancer_death_hazard = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var cancer_death_dist_cumm = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

  var L_cancer_percentage_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_noncancer_prob_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_cancer_death_yearly_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_cancer_death_cumm_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_noncancer_death_yearly_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_noncancer_death_cumm_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_overall_death_yearly_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var L_overall_death_cumm_therapy=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  var remaining_percentage_therapy=new Array(1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  // * calc_num_surviving: calculated number of women with breast cancer surviving
  // * calc_person_years_lived_between_years: calculated number of person years lived by women with breast cancer between two consecutive years
  // * calc_total_num_of_person_years_lived_above: caculated number of person years lived by women with breast cancer above a certain age

  /********************************************************************
  *Initialize Qs, R, and j_primary variables depending on if treatments are selected
  * Variable       Standard Therapy         No Therapy
  *   Qs            0.010054                0.014751
  ****************************************************************************/
  var Qs=0.014751;
  var Z=1; //initializes Z value
  var R=0.07581; //initializes R value
  var endotherapyEffect=0; //Resets endotherapy effect before every calculation to no endotherapy
  var chemotherapyEffect=0; //Resets endotherapy effect before every calculation to no chemotherapy
  var totaltherapyEffect=0; //Resets total therapy effect before every calculation to no therapy
  var age =  0
  var dia =  0
  var nnum= 0
  var er = 0
  var pr = 0
  var her = 0
  var his = 0
  var grade = 0
  var endo= 0
  var chemo= 0
  var nodesKnown = false
  var j_primary = nodesKnown?0.8057:1
  // If nodal status is unknown, j_primary is set to 1
  /********************************************************************
   STEP 2.a 	The program loads the g parameters determined by the user input, and computes the product of all of them
  ****************************************************************************/
  function ageGParameter(agePara){
    var factorAge = 1//Reset g_parameter before each calculation
    if(agePara>=21 && agePara<=30){
      factorAge=1.2035;	//if user age is 21-30 then g-value is 1.2035
    }else if(agePara<=40){
      factorAge=1.0705;  //if user age is 31-40 then g-value is 1.0705
    }else if(agePara<=50){
      factorAge=0.85655;  //if user age is 41-50 then g-value is 0.85655
    }else if(agePara<=60){
      factorAge=1.0228;  //if user age is 51-60 then g-value is 1.0228
    }else if(agePara<=70){
      factorAge=1.0248;  //if user age is 61-70 then g-value is 1.0248
    }else if(agePara<=80){
      factorAge=1.01945;  //if user age is 71-80 then g-value is 1.01945
    }else if(agePara<=90){
      factorAge=1.17735;  //if user age is 81-90 then g-value is 1.17735
    }else if(agePara<=100){
      factorAge=1.32845;  //if user age is 91-100 then g-value is 1.32845
    }else{
      factorAge=1
    }
    gPara = gPara*factorAge
    return gPara
  }
  function erAndPr(erPara,prPara){
      var gPara = new Array()
      gPara["er0pr0"]=1
      gPara["er0pr1"]=0.9166
      gPara["er0pr2"]=1.1701
      gPara["er1pr0"]=0.953
      gPara["er1pr1"]=0.91685
      gPara["er1pr2"]=1.15415
      gPara["er2pr0"]=1.1753
      gPara["er2pr1"]=1.0131
      gPara["er2pr2"]=1.1904
      return gPara["er"+erPara+"pr"+prPara]
  }
  function her(herPara){
    var gPara = [1,1.515,0.9662]
    if(herPara <= 2 && herPara>=0){
      return gPara[herPara]
    }else{
      console.log("herPara is wrong")
      return 1
    }
  }
  function his(hisPara){
    var gPara = [1,1.04495,0.97825,0.8624,0.42355,0.55305,0.2639,0.84305,1.51235,3.1544,1.42765,0.49,0.70395,0.8505,0.14972]
    return gPara[hisPara]
  }
}
