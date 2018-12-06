$(document).ready(function(){
    let result          = day5();
});

function day5() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\n', '').replace('\r', ''),
                    polymer         = allText.split(''),
                    alphabet        = 'abcdefghijklmnopqrstuvwxyz'.split(''),
                    lowest_polymer,
                    t0, t1, first = true;
                    
                // PART 1
                t0 = performance.now();
                let result_1 = checkPolymer(polymer);
                t1 = performance.now();
                $("#first_result").text(result_1);
                $("#timer").text(t1-t0 + ' miliseconds');

                // PART 2
                t0 = performance.now();
                for(let letter of alphabet) {
                    let regex           = new RegExp(letter.toLowerCase() +'|'+ letter.toUpperCase(), 'g');
                    let polymer_ignore  = allText.replace(regex, '').split('');

                    result = checkPolymer(polymer_ignore);
                    lowest_polymer = (first && !lowest_polymer? result : (lowest_polymer > result? result : lowest_polymer));
                }
                t1 = performance.now();
                $("#second_result").text(lowest_polymer);
                $("#timer_2").text(t1-t0 + ' miliseconds');
            }
        }
    }
    input.send(null);
}

function checkPolymer(polymer) {
    let stack = [];

    for(let index = 0; index < polymer.length; index++) {
        let char = polymer[index],
            last_entry = stack[stack.length - 1];

        if( stack.length < 1 || ( (char == last_entry) && (checkCase(char) == checkCase(last_entry)) ) || char.toLowerCase() != last_entry.toLowerCase() ) {
            stack.push(char);
        } else {
            stack.pop();
        }
    }
    
    return stack.length;
}

function checkCase(str) {
    let is_lower_case = (str == str.toLowerCase() && str != str.toUpperCase());
    return (is_lower_case? 'toLowerCase' : 'toUpperCase');
}