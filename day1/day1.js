$(document).ready(function(){
    let result          = day1();
    let result_part2    = day1Part2();
});


function day1() {
    var input       = new XMLHttpRequest();
    var file_path   = 'insert your file path here';

    input.open("GET", file_path, false);
    input.onreadystatechange = function ()
    {
        if(input.readyState === 4)
        {
            if(input.status === 200 || input.status == 0)
            {
                var allText     = input.responseText;
                var array_nr    = allText.split("\n");
                var frequency   = 0;

                $.each(array_nr, function(index, value) {
                    frequency += (value? (value * 1) : 0);
                });

                $("#first_result").text(frequency);
            }
        }
    }
    input.send(null);
}


function day1Part2() {
    var input = new XMLHttpRequest();
    var file_path   = 'insert your file path here';

    input.open("GET", file_path, false);
    input.onreadystatechange = function ()
    {
        if(input.readyState === 4)
        {
            if(input.status === 200 || input.status == 0)
            {
                var allText             = input.responseText;
                    array_nr            = allText.split("\n"),
                    reached_frequency   = false;
                    stored_frequency    = [],
                    frequency           = 0;

                while(1) {
                    for(let value of array_nr) {
                        frequency += Number(value);
    
                        if(stored_frequency[frequency]) {
                            reached_frequency = true;
                            break;
                        } else {
                            stored_frequency[frequency] = 1;
                        }
                    }

                    // frequency was reached
                    if(reached_frequency) {
                        $("#second_result").text(frequency);
                        break;
                    }
                }
            }
        }
    }
    input.send(null);
}
