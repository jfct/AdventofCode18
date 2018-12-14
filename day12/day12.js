$(document).ready(function(){
    let result          = day12();
    
});


function day12() {
    var initial_state   = '.##..##..####..#.#.#.###....#...#..#.#.#..#...#....##.#.#.#.#.#..######.##....##.###....##..#.####.#.............';
    //var initial_state   = '#..#.#..##......###...###';
    var input           = new XMLHttpRequest();
    var file_path       = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText             = input.responseText.replace('\r', ''),
                    lines               = allText.split('\n'),
                    rules               = [],
                    istate              = initial_state.split(''),
                    t0, t1;

                t0 = performance.now();
                for(line of lines) {
                    rule    = line.split('=>')[0].trim();
                    res     = line.split('=>')[1].trim();

                    rules.push({rule:rule, res: res});
                }

                let teste = [], counter = 0;

                for(i of istate) {
                    teste.push({pos: counter, plant: i});
                    counter++;
                }
                istate = teste;
                
                console.log(JSON.parse(JSON.stringify(istate.map(d => d.plant).join(''))))

                var previous            = 0;
                var current             = 0;
                var increase            = 0;
                var previous_increase   = 0;
                var stability           = 0;
                var stability_start     = 0;
                var stability_gen       = 0;

                for(let i = 1; i <= 200; i++) {
                    let arr = [];

                    for(let idx = 0; idx < istate.length; idx++) {
                        let selection = '';

                        for(let idl = -2; idl <= 2; idl++) {
                            let indx_state  = istate.findIndex(v => v.pos == istate[idx].pos + idl),
                                indx_arr    = arr.findIndex(v => v.pos == istate[idx].pos + idl);

                            if(indx_state == -1 && indx_arr == -1) {
                                arr.push({pos: istate[idx].pos + idl, plant: '.'});
                                selection += '.';
                            } else {
                                let plant = (istate[indx_state] == undefined? arr[indx_arr].plant : istate[indx_state].plant);
                                selection += plant;
                            }
                        }

                        let flag = true;
                        for(rule of rules) {
                            if(selection == rule.rule) {
                                arr.push({pos : istate[idx].pos, plant: rule.res});
                                
                                flag = false;
                                break
                            }
                        }

                        if(flag) {
                            arr.push({pos : istate[idx].pos ,plant: '.'});
                        }
                    }
                    
                    istate = arr;
                    istate.sort(function(a, b) {
                        return a.pos - b.pos;
                    });

                    let cut = 0;
                    for(let idx = istate.length-1; idx >=0 ; idx--) {
                        if(istate[idx].plant == '#') {
                            cut = idx;
                            break;
                        }
                    }
                    istate.length = cut + 3 ;

                    current = sumPlants(istate);

                    if(i == 19) {
                        $("#first_result").append(current);
                    }

                    increase = current - previous;
                    console.log(increase, current, i);
                    
                    // if it's the same increase predict that the result is normalizing
                    if(increase == previous_increase) {
                        stability++;
                        if(stability_start == 0) {
                            stability_start = current;
                            stability_gen   = i;
                        }
                    } else {
                        stability_start = 0;
                    }
                    
                    // 10 in a row predicts stable increase
                    if(stability == 10)  {
                        break;
                    }
                    previous            = current;
                    previous_increase   = increase;
                }               
                
                let part2 = (stability_start + (50000000000 - (stability_gen)) * increase);

                t1 = performance.now();
                $("#second_result").append(part2);
                $("#timer").append(t1-t0 + 'miliseconds');
            }
        }
    }
    input.send(null);
}


function sumPlants(istate) {
    let sum = 0;

    for(i of istate) {
        if(i.plant == '#') {
            sum+= i.pos;
        }
    }

    return sum;
}