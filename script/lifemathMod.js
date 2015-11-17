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
  var calc_life_expectation = 0;
  var expect_years_life_lost = 0;
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
  var age =  50
  var dia =  1
  var nnum= 0
  var er = 0
  var pr = 0
  var her = 0
  var his = 0
  var grade = 0
  var endo= 0
  var chemo= 2
  var nodesKnown = false
  var j_primary = nodesKnown?0.8057:1
  var L_primary = 0
  var L_nodes = 0
  var L_breastcancer_KM = 0
  var totaltherapyEffect = 0
  var L_breastcancer_KM_therapy = 0
  var expect_years_life_lost_therapy=0
  var expect_life_saved_years=0
  var expect_life_saved_days=0
  // If nodal status is unknown, j_primary is set to 1
  /********************************************************************
   STEP 2.a 	The program loads the g parameters determined by the user input, and computes the product of all of them
  ****************************************************************************/
  var g_parameter = 1
  function ageFactor(){
    var factorAge = 1//Reset g_parameter before each calculation
    if(age>=21 && age<=30){
      factorAge=1.2035;	//if user age is 21-30 then g-value is 1.2035
    }else if(age<=40){
      factorAge=1.0705;  //if user age is 31-40 then g-value is 1.0705
    }else if(age<=50){
      factorAge=0.85655;  //if user age is 41-50 then g-value is 0.85655
    }else if(age<=60){
      factorAge=1.0228;  //if user age is 51-60 then g-value is 1.0228
    }else if(age<=70){
      factorAge=1.0248;  //if user age is 61-70 then g-value is 1.0248
    }else if(age<=80){
      factorAge=1.01945;  //if user age is 71-80 then g-value is 1.01945
    }else if(age<=90){
      factorAge=1.17735;  //if user age is 81-90 then g-value is 1.17735
    }else if(age<=100){
      factorAge=1.32845;  //if user age is 91-100 then g-value is 1.32845
    }else{
      factorAge=1
    }
    return factorAge
  }
  function erAndPrFactor(){
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
      return gPara["er"+er+"pr"+pr]
  }
  function herFactor(){
    var gPara = [1,1.515,0.9662]
    if(her <= 2 && her>=0){
      return gPara[her]
    }else{
      console.log("herPara is wrong")
      return 1
    }
  }
  function hisFactor(){
    var gPara = [1,1.04495,0.97825,0.8624,0.42355,0.55305,0.2639,0.84305,1.51235,3.1544,1.42765,0.49,0.70395,0.8505,0.14972]
    return gPara[his]
  }

  function gradeFactor(){
    var gPara = [1,0.41345,0.8267,1.11584,1.23275]
    return gPara[grade]
  }
  g_parameter = ageFactor()*erAndPrFactor()*herFactor()*hisFactor()*gradeFactor()
  /*********************************************************************
  *  STEP 2.b 	The program calculates the 15-year Kaplan-Meier cancer death rate, L, using the SNAP method and the product of the g parameters
  * Calculates lethality of primary breast cancer tumor (L_primary), lethality of nodes (L_nodes), and 15-year Kaplan Meier cancer * specific death rate (L_breastcancer_KM)
  * Second L_breastcancer_KM function adjusts for threatment effects
  ***************************************************************************/
  L_primary = 1 - Math.exp(-Qs*g_parameter*j_primary*Math.pow(dia*10,Z))
  L_nodes = 1 - Math.exp(-nnum*R)
  L_breastcancer_KM = L_primary + L_nodes - (L_primary*L_nodes)

  /*********************************************************************
  * STEPs 2.c, 2.d, & 2.e calculate cancer death rate in each of the 15 years following diagnosis
  * Calculates yearly lethalities due to breast cancer and other causes
  ***************************************************************************/
  function yearlyDeath(){
    for (var i=1; i<=15; i++) {
      //STEP 2.c calculates cancer death distribution by multiplying 15yr KM cancer death rate by expected BRCA yearly lethality
      //percentage of overall cancer deaths occuring in the given year is computed, and cumulatively summed
      cancer_death_dist_cumm[i] = cancer_death_dist_cumm[i-1] + L_breastcancer_distribution[i-1]*L_breastcancer_KM;
      //cancer-specific hazard is computed as the chance of cancer death divided by cancer-specific survival to that point
      cancer_death_hazard[i] = L_breastcancer_distribution[i-1]*L_breastcancer_KM / (1-cancer_death_dist_cumm[i-1]);

      L_breastcancer_death_yearly[i]=remaining_percentage[i-1] * cancer_death_hazard[i];
      //STEP 2.d calculates non-BRCA death rate by multiplying the fraction of patients not dying of cancer by the yearly risk of death due to non-cancer causes for the given age
      if (age==0){
        L_nonbreastcancer_prob[i]=0;
      } else {
        L_nonbreastcancer_prob[i]=nvsr_death_prob_yearly[i+age];
      }
      L_nonbreastcancer_death_yearly[i]=(remaining_percentage[i-1] - L_breastcancer_death_yearly[i]) *L_nonbreastcancer_prob[i];
      //STEP 2.e calculates overall death rate by adding breast cancer deaths to non-breast cancer deaths
      L_overall_death_yearly[i]=L_breastcancer_death_yearly[i]+L_nonbreastcancer_death_yearly[i];
      remaining_percentage[i]=remaining_percentage[i-1]-L_overall_death_yearly[i];
    }
  }
  /********************************************************************
  * STEP 2.f  Calculate 15 values for cumulative breast cancer, non-breast cancer, and total death rates by summing the respective yearly values computed in the steps above.
  ****************************************************************************/
  function cumulativeDeath(){
    for(var i=1;i<=15;i++) {
    	L_cancer_death_cumm[i]=L_cancer_death_cumm[i-1]+L_breastcancer_death_yearly[i];
    	L_noncancer_death_cumm[i]=L_noncancer_death_cumm[i-1]+L_nonbreastcancer_death_yearly[i];
    	L_overall_death_cumm[i]=L_overall_death_cumm[i-1]+L_overall_death_yearly[i];
    }
  }

  /********************************************************************
  * STEP 3   Calculate the mean number of years of life left that can be expected for the cancer patient
  ****************************************************************************/
  /********************************************************************
  * STEP 3.a   Calculate the life expectancy for the cancer patient by multiplying the chance of dying in each of the years 1-15 by the number of years survived to that point.  Then add the NVSR life expectancy for people 15 years older than the patient's current age, multiplied by the patients chance of surviving 15 years.
  ****************************************************************************/
  function lifeExpectation(){
    for (var i=1; i<=15; i++){
        calc_life_expectation = calc_life_expectation + L_overall_death_yearly[i] * (i-0.5);
    }
    calc_life_expectation = calc_life_expectation + (1 - L_overall_death_cumm[15]) * (nvsr_life_expect[age + 15] +15)
  }
  /********************************************************************
  * STEP 3.b   The program calculates the expected years of life lost due to cancer, by subtracting the calculated life expectancy (step 3.a) from the NVSR-given life expectancy for the specified age.
  ****************************************************************************/
  expect_years_life_lost = nvsr_life_expect[age] - calc_life_expectation;
  /***************************************************************
  * Determine whether projections exceed 100 years of age, and remove such projections-- data is not projected to ages above 100
  **************************************************************/
  function deathDataTruncate(){
    var age_difference = 100-age;

    if (age_difference<15){
    	for (var i=age_difference; i<=15; i++) {
    		L_cancer_death_cumm[i]=L_cancer_death_cumm[age_difference];
    		L_noncancer_death_cumm[i]=L_noncancer_death_cumm[age_difference];
    		L_overall_death_cumm[i]=L_overall_death_cumm[age_difference];
        L_cancer_death_cumm_therapy[i]=L_cancer_death_cumm_therapy[age_difference];
    		L_noncancer_death_cumm_therapy[i]=L_noncancer_death_cumm_therapy[age_difference];
    		L_overall_death_cumm_therapy[i]=L_overall_death_cumm_therapy[age_difference];
    	}
    }
  }
  function cumDeathTruncate(){
    var j=0
    var jTr=0
    for (var i=0; i<15; i++) {
    	if(L_overall_death_cumm[i]<1){
    		j ++;
    	}
      if(L_overall_death_cumm_therapy[i]<1){
    		jTr ++;
    	}
    }

    if(L_overall_death_cumm[j]>=1) {
    	for (var k=j;k<=15;k++) {
    		L_overall_death_cumm[k]=1;
    		L_cancer_death_cumm[k]=L_cancer_death_cumm[j];
    		L_noncancer_death_cumm[k]=L_noncancer_death_cumm[j];
    	}
    }
    if(L_overall_death_cumm_therapy[jTr]>=1) {
    	for (k=jTr;k<=15;k++) {
    		L_overall_death_cumm_therapy[k]=1;
    		L_cancer_death_cumm_therapy[k]=L_cancer_death_cumm_therapy[jTr];
    		L_noncancer_death_cumm_therapy[k]=L_noncancer_death_cumm_therapy[jTr];
    	}
    }
  }
  yearlyDeath();
  cumulativeDeath();
  lifeExpectation();
  deathDataTruncate();
  cumDeathTruncate();
  /***************************************************
  STEP 4  Calculate death rates with a specific therapy type
  ********************************************************/
  /***************************************************
  STEP 4.a  Calculate the "risk-reduction" value based on the combination of therapies entered by the user and the information collected in steps 1.c and 1.d, consistent with the assumptions of Adjuvant!Online
  ********************************************************/
      /*********************************************************************
      * The following code gives the effect of endocrine (hormonal) therapy.
      ***************************************************************************/
  function ageFactorTr(ageF){
    var ageFactor = 0
    if(ageF<50){
      ageFactor = 0
    }else if(ageF<60){
      ageFactor = 1
    }else if(ageF<=100){
      ageFactor = 2
    }else{
      console.log("age is out of range:"+age)
    }
    return ageFactor
  }
  function endoTr(){
    var ageFactor = ageFactorTr(age)
    if(endo==0){
      return 0
    }else{
    var endoTrFactor = new Array()
    endoTrFactor["er0age0"]=0.20
    endoTrFactor["er0age1"]=0.21
    endoTrFactor["er0age2"]=0.23
    endoTrFactor["er1age0"]=0.32
    endoTrFactor["er1age1"]=0.32
    endoTrFactor["er1age2"]=0.32
    endoTrFactor["er2age0"]=0
    endoTrFactor["er2age1"]=0
    endoTrFactor["er2age2"]=0
    return endoTrFactor["er"+er+"age"+ageFactor]
    }
  }

  function chemoTr(){
    var ageFactor = ageFactorTr(age)
    var chemoTrFactor = new Array()
    if(chemo == 0){
      return 0
    }else{
      chemoTrFactor["ch1er0age0"] = 0.30
      chemoTrFactor["ch1er0age1"] = 0.18
      chemoTrFactor["ch1er0age2"] = 0.10
      chemoTrFactor["ch1er1age0"] = 0.30
      chemoTrFactor["ch1er1age1"] = 0.16
      chemoTrFactor["ch1er1age2"] = 0.08
      chemoTrFactor["ch1er2age0"] = 0.30
      chemoTrFactor["ch1er2age1"] = 0.22
      chemoTrFactor["ch1er2age2"] = 0.15

      chemoTrFactor["ch2er0age0"] = 0.41
      chemoTrFactor["ch2er0age1"] = 0.31
      chemoTrFactor["ch2er0age2"] = 0.24
      chemoTrFactor["ch2er1age0"] = 0.41
      chemoTrFactor["ch2er1age1"] = 0.29
      chemoTrFactor["ch2er1age2"] = 0.23
      chemoTrFactor["ch2er2age0"] = 0.41
      chemoTrFactor["ch2er2age1"] = 0.34
      chemoTrFactor["ch2er2age2"] = 0.29

      chemoTrFactor["ch3er0age0"] = 0.30
      chemoTrFactor["ch3er0age1"] = 0.18
      chemoTrFactor["ch3er0age2"] = 0.10
      chemoTrFactor["ch3er1age0"] = 0.30
      chemoTrFactor["ch3er1age1"] = 0.16
      chemoTrFactor["ch3er1age2"] = 0.08
      chemoTrFactor["ch3er2age0"] = 0.30
      chemoTrFactor["ch3er2age1"] = 0.22
      chemoTrFactor["ch3er2age2"] = 0.15

      chemoTrFactor["ch4er0age0"] = 0.44
      chemoTrFactor["ch4er0age1"] = 0.34
      chemoTrFactor["ch4er0age2"] = 0.28
      chemoTrFactor["ch4er1age0"] = 0.44
      chemoTrFactor["ch4er1age1"] = 0.33
      chemoTrFactor["ch4er1age2"] = 0.26
      chemoTrFactor["ch4er2age0"] = 0.44
      chemoTrFactor["ch4er2age1"] = 0.38
      chemoTrFactor["ch4er2age2"] = 0.32

      chemoTrFactor["ch5er0age0"] = 0.55
      chemoTrFactor["ch5er0age1"] = 0.47
      chemoTrFactor["ch5er0age2"] = 0.42
      chemoTrFactor["ch5er1age0"] = 0.55
      chemoTrFactor["ch5er1age1"] = 0.45
      chemoTrFactor["ch5er1age2"] = 0.40
      chemoTrFactor["ch5er2age0"] = 0.55
      chemoTrFactor["ch5er2age1"] = 0.49
      chemoTrFactor["ch5er2age2"] = 0.45
      return chemoTrFactor["ch"+chemo+"er"+er+"age"+ageFactor]
    }
  }
  /******************************************************
  * Combine effect of endocrine therapy and chemotherapy
  ******************************************************/
  totaltherapyEffect = endoTr() + chemoTr() - (endoTr()*chemoTr())
  L_breastcancer_KM_therapy=L_breastcancer_KM*(1-totaltherapyEffect);
  /*********************************************************************
  * STEP 4.b calculates 15 values for the breast cancer death rate with therapy in each of the 15 years after diagnosis by multiplying the 15-year Kaplan-Meier cancer death rate, L, (calculated in step 1) by the "risk-reduction" value computed above, and by the fraction of the total lethality which can be expected in each year(the 15-part step function described in step 2.a that captures the breast carcinoma hazard function).
  ***************************************************************************/
  function deathTrAddjust(){
    for (i=1; i<=15; i++) {
  		//percentage of overall cancer deaths occuring in the given year is computed, and cumulatively summed
          cancer_death_dist_cumm[i] = cancer_death_dist_cumm[i-1] + L_breastcancer_distribution[i-1]*L_breastcancer_KM_therapy;
          //cancer-specific hazard is computed as the chance of cancer death divided by cancer-specific survival to that point
          cancer_death_hazard[i] = L_breastcancer_distribution[i-1]*L_breastcancer_KM_therapy / (1-cancer_death_dist_cumm[i-1]);

          L_cancer_death_yearly_therapy[i]=remaining_percentage_therapy[i-1] * cancer_death_hazard[i];
  		if (age==0){
  			L_noncancer_prob_therapy[i]=0;
  		} else {
  			L_noncancer_prob_therapy[i]=nvsr_death_prob_yearly[i+age];
  		}
  		L_noncancer_death_yearly_therapy[i]=(remaining_percentage_therapy[i-1]-L_cancer_death_yearly_therapy[i]) *L_noncancer_prob_therapy[i];
  		L_overall_death_yearly_therapy[i]=L_cancer_death_yearly_therapy[i]+L_noncancer_death_yearly_therapy[i];
  		remaining_percentage_therapy[i]=remaining_percentage_therapy[i-1]-L_overall_death_yearly_therapy[i];

  	} //end of yearly lethality calculator
  }
  /*********************************************************************
  * STEP 4.c & 4d   Calculate 15 values for the cumulative breast cancer death rate and cumulative overall death rate in each of the 15 years after diagnosis by summing the respective yearly risks of cancer death, with therapy, (step 2) from the time of diagnosis.
  ***************************************************************************/
  function deathCumTrAddjust(){
    for(i=1;i<=15;i++) {
      L_cancer_death_cumm_therapy[i]=L_cancer_death_cumm_therapy[i-1]+L_cancer_death_yearly_therapy[i];
      L_noncancer_death_cumm_therapy[i]=L_noncancer_death_cumm_therapy[i-1]+L_noncancer_death_yearly_therapy[i];
      L_overall_death_cumm_therapy[i]=L_overall_death_cumm_therapy[i-1]+L_overall_death_yearly_therapy[i];
    }	//end of lethality summation
  }
  /*********************************************************************
  * STEP 5 Calculates the life expectancy gained from therapy
  ***************************************************************************/
  /********************************************************************
  * STEP 5.a   Calculate the life expectancy for the cancer patient by multiplying the chance of dying in each of the years 1-15 by the number of years survived to that point.  Then add the NVSR life expectancy for people 15 years older than the patient's current age, multiplied by the patients chance of surviving 15 years.
  ****************************************************************************/
  function lifeExpect(){
    calc_life_expectation_therapy = 0;
    for (i=1; i<=15; i++){
        calc_life_expectation_therapy = calc_life_expectation_therapy + L_overall_death_yearly_therapy[i] * (i-0.5);
    }
    calc_life_expectation_therapy = calc_life_expectation_therapy + (1 - L_overall_death_cumm_therapy[15]) * (nvsr_life_expect[age + 15] +15)
  }

  /*********************************************************************
  * STEP 5.b   calculates the life expectancy gained from therapy by subtracting the mean life expectancy with therapy (step 2.e) from the mean life expectancy for the cancer patient (step 3).
  ***************************************************************************/
  function lifeExpectTr(){
    expect_years_life_lost_therapy = nvsr_life_expect[age] - calc_life_expectation_therapy;

    expect_life_saved_years=expect_years_life_lost-expect_years_life_lost_therapy;
    expect_life_saved_days=expect_life_saved_years*365.25;
  }

  deathDataTruncate();
  deathTrAddjust();
  deathCumTrAddjust();
  lifeExpect();
  lifeExpectTr();
  deathDataTruncate();
  cumDeathTruncate();

  console.log("death_reduction"+Math.round(totaltherapyEffect*1000) / 10)
  console.log("life_expect"+Math.round(nvsr_life_expect[age]*10)/10)
  console.log("expect_life_lost"+Math.round(expect_years_life_lost*10)/10)
  console.log("expect_saved_years"+Math.round(expect_life_saved_years*10)/10)
  console.log("expect_saved_days"+Math.round(expect_life_saved_days))
  console.log("l_km"+Math.round(L_breastcancer_KM_therapy*1000)/10)
  console.log("life_expect_with_cancer"+Math.round((nvsr_life_expect[age] - expect_years_life_lost)*10)/10)
  console.log("l_expected"+Math.round(L_cancer_death_cumm_therapy[15]*1000)/10)
  console.log("ageText"+age)
}
LifeMathCal();
