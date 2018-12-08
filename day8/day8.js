$(document).ready(function(){
    let result          = day8();
    let result_2        = day8Part2();
});


function day8() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\r', ''),
                    list            = allText.split(' '),
                    sum             = 0,
                    child           = [],
                    t0, t1;

                t0 = performance.now();
                
                for(let idx = 0; idx < list.length; idx++) {
                    if(list[idx] == 0) {
                        idx++
                        let n_entries = list[idx];
                        
                        for(let idx_sum=0; idx_sum < n_entries; idx_sum++) {
                            idx++;

                            sum += Number(list[idx]);
                        }
                        [child, list, idx, sum] = remove(child,list,idx, sum);
                    } else {
                        let n_child = Number(list[idx]),
                            entries = Number(list[idx+1]);
                        idx++;
                        child.push({child: n_child, entries: entries});
                    }

                }

                t1 = performance.now();
                $("#first_result").text(sum);
                $("#timer").text(t1-t0 + ' miliseconds');

                // PART 2
                

                
            }
        }
    }
    input.send(null);
}


function day8Part2() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\r', ''),
                    list            = allText.split(' '),
                    sum             = 0,
                    child           = [],
                    t0, t1;

                t0 = performance.now();
                
                for(let idx = 0; idx < list.length; idx++) {
                    if(list[idx] == 0) {
                        idx++
                        let n_entries = list[idx];
                        
                        for(let idx_sum=0; idx_sum < n_entries; idx_sum++) {
                            idx++;

                            sum += Number(list[idx]);
                        }
                        [child, list, idx, sum] = remove(child,list,idx, sum);
                    } else {
                        let n_child = Number(list[idx]),
                            entries = Number(list[idx+1]);
                        idx++;
                        child.push({child: n_child, entries: entries});
                    }

                }

                t1 = performance.now();
                $("#first_result").text(sum);
                $("#timer").text(t1-t0 + ' miliseconds');

                // PART 2
                

                
            }
        }
    }
    input.send(null);
}


function remove(child, list, idx, sum){
    if(child.length <= 0) return [child, list, idx, sum];

    child[child.length-1].child = child[child.length-1].child-1;

    if(child[child.length-1].child == 0) {
        let n_entries = child[child.length-1].entries

        for(let idx_sum = 0; idx_sum < n_entries; idx_sum++) {
            idx++;
            sum += Number(list[idx]);
        }
        child.pop();

        [child, list, idx, sum] = remove(child,list,idx, sum);
    }
    return [child, list, idx, sum];
}