$(document).ready(function(){
    // Using alert to get the exact number os "seconds"
    let result          = day10();
});


function day10() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText             = input.responseText.replace('\r', ''),
                    lines               = allText.split('\n'),
                    points              = [];

                for(let line of lines) {
                    let coord       = line.split(/(\<(.*?)\>)/)[1],
                        velocity    = line.split(/(\<(.*?)\>)/)[4],
                        cx =Number(coord.split(',')[0].split('<')[1].trim()),
                        cy =Number(coord.split(',')[1].split('>')[0].trim()),
                        vx =Number(velocity.split(',')[0].split('<')[1].trim()),
                        vy =Number(velocity.split(',')[1].split('>')[0].trim());
                        
                    points.push({cx: cx, cy: cy, vx: vx, vy: vy});
                }
                intervalfunc(points);
            }
        }
    }
    input.send(null);
}


function intervalfunc(input) {
    var points      = input,
        time        = 0,
        box_size    = 100;

    while(1) {
        let html        = '<code>',
        cur_points  = [], 
        miny        = 0,
        maxy        = 0,
        minx        = 0,
        maxx        = 0,
        first       = true;

        for(let index = 0; index < points.length; index++) {
            let x = points[index].cx,
                y = points[index].cy;

            if(first) {
                miny = y;
                maxy = y;
                minx = x;
                maxx = x;

                first = false;
            } else {
                if(miny > y) miny = y;
                if(maxy < y) maxy = y;
                
                if(minx > x) minx = x;
                if(maxx < x) maxx = x;
            }

            cur_points[x + '_' + y] = true;
            points[index].cx += points[index].vx;
            points[index].cy += points[index].vy;
        }

        if(maxx - minx < box_size && maxy - miny < box_size) {
            for(let idy = miny - 10; idy < maxy + 10; idy++) {
                html += '<p>';
                for(let idx = minx - 10; idx < maxx + 10; idx++) {
                    
                    if(cur_points[idx+'_'+idy]) {
                        html += '<b>#</b> ';
                    } else {
                        html += ". ";
                    }
                }
                html += '</p>';
            }

            html += '</code>';

            $("#draw").empty();
            $("#draw").append(html);
            // Shows number of seconds while drawing
            alert(time);
        }
        time++;
    }
}