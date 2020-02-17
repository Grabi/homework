
// CalculateDueDate([Date],[integer])
/*
CalculateDueDate(new Date(),9)
CalculateDueDate(new Date("Feb 19 2020 10:13 PM"),9)
CalculateDueDate(new Date("Feb 19 2020 10:13 AM"),9)
*/

function CalculateDueDate(sumbit_date, turnaround) {
    var working_hours = {
        "start": 9,
        "end": 17
    }
    
    // If sumbit_date is not a Date then error
    if (Object.prototype.toString.call(sumbit_date) === "[object Date]" && isNaN(sumbit_date.getTime())) {
        return "Not valid format please try again with valid Date format"
    }
    // If turnaround is not  number then error
    if (isNaN(turnaround) || turnaround == null) { 
        return "The turnaround must be a number time please try again with a number"
    }
    // If the submit date is not in the specified time interval then error
    if (sumbit_date.getDay() % 6 == 0) {
        return "You can't subbmit on weekends, please try again on working days"
    }
    // If the submit is not on working day then error
    if (sumbit_date.getHours() < working_hours.start || sumbit_date.getHours() >= working_hours.end) {
        return "You can't subbmit out of working hours (9AM-5PM) please try again in working hours"
    } 

    // If everything is OK:  
    var return_date;
    // We need to add the weekends if it's predictable 
    let turnaround_days = Math.floor(turnaround / 8) + Math.floor(turnaround / 8 / 5) * 2;
    // We need to calculate the time we had besides from the wohole days
    var left_tunroround_millisecond = (turnaround - Math.floor(turnaround / 8) * 8) * 60 * 60 * 1000;
    // We calculate the time we left from the submit day in millisecond  
    const remain_from_submit_day_millisecond = new Date(new Date(sumbit_date).setHours(working_hours.end, 0, 0) - sumbit_date).getTime();

    // If we don't had enough time durring the day it will push it tommmorw        
    if (remain_from_submit_day_millisecond <= left_tunroround_millisecond) {
        turnaround_days++;
        left_tunroround_millisecond -= remain_from_submit_day_millisecond;
    }


    // We create the return date beacuse we need to see it's on weekend or not
    return_date = new Date(sumbit_date.setDate(sumbit_date.getDate() + turnaround_days));
    // We adding the remaining time to the return date   
    return_date.setHours(Math.floor(working_hours.start + left_tunroround_millisecond / (60 * 60 * 1000)));

    // If the returning date is on weekend then this will push it to the next week    
    if (return_date.getDay() % 6 == 0) {
        let ballance;
        if (return_date.getDay() == 0) {
            ballance = 1
        } else {
            ballance = 2
        }
        return_date = new Date(return_date.setDate(return_date.getDate() + ballance));
    }

    // Here we can format the returning date 
    return return_date
    
}
