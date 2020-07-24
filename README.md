# checkCounterTest
Purpose: Determine if the check matching process is better suited for an object oriented approach.
    // Instead of adding the check details to individual fields on the schedule, the check details would
    //create a related Check object. 

What are the criteria for claiming an object oriented approach is preferable to a field-value approach?
    //The main criteria is the frequency of having multiple check details attached to a single schedule. 
    //If this is a common occurence, reporting and associated apex will greatly increase in complexity. 


The program uses the Q2 CourtTv Mystery Paid Programming data from Training Sandbox. This data is not perfect, 
//so perhaps we will change to use the Production data instead.  This program uses the check data from Havas for all 
//Q2 to make the comparisons. Once the test is working we can extend it to more than one quarter if necessary.

//------------------------------------------------
//Process Steps

//0. Create vars
    //array of check records (implied from csv)

    //array of schedules (implied from csv)

    //map of schedules where key is 'week-lf', value is array of check details
    //ex. {'03-12-2020 A-4:00' : [ {checkDetails1}, {checkDetails2}, {checkDetails3}] }

    //map of schedule counts (how many checks are attached to each schedule?) 
    //{0: 20, 1: 190, 2: 19, 3: 1}
    //^ 20 schedules have 0 checks ^
    //  190 schedules have 1 check
    //  19 schedules have 2 checks
    //  1 schedule has 3 checks


//------------------------------------------------

//1. Save the checksheet and schedule excel sheet to variables
   //a. Format Dates and Times so data is comparable

//2.Iterate through the check data array 
    // a. For each check find the associated schedule     
    // b. Determine if there is another check attached to that schedule and update the counter variables

//3. Return the values of the counter. How many schedules have multiple check details?

        
//------------------------------------------------
