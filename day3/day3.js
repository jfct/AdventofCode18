$(document).ready(function(){
    let result          = day3();
    let result_2        = day3Part2();
});


function day3() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';


    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                var allText     = input.responseText;
                var array_nr    = allText.split("\n");
                var res         = 0;

                var array_inches = new Array();

                $.each(array_nr, function(index, str) {
                    // Split id from the information first
                    // #1 @ 309,778: 13x25
                    let token_information   = str.split("@")[1].split(":");
                    let token_offset        = token_information[0].split(",");
                    let token_size          = token_information[1].split("x");
                    let offset_x            = Number(token_offset[0]);
                    let offset_y            = Number(token_offset[1]);
                    let size_x              = Number(token_size[0]);
                    let size_y              = Number(token_size[1]);

                    for(let index_x = 0; index_x < size_x ; index_x++) {
                        for(let index_y = 0; index_y < size_y ; index_y++) {
                            var space = (offset_x + index_x) + '_' + (offset_y + index_y);

                            if(typeof array_inches[space] === 'undefined') {
                                array_inches[space] = 1;
                            } else if(array_inches[space] == 1) {
                                array_inches[space]++;
                                res++;
                            }
                        }
                    }
                });
                $("#first_result").text(res);
            }
        }
    }
    input.send(null);
}

function day3Part2() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                var allText         = input.responseText;
                var array_nr        = allText.split("\n");
                var array_inches    = new Array();
                var array_ids       = new Array();

                $.each(array_nr, function(index, str) {
                    // Split id from the information first
                    // #1 @ 309,778: 13x25
                    let token_information   = str.split("@")[1].split(":");
                    let token_id            = str.split("@")[0];
                    let token_offset        = token_information[0].split(",");
                    let token_size          = token_information[1].split("x");
                    let offset_x            = Number(token_offset[0]);
                    let offset_y            = Number(token_offset[1]);
                    let size_x              = Number(token_size[0]);
                    let size_y              = Number(token_size[1]);

                    array_ids[token_id] = true;
                    for(let index_x = offset_x; index_x < size_x + offset_x ; index_x++) {
                        for(let index_y = offset_y; index_y < size_y + offset_y ; index_y++) {
                            let space = index_x + '_' + index_y;
                            if(array_inches[space]) {
                                array_ids[array_inches[space]] = false;
                                array_ids[token_id] = false;
                            }
                            array_inches[space] = token_id;
                        }
                    }
                });

                //  Filters array of ids to find the one that is true
                let result = Object.entries(array_ids).filter(v => v[1]);
                $("#second_result").text(result);
            }
        }
    }
    input.send(null);
}
