var LifeMathBCaCal={
  age:0,dia:0,nnum:0,er:0,pr:0,her:0,his:0,grade:0,
  updateGraph:function(){
    /********************************************************************
    STEP 1  collect user input
    Acquire all the user inputs and assigns the appropriate j_primary and g-values to:
    Age; Tumor Diameter; Nodal Status; # of Positive Nodes; ER Status; PR Status;
    HERS Status; Histologic Type; Grade;
    ****************************************************************************/
    var nvsr_death_prob_yearly=new Array(0, 0.006083, 0.000414, 0.000301, 0.000218, 0.000172, 0.000158, 0.000141, 0.000128, 0.000117, 0.000108, 0.000105, 0.000110, 0.000132, 0.000173, 0.000228, 0.000292, 0.000355, 0.000407, 0.000440, 0.000456, 0.000471, 0.000489, 0.000501, 0.000509, 0.000515, 0.000506, 0.000516, 0.000531, 0.000552, 0.000578, 0.000609, 0.000646, 0.000693, 0.000753, 0.000827, 0.000864, 0.000949, 0.001047, 0.001157, 0.001273, 0.001393, 0.001514, 0.001639, 0.001774, 0.001919, 0.002045, 0.002211, 0.002383, 0.002560, 0.002746, 0.002949, 0.003176, 0.003431, 0.003718, 0.004039, 0.004462, 0.004859, 0.005304, 0.005809, 0.006384, 0.007060, 0.007817, 0.008596, 0.009350, 0.010100, 0.011305, 0.012297, 0.013426, 0.014706, 0.016123, 0.017603, 0.019196, 0.021033, 0.023175, 0.025585, 0.028661, 0.031295, 0.034315, 0.037906, 0.042094, 0.046670, 0.051554, 0.057062, 0.063411, 0.070761, 0.079054, 0.087065, 0.095796, 0.105294, 0.115605, 0.126771, 0.138833, 0.151829, 0.165787, 0.180734, 0.196684, 0.213644, 0.231608, 0.250560, 0.270467, 0.295466253,0.317857963,0.341365799,0.365989493,0.39172287,0.418553461,0.44646215,0.475422854,0.50540224,0.53635949,0.568246115,0.601005825,0.634574456,0.66887997,0.703842512,0.73937455,0.775381082,0.811759916,0.848402039,0.88519205,0.92200867,0.958725335,0.995210852);
    var nvsr_death_prob_yearly=new Array(0, 0.006083, 0.000414, 0.000301, 0.000218, 0.000172, 0.000158, 0.000141, 0.000128, 0.000117, 0.000108, 0.000105, 0.000110, 0.000132, 0.000173, 0.000228, 0.000292, 0.000355, 0.000407, 0.000440, 0.000456, 0.000471, 0.000489, 0.000501, 0.000509, 0.000515, 0.000506, 0.000516, 0.000531, 0.000552, 0.000578, 0.000609, 0.000646, 0.000693, 0.000753, 0.000827, 0.000864, 0.000949, 0.001047, 0.001157, 0.001273, 0.001393, 0.001514, 0.001639, 0.001774, 0.001919, 0.002045, 0.002211, 0.002383, 0.002560, 0.002746, 0.002949, 0.003176, 0.003431, 0.003718, 0.004039, 0.004462, 0.004859, 0.005304, 0.005809, 0.006384, 0.007060, 0.007817, 0.008596, 0.009350, 0.010100, 0.011305, 0.012297, 0.013426, 0.014706, 0.016123, 0.017603, 0.019196, 0.021033, 0.023175, 0.025585, 0.028661, 0.031295, 0.034315, 0.037906, 0.042094, 0.046670, 0.051554, 0.057062, 0.063411, 0.070761, 0.079054, 0.087065, 0.095796, 0.105294, 0.115605, 0.126771, 0.138833, 0.151829, 0.165787, 0.180734, 0.196684, 0.213644, 0.231608, 0.250560, 0.270467, 0.295466253,0.317857963,0.341365799,0.365989493,0.39172287,0.418553461,0.44646215,0.475422854,0.50540224,0.53635949,0.568246115,0.601005825,0.634574456,0.66887997,0.703842512,0.73937455,0.775381082,0.811759916,0.848402039,0.88519205,0.92200867,0.958725335,0.995210852);
    var L_breastcancer_distribution=new Array(0.031545, 0.076709, 0.094483, 0.091899, 0.083154, 0.079074, 0.073931, 0.069022, 0.066901, 0.059433, 0.061200, 0.058224, 0.054612, 0.052216, 0.047595);
    var nvsr_life_expect=new Array(80.5, 80.0, 79.0, 78.0, 77.1, 76.1, 75.1, 74.1, 73.1, 72.1, 71.1, 70.1, 69.1, 68.1, 67.2, 66.2, 65.2, 64.2, 63.2, 62.3, 61.3, 60.3, 59.4, 58.4, 57.4, 56.4, 55.5, 54.5, 53.5, 52.6, 51.6, 50.6, 49.7, 48.7, 47.7, 46.8, 45.8, 44.8, 43.9, 42.9, 42.0, 41.1, 40.1, 39.2, 38.3, 37.3, 36.4, 35.5, 34.6, 33.6, 32.7, 31.8, 30.9, 30.0, 29.2, 28.3, 27.4, 26.5, 25.7, 24.8, 24.0, 23.1, 22.3, 21.5, 20.7, 19.9, 19.1, 18.4, 17.6, 16.9, 16.1, 15.4, 14.7, 14.0, 13.3, 12.7, 12.0, 11.4, 10.8, 10.2, 9.6, 9.0, 8.5, 8.0, 7.5, 7.0, 6.6, 6.2, 5.8, 5.4, 5.0, 4.7, 4.4, 4.1, 3.8, 3.5, 3.3, 3.1, 2.8, 2.6, 2.5, 2.3, 2.1, 2.0, 1.8, 1.7, 1.5, 1.4, 1.2, 0.8, 0.4, 0.2, 0.1, 0.05, 0.03, 0.01, 0.006, 0.003, 0.001, 0.002, 0.0008);

    age = parseInt(this.age);
    dia = parseFloat(this.dia);
    nnum=parseInt(this.nnum);
    er =parseInt(this.er);
    pr =parseInt(this.pr);
    her =parseInt(this.her);
    his =parseInt(this.his);
    grade =parseInt(this.grade);
    //console.log("input vars:"+age+","+dia+","+nnum+","+er+","+pr+","+her+","+his+","+grade)

    Qs=0.010054;
    j_primary=0.8057;
    Z=1; //initializes Z value
    R=0.07581; //initializes R value

    g_parameter = 1; //Resets g_parameter before every calculation

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

    for(i=0;i<yearTotal;i++){
      L_breastcancer_percentage[i]=0.0
      L_nonbreastcancer_prob[i]=0.0
      L_breastcancer_death_yearly[i]=0.0
      L_cancer_death_cumm[i]=0.0
      L_nonbreastcancer_death_yearly[i]=0.0
      L_noncancer_death_cumm[i]=0.0
      L_overall_death_yearly[i]=0.0
      L_overall_death_cumm[i]=0.0
      cancer_death_hazard[i]=0.0
      cancer_death_dist_cumm[i]=0.0
    }
    remaining_percentage=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        /********************************************************************
        * Multiply g-parameter with g-value based on age
        ****************************************************************************/
        if(age == 0) {
        	   g_parameter=g_parameter*1; //if user age is 0 then g-value is 1
           } else if(age >= 21 && age <= 30) {
             g_parameter=g_parameter*1.2035;	//if user age is 21-30 then g-value is 1.2035
           } else if(age >= 31 && age <= 40) {
              g_parameter=g_parameter*1.0705;  //if user age is 31-40 then g-value is 1.0705
           } else if(age >= 41 && age <= 50) {
              g_parameter=g_parameter*0.85655;  //if user age is 41-50 then g-value is 0.85655
           } else if(age >= 51 && age <= 60) {
              g_parameter=g_parameter*1.0228;  //if user age is 51-60 then g-value is 1.0228
           } else if(age >= 61 && age <= 70) {
              g_parameter=g_parameter*1.0248;  //if user age is 61-70 then g-value is 1.0248
           } else if(age >= 71 && age <= 80) {
              g_parameter=g_parameter*1.01945;  //if user age is 71-80 then g-value is 1.01945
           } else if(age >= 81 && age <= 90) {
              g_parameter=g_parameter*1.17735;  //if user age is 81-90 then g-value is 1.17735
           } else if(age >= 91 && age <= 100) {
              g_parameter=g_parameter*1.32845;  //if user age is 91-100 then g-value is 1.32845
           } else {
              g_parameter=g_parameter*1; //if user age is <=20 or >=101 then g-value is 1
           }
        /********************************************************************
        * Multiply g-parameter with g-value based on ER/PR status
        ****************************************************************************/

        switch (er)
        {
        	case 0: //ER status Unknown
            console.log("er0");
        		if (pr==0){ //PR Unknown
        				//if ER is UNKNOWN and PR is UNKNOWN then g-value is 1
        				g_parameter=g_parameter*1;
        		} else if(pr==1) { //PR Positive
        				//if ER is UNKNOWN and PR is POSTIVE then g-value is 0.9166
        				g_parameter=g_parameter*0.9166;
        		} else if(pr==2) { //PR Negative
        				//if ER is UNKNOWN and PR is NEGATIVE then g-value is 1.1701
        				g_parameter=g_parameter*1.1701;
        		}

        	break;
        	case 1: //ER status Positive
        		if (pr==0){ //PR Unknown
        				//if ER is POSITIVE and PR is UNKNOWN then g-value is 0.953
        				g_parameter=g_parameter*0.953;
        		} else if(pr==1) { //PR Positive
        				//if ER is POSITIVE and PR is POSITIVE then g-value is 0.91685
        				g_parameter=g_parameter*0.91685;
        		} else if(pr==2) { //PR Negative
        				//if ER is POSITIVE and PR is NEGATIVE then g-value is 1.15415
        				g_parameter=g_parameter*1.15415;
        		}
        	break;
        	case 2: //ER status Negative
          console.log("er2");
        		if (pr==0){ //PR Unknown
        				//if ER is NEGATIVE and PR is UNKNOWN then g-value is 1.1753
        				g_parameter=g_parameter*1.1753;
        		} else if(pr==1) { //PR Positive
        				//if ER is NEGATIVE and PR is POSITIVE then g-value is 1.0131
        				g_parameter=g_parameter*1.0131;
        		} else if(pr==2) { //PR Negative
        				//if ER is NEGATIVE and PR is NEGATIVE then g-value is 1.1904
        				g_parameter=g_parameter*1.1904;
        		}
        	break;
          default:
          console.log("default triggered"+er)
        }  //end Switch for erpr
        /********************************************************************
        * Multiply g-parameter with g-value based on HER2 status
        ****************************************************************************/
        switch (her) {
        	case 0:
        		//if HER2 is UNKNOWN then g-value is 1
        		g_parameter=g_parameter*1;
        	break;
        	case 1:
        		//if HER2 is POSITIVE then g-value is 1.515
        		g_parameter=g_parameter*1.515;
        	break;
        	case 2:
        		//if HER2 is NEGATIVE then g-value is 0.9662
        		g_parameter=g_parameter*0.9662;
        	break;
        }  //end switch for HER2

        /********************************************************************
        * Multiply g-parameter with g-value based on histology status
        ****************************************************************************/
        switch (his) {
        	case 0:
        		//if HISTOLOGY is UNKNOWN then g-value is 1
        		g_parameter=g_parameter*1;
        	break;
              case 1:
        		//if HISTOLOGY is DUCTAL then g-value is 1.04495
        		g_parameter=g_parameter*1.04495;
        	break;
        	case 2:
        		//if HISTOLOGY is LOBULAR then g-value is 0.97825
        		g_parameter=g_parameter*0.97825;
        	break;
        	case 3:
        		//if HISTOLOGY is DUCTALandLOBULAR then g-value is 0.8624
        		g_parameter=g_parameter*0.8624;
        	break;
        	case 4:
        		//if HISTOLOGY is MUCINOUS then g-value is 0.42355
        		g_parameter=g_parameter*0.42355;
        	break;
              case 5:
        		//if HISTOLOGY is MEDULLARY then g-value is 0.55305
        		g_parameter=g_parameter*0.55305;
        	break;
        	case 6:
        		//if HISTOLOGY is TUBULAR then g-value is 0.2639
        		g_parameter=g_parameter*0.2639;
        	break;
        	case 7:
        		//if HISTOLOGY is COMEDO then g-value is 0.84305
        		g_parameter=g_parameter*0.84305;
        	break;
        	case 8:
        		//if HISTOLOGY is SCIRRHOUS then g-value is 1.51235
        		g_parameter=g_parameter*1.51235;
        	break;
        	case 9:
        		//if HISTOLOGY is INFLAMMATORY then g-value is 3.1544
        		g_parameter=g_parameter*3.1544;
        	break;
        	case 10:
        		//if HISTOLOGY is PAGETS then g-value is 1.42765
        		g_parameter=g_parameter*1.42765;
        	break;
        	case 11:
        		//if HISTOLOGY is PAPILLARY then g-value is 0.49
        		g_parameter=g_parameter*0.49;
        	break;
        	case 12:
        		//if HISTOLOGY is CRIBIFORM then g-value is 0.70395
        		g_parameter=g_parameter*0.70395;
        	break;
        	case 13:
        		//if HISTOLOGY is APOCRINE then g-value is 0.8505
        		g_parameter=g_parameter*0.8505;
        	break;
        	case 14:
        		//if HISTOLOGY is PHYLLODES then g-value is 0.14972
        		g_parameter=g_parameter*0.14972;
        	break;
        }	//end Switch for histology

        /********************************************************************
        * Multiply g-parameter with g-value based on grade
        ****************************************************************************/
        switch (grade) {
        	case 0:
        		//if GRADE is UNKNOWN then g-value is 1
        		g_parameter=g_parameter*1;
        	break;
        	case 1:
        		//if GRADE is 1 then g-value is 0.41345
        		g_parameter=g_parameter*0.41345;
        	break;
        	case 2:
        		//if GRADE is 2 then g-value is 0.8267
        		g_parameter=g_parameter*0.8267;
        	break;
        	case 3:
        		//if GRADE is 3 then g-value is 1.11584
        		g_parameter=g_parameter*1.11584;
        	break;
        	case 4:
        		//if GRADE is UNDIFFERENTIATED then g-value is 1.23275
        		g_parameter=g_parameter*1.23275;
        	break;
        } //end Switch for grade

    /*********************************************************************
    *  STEP 2.b 	The program calculates the 15-year Kaplan-Meier cancer death rate, L, using the SNAP method and the product of the g parameters
    * Calculates lethality of primary breast cancer tumor (L_primary), lethality of nodes (L_nodes), and 15-year Kaplan Meier cancer * specific death rate (L_breastcancer_KM)
    ***************************************************************************/
        L_primary = 1 - Math.exp(-Qs*g_parameter*j_primary*Math.pow(dia*10,Z));
        L_nodes = 1 - Math.exp(-nnum*R);
        L_breastcancer_KM = L_primary + L_nodes - (L_primary*L_nodes);


    /*********************************************************************
    * STEPs 2.c, 2.d, & 2.e calculate cancer death rate in each of the 15 years following diagnosis
    * Calculates yearly lethalities due to breast cancer and other causes
    ***************************************************************************/
  	for (i=1; i<=15; i++) {
  		//STEP 2.c calculates cancer death rate by multiplying 15yr KM cancer death rate by expected BRCA yearly lethality
  		cancer_death_dist_cumm[i] = cancer_death_dist_cumm[i-1] + L_breastcancer_distribution[i-1]*L_breastcancer_KM;
          //cancer-specific hazard = chance of cancer death / cancer-specific survival to that point
          cancer_death_hazard[i] = L_breastcancer_distribution[i-1]*L_breastcancer_KM / (1-cancer_death_dist_cumm[i-1]);

          L_breastcancer_death_yearly[i]=remaining_percentage[i-1] * cancer_death_hazard[i];

          //STEP 2.d calculates non-BRCA death rate by multiplying the fraction of patients not dying of cancer by the yearly risk of death due to non-cancer causes for the given age
    var agePlus = age + i
    if (age==0){
  		L_nonbreastcancer_prob[i]=0;
  	} else {
  		L_nonbreastcancer_prob[i]=nvsr_death_prob_yearly[agePlus];
  	}
          L_nonbreastcancer_death_yearly[i]=(remaining_percentage[i-1] - L_breastcancer_death_yearly[i]) *L_nonbreastcancer_prob[i];
          //STEP 2.e calculates overall death rate by adding breast cancer deaths to non-breast cancer deaths
          L_overall_death_yearly[i]=L_breastcancer_death_yearly[i]+L_nonbreastcancer_death_yearly[i];
  		remaining_percentage[i]=remaining_percentage[i-1]-L_overall_death_yearly[i];

  	}

    /********************************************************************
    * STEP 2.f  Calculate 15 values for cumulative breast cancer, non-breast cancer, and total death rates by summing the respective yearly values computed in the steps above.
    ****************************************************************************/

        for(i=1;i<=15;i++) {
        	L_cancer_death_cumm[i]=L_cancer_death_cumm[i-1]+L_breastcancer_death_yearly[i];
        	L_noncancer_death_cumm[i]=L_noncancer_death_cumm[i-1]+L_nonbreastcancer_death_yearly[i];
        	L_overall_death_cumm[i]=L_overall_death_cumm[i-1]+L_overall_death_yearly[i];
        }

    /********************************************************************
    * STEP 3   Calculate the mean number of years of life left that can be expected for the cancer patient
    ****************************************************************************/

    /********************************************************************
    * STEP 3.a   Calculate the life expectancy for the cancer patient by multiplying the chance of dying in each of the years 1-15 by the number of years survived to that point.  Then add the NVSR life expectancy for people 15 years older than the patient's current age, multiplied by the patients chance of surviving 15 years.
    ****************************************************************************/
        calc_life_expectation = 0;
        for (i=1; i<=15; i++){
            calc_life_expectation = calc_life_expectation + L_overall_death_yearly[i] * (i-0.5);
        }
        calc_life_expectation = calc_life_expectation + (1 - L_overall_death_cumm[15]) * (nvsr_life_expect[age + 15] +15)

    /********************************************************************
    * STEP 3.b   The program calculates the expected years of life lost due to cancer, by subtracting the calculated life expectancy (step 3.a) from the NVSR-given life expectancy for the specified age.
    ****************************************************************************/

        expect_years_life_lost = nvsr_life_expect[age] - calc_life_expectation;

    /***************************************************************
    * Determine whether projections exceed 100 years of age, and remove such projections-- data is not projected to ages above 100
    **************************************************************/
        age_difference = 100-age;

        if (age_difference<15){
        	for (i=age_difference; i<=15; i++) {
        		L_cancer_death_cumm[i]=L_cancer_death_cumm[age_difference];
        		L_noncancer_death_cumm[i]=L_noncancer_death_cumm[age_difference];
        		L_overall_death_cumm[i]=L_overall_death_cumm[age_difference];
        	}
        }

    /***************************************************************
    * Determine whether cumulative death rate exceeded 1, and terminate projections
    **************************************************************/
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

/*****************************
* Throws alert messages if age is 0 or over 100
****************************/
    if (age==0){
    	console.log("Note: Calculations do not incorporate non-breast-cancer risk.")
    } else if (age>85) {
    	console.log("Note: Calculations end at age 100 due to the lack of viable data for people over the age of 100.")
    } else {
    }

/*****************************
* Throws alert messages if tumor size or nodes exceeds values for which we have validated the calculator
****************************/
    if (dia>5 || nnum>10) {
    	console.log("Note: The tumor size and/or number of positive nodes entered exceeds the values against which the calculator has been validated, 50mm and 10 nodes respectively.")
    }


    console.log("life_expect:"+Math.round(nvsr_life_expect[age]*10)/10)
    console.log("expect_life_lost:"+Math.round(expect_years_life_lost*10)/10)
    console.log("life_expect_with_cancer:"+Math.round((nvsr_life_expect[age] - expect_years_life_lost)*10)/10)
    console.log("l_km:"+Math.round(L_breastcancer_KM*1000)/10)
    console.log("l_expected:"+Math.round(L_cancer_death_cumm[15]*1000)/10)

  }
}
