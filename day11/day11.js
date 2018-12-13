$(document).ready(function(){
    let result          = day11(); 
});


function day11() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let input   = 1309,
                    cells   = [];


                for(let idy = 1; idy <= 300; idy++) {
                    for(let idx = 1; idx <= 300; idx++) {
                        let cell    = idx + '_' + idy;

                        cells[cell] = power(idx, idy, input);
                    }
                }

                var res_x = 0;
                var res_y = 0;
                var max_power = -99999999999999;

                // Part 1
                for(let idx = 1; idx <= 300; idx++) {
                    for(let idy= 1; idy <= 300; idy++) {
                        let total_power = 0; 

                        for(let ix = 0; ix < 3; ix++) {
                            for(let iy = 0; iy < 3; iy++) {
                                total_power += power(idx+ix, idy+iy, input);
                            }
                        }

                        if(total_power > max_power){
                            res_x = idx;
                            res_y = idy;
                            max_power = total_power;
                        }
                    }
                }

                console.log('Part 1: ' + res_x, res_y, max_power);

                
                
                
                
                var res_x = 0;
                var res_y = 0;
                var max_size = 0;
                var max_power = -99999999999999;
                
                // Not yet correct
                // for (var x = 1; x < 301-size; x++)
                //   for (var y = 1; y < 301-size; y++) {
                //     power = 0;

                //     // TODO - 
                    
                //     power = sumBox(cells, x, y, size);
                
                //     if (power > max_power){
                //         max_power   = power;
                //         max_size    = size
                //         res_x       = x;
                //         res_y       = y;
                //     } 
                //   }
                //   console.log('Part 2: ' + res_x, res_y, max_size);
                // Part 2
                // for(let idx = 1; idx <= 300; idx++) {
                //     for(let idy = 1; idy <= 300; idy++) {
                //         let cur_power   = -9999999999,
                //             cur_size    = 0,
                //             cell        = cells[idx+'_'+idy],
                //             counter     = 1,
                //             total_power,
                //             limit       = Math.min(301 - idx, 301 - idy);

                //         while(counter < limit && (counter < 6 || total_power > cell)) {
                //             total_power = sumBox(cells, idx, idy, counter);
                //             if(total_power > cur_power) {
                //                 cur_power   = total_power;
                //                 cur_size    = counter;
                //             }
                //             counter++;
                //         }

                //         if(cur_power > max_power){
                //             max_power   = cur_power;
                //             max_size    = cur_size
                //             res_x       = idx;
                //             res_y       = idy;
                //             console.log(idx,idy);
                //         } 
                //     }
                // }
            //console.log('Part 2: ' + res_x, res_y, max_size);
            }
        }
    }
    input.send(null);
}

function power(idx, idy, input) {
    hundred = ((((idx+10) * idy ) + input)  * (idx+10)).toString(),
    hundred = Number((hundred.length > 3? hundred[hundred.length - 3] : 0));

    return hundred - 5;
}

function sumBox(cells, x, y, size) {
    let sum = 0;
    for(let i = x; i < x + size; i++) {
        for(let j = y; j < y + size; j++) {
            sum += cells[i+'_'+j];
        }
    }
    return sum;
}
