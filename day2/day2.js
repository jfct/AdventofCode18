$(document).ready(function(){
    let result          = day2();
    let result_2        = day2Part2();
});


function day2() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function ()
    {
        if(input.readyState === 4)
        {
            if(input.status === 200 || input.status == 0)
            {
                var allText     = input.responseText;
                var array_nr    = allText.split("\n");
                var bucket      = {};
                var res         = 1;

                $.each(array_nr, function(index, str) {
                    var line_bucket     = {};
                    var repeat_bucket   = {};
                    for (var index = 0; index < str.length; index++) {
                        line_bucket[str.charAt(index)] = (line_bucket[str.charAt(index)]? line_bucket[str.charAt(index)]+1 : 1);    
                    }

                    for(let key of Object.keys(line_bucket)) {
                        if(!repeat_bucket[line_bucket[key]]) {
                            bucket[line_bucket[key]] = (bucket[line_bucket[key]]? bucket[line_bucket[key]]+1 : 1);
                            repeat_bucket[line_bucket[key]] = 1;
                        }
                    }
                });

                for(let key of Object.keys(bucket)) {
                    if(key == 2 || key == 3){
                        res *= bucket[key];
                    }
                }

                $("#first_result").text(res);
            }
        }
    }
    input.send(null);
}

function day2Part2() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function ()
    {
        if(input.readyState === 4)
        {
            if(input.status === 200 || input.status == 0)
            {
                var allText     = input.responseText;
                var array_nr    = allText.split("\n");
                var res         = false;

                for(var index = 0; index < array_nr.length; index++) {
                    if(res) break;

                    // Jump so they don't compare the same element
                    index++;

                    for(var index_2 = index; index_2 < array_nr.length; index_2++) {
                        res = checkDiff(array_nr[index], array_nr[index_2]);
                        if(res) {
                            console.log(res);
                            break;
                        }
                    }
                }           
                $("#second_result").text(res);
            }
        }
    }
    input.send(null);
}

// Same size strings
function checkDiff(str, str2) {
    let n_diff      = 0;
    let pos         = 0;
    let common      = '';

    for(let index = 0; index < str.length; index++) {
        if (str.charAt(index) != str2.charAt(index)) {
            if(n_diff == 1) {
                return false;
            }
            pos     = index;
            common  = str;
            n_diff++;
        }
    }
    return common.slice(0, pos) + common.slice(pos+1);
}