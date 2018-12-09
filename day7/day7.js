$(document).ready(function(){
    let result          = day7();
    // Part 2 needs refactoring
    let result_2        = day7Part2();
});

function day7() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\r', ''),
                    list            = allText.split('\n'),
                    order           = '',
                    todo_req        = new Array(),
                    req             = new Array(),
                    t0, t1;

                t0 = performance.now();


                for(const el of list) {
                    let list_var = el.split(' ')[1],
                        list_req = el.split(' ')[7];

                    todo_req.push({step: list_var,  req: list_req});
                    req.push(list_req);
                }
            
                while(1) {
                    let arr         = new Array(),
                        arr_idx     = new Array();

                    for(let element of todo_req) {
                        let filter = req.filter(letter => element.step == letter);

                        if( (filter.length == 0)) {
                            arr_idx.push(element.step);
                            arr.push(element);
                        }
                    }

                    arr_idx.sort();
                    order += arr_idx[0];

                    if(todo_req.length == 1) {
                        order += todo_req[0].req;
                        break;
                    }

                    for(let index = todo_req.length - 1 ; index >=0 ; index--) {
                        if(Object.values(todo_req)[index].step == arr_idx[0]) {
                            todo_req.splice(index,1);
                            req.splice(index,1);
                        }
                    }
                }
                
                t1 = performance.now();

                $("#first_result").text(order);
                $("#timer").text(t1-t0 + ' miliseconds');              
            }
        }
    }
    input.send(null);
}

function day7Part2() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\r', ''),
                    list            = allText.split('\n'),
                    todo_req        = new Array(),
                    req             = new Array(),
                    alphabet_values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
                    _workers         = [
                        {id: 0, work:false, start_:0, end_:0, letter: ''},
                        {id: 1, work:false, start_:0, end_:0, letter: ''},
                        {id: 2, work:false, start_:0, end_:0, letter: ''},
                        {id: 3, work:false, start_:0, end_:0, letter: ''},
                        {id: 4, work:false, start_:0, end_:0, letter: ''}
                    ],
                    _workers_letter = [],
                    timer = 0,
                    alphabet,
                    t0, t1;

                t0 = performance.now();

                //swap key and value
                alphabet = swap(alphabet_values);

                for(const el of list) {
                    let list_var = el.split(' ')[1],
                        list_req = el.split(' ')[7];

                    todo_req.push({step: list_var,  req: list_req});
                    req.push(list_req);
                }

                while(1) {
                    let arr_idx     = new Array(),
                        active      = new Array();


                    for(let element of todo_req) {
                        let filter = req.filter(letter => element.step == letter);

                        if( (filter.length == 0)) {
                            if(active[element.step]) {
                            } else {
                                arr_idx.push(element.step);
                                active[element.step] = true;    
                            }                           
                        }
                    }

                    if(arr_idx.length > 0) {
                        arr_idx.sort();
                        let index=0, 
                            index_letter = 0;

                        for(index_letter = 0 ; index_letter < arr_idx.length; index_letter++) {
                            let cur_work = false;

                            for(index = 0; index < _workers.length; index++) {
                                // Check current work condition
                                if(!_workers[index].work && !cur_work && !_workers_letter[arr_idx[index_letter]] && _workers[index].end_ != timer) {
                                    _workers[index].work     = true;
                                    _workers[index].start_    = timer;
                                    // Timer starts at zero, remove 1
                                    _workers[index].end_      = (timer + alphabet[arr_idx[index_letter]] + 60)-1;
                                    _workers[index].letter   = arr_idx[index_letter];

                                    // Filter Work for the current timer
                                    _workers_letter[arr_idx[index_letter]]  = true;
                                    cur_work                                = true;
                                } else if(_workers[index].end_ == timer && _workers[index].work) {
                                    _workers[index].work   = false;

                                    // remove element
                                    for(let index_2 = todo_req.length - 1 ; index_2 >=0 ; index_2--) {
                                        if(Object.values(todo_req)[index_2].step == _workers[index].letter) {
                                            todo_req.splice(index_2,1);
                                            req.splice(index_2,1);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if(todo_req.length == 1) {                   
                        timer += alphabet[todo_req[0].step] + 60;
                        timer += alphabet[todo_req[0].req] + 60;
                        break;
                    } else {
                        timer++;
                    }
                }
                t1 = performance.now();                
                $("#second_result").text(timer);
                $("#timer_2").text(t1-t0 + ' miliseconds');

            }
        }
    }
    input.send(null);
}

function swap (arr) {
    let new_arr = new Array();

    for(let idx = 0; idx < arr.length; idx++) {
        new_arr[arr[idx]] = idx+1;
    }

    return new_arr;
}