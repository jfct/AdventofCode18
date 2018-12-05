$(document).ready(function(){
    let result          = day4();
});

var sortDate = function (a, b) {
    var keyA = new Date(a.time),
        keyB = new Date(b.time);
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
}

// Both strategies in the same function
function day4() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                var t0 = performance.now();

                let allText                 = input.responseText,
                    array_nr                = allText.split("\n"),
                    ordered_time            = new Array(),
                    guard_info              = new Array(),
                    current_guard           = '',
                    strategy1_max_guard     = 0,
                    strategy1_max           = 0,
                    strategy2_max_guard     = 0,
                    strategy2_max           = 0,
                    max_value               = 0,
                    start_sleep             = 0;

                $.each(array_nr, function(index, line) {
                    let str = line.split(' ');
                    ordered_time.push({
                            time: str[0].replace('[',  '')+ ' ' +str[1].replace(']', ''),
                            value: str[2] + ' ' + str[3]
                    });                 
                });

                // Sort by date
                ordered_time.sort(sortDate);

                ordered_time.forEach(function(element) {
                    let action = element.value.split(' ')[0];
                    let minute = Number(element.time.substring(14,16));
            
                    if(action == 'Guard') {
                        current_guard = Number(element.value.split(' ')[1].replace('#', ''));
                        if(!guard_info[current_guard]) {
                            guard_info[current_guard] = new Array();
                            guard_info[current_guard] = {total_slept: 0, mins: new Array()};
                        }
                    } else if (action == 'falls') {
                        start_sleep = minute;
                    } else if (action == 'wakes') {
                        // Count total minutes slept
                        guard_info[current_guard].total_slept += (minute - start_sleep);
            
                        // Check the guard with the most minutes
                        if(guard_info[current_guard].total_slept > strategy1_max) {
                            strategy1_max_guard   = current_guard;
                            strategy1_max         = guard_info[current_guard].total_slept;
                        }
            
                        // Fill the sleep intervals 
                        for(let index_min = start_sleep; index_min < minute; index_min++) {
                            if(guard_info[current_guard].mins[index_min]) {
                                guard_info[current_guard].mins[index_min] = 1 + guard_info[current_guard].mins[index_min];
                        
                                // Keep checking the guard that has slept in the same minute
                                if(guard_info[current_guard].mins[index_min] > strategy2_max) {
                                    strategy2_max_guard = current_guard;
                                    strategy2_max       = guard_info[current_guard].mins[index_min];
                                }
                            } else {
                                guard_info[current_guard].mins[index_min] = 1;
                            }
                        }
                    }
                });
                
                // Get the minute(index) with the most ocurrences(max)
                strategy1_max_minute = guard_info[strategy1_max_guard].mins.findIndex(v => {return v == Math.max(...guard_info[strategy1_max_guard].mins); });
                strategy2_max_minute = guard_info[strategy2_max_guard].mins.findIndex(v => {return v == Math.max(...guard_info[strategy2_max_guard].mins); });

                var t1 = performance.now();

                $("#first_result").text(strategy1_max_guard);
                $("#first_result_2").text(strategy1_max_minute);

                $("#second_result").text(strategy2_max_guard);
                $("#second_result_2").text(strategy2_max_minute);

                $("#timer").text(t1-t0 + 'miliseconds');
            }
        }
    }
    input.send(null);
}


