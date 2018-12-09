$(document).ready(function(){
    // Part 1 and 2 together
    let result          = day6();
});

function day6() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let coord       = input.responseText.split('\n'),
                    input2      = input.responseText.split('\n').map(r => numbers(r)),
                    edge        = [],
                    closest     = {},
                    max_x       = 0,
                    max_y       = 0,
                    inRegion    = 0,
                    t0, t1;

                for(element of coord) {
                    let split = element.split(',');
                    if(split[0]*1 > max_x) max_x = Number(split[0]);
                    if(split[1]*1 > max_y) max_y = Number(split[1]);
                }

                t0 = performance.now();

                for (let index_x = 0; index_x < max_x+1; index_x++) {
                  for (let index_y = 0; index_y < max_y+1; index_y++) {
                    let curPoint    = [index_x, index_y],
                        totalDist   = 0,
                        distances   = [];

                    for (const point of input2) {
                        let distance = dist(point, curPoint);
                        distances.push([pointId(point), distance]);
                        totalDist += distance;
                    }

                    if (totalDist < 10000) inRegion++;
                    
                    sortBy(distances, a => a[1]);
                    if (distances[0][1] === distances[1][1]) continue;

                    if(index_x == 0 || index_y == 0 || index_x == max_x || index_y == max_y) {
                        edge[distances[0][0]] = true;
                    }

                    inc(closest, distances[0][0]);
                  }
                }
                
                for(let index=0; index < Object.keys(edge).length ; index++) {
                    delete closest[Object.keys(edge)[index]];
                }
                
                t1 = performance.now();

                $("#first_result").text(Math.max(...Object.values(closest)));
                $("#second_result").text(inRegion);
                $("#timer").text(t1-t0 + ' miliseconds');
            }
        }
    }
    input.send(null);
}


function numbers(str) {
    return (str.match(/-?[0-9]+/g) || []).map(Number);
}

function inc(table, key, amt = 1) {
    table[key] = (table[key] || 0) + amt;
}

function sortBy(array, criterion = a => a) {
    return array.sort((a, b) => {
        const aBy = criterion(a);
        const bBy = criterion(b);
        if (aBy == bBy) return 0;
        return (aBy > bBy ? 1 : -1);
    });
}

function dist(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function pointId([a, b]) {
    return `${a},${b}`;
}

  