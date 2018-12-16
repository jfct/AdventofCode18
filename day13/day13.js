$(document).ready(function(){
    // Priting on the browser
    let result          = day13();
});

var board       = [];
var track       = [];
var cart_turn   = {};
var x           = 0;
var y           = 0;
var carts       = 0;
var counter     = 0;

var flag_crash = true;
var final_flag = false;

function day13() {
    var input           = new XMLHttpRequest();
    var file_path       = 'input.txt';
    var t0, t1;
    
    t0 = performance.now();

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText             = input.responseText.replace('\r', ''),
                    lines               = allText.split('\n');

                for(line of lines) {
                    let str = line.replace('\r', '').split('');
                    board[y] = new Array(),
                    piece = '',
                    str_line = new Array(),
                    str_track= new Array();

                    for(let x = 0; x < str.length; x++) {
                        if(str[x] == "\\" || str[x] == '-' || str[x] == '+' || str[x] == "/" || str[x] == '|') {
                            str_line.push(str[x]);
                            str_track.push(str[x]);
                        } else  {
                            str_line.push(str[x]);

                            if(str[x] == 'v' || str[x] == '^') {
                                str_track.push('|'); 
                                carts++;
                            } else if(str[x] == '>' || str[x] == '<') {
                                str_track.push('-');
                                carts++;
                            } else {
                                str_track.push(' ');
                            }
                        }
                    }

                    board[y] = str_line;
                    track[y] = str_track;
                    y++;
                    if(x < str.length) x = str.length;
                }
            }
        }
    }
    input.send(null);

    // Loop "ticks"
    while(1) {
        if(carts == 1) break;
        tick();
    }

    t1 = performance.now();
    $("#timer").append(t1-t0 + 'ms');
    console.log('complete.');
}

function tick() {
    crash = increment_carts();
    //counter++;
    return true;
}

function increment_carts() {
    // Order of movement
    var input       = board.slice(0),
        cart_turn2  = {},
        complete = [];

    for(let ty = 0; ty < y; ty++) {
        for(let tx = 0; tx < x; tx++) {

            if(board[ty][tx] != '<' && board[ty][tx] != 'v' && board[ty][tx] != '^' && board[ty][tx] != '>') {
                input[ty][tx] = track[ty][tx];
            } else {
                let px = tx, 
                    py = ty;

                if (complete.includes(1000 * ty + tx)) continue;

                // Get next position
                switch(board[ty][tx]) {
                    case '<': px = tx-1; break;
                    case '>': px = tx+1; break;
                    case 'v': py = ty+1; break;
                    case '^': py = ty-1; break;
                }

                complete.push(py * 1000 + px);
                cart_turn2[1000 * py + px] = (cart_turn[1000 * ty + tx] || 0);

                if(board[py][px] == '\\') {
                    if(board[ty][tx] == '<')        input[py][px] = '^';
                    else if( board[ty][tx] == 'v')  input[py][px] = '>';
                    else if( board[ty][tx] == '>')  input[py][px] = 'v';
                    else if( board[ty][tx] == '^')  input[py][px] = '<';
                    input[ty][tx] = track[ty][tx];
                } else if (board[py][px] == '/') {
                    if(board[ty][tx] == '<')        input[py][px] = 'v';
                    else if( board[ty][tx] == 'v')  input[py][px] = '<';
                    else if( board[ty][tx] == '>')  input[py][px] = '^';
                    else if( board[ty][tx] == '^')  input[py][px] = '>';
                    input[ty][tx] = track[ty][tx];
                } else if (board[py][px] == '+') {
                    // How many times he needs to turn right
                    let s = (cart_turn[1000 * ty + tx] || 0) % 3 + 3; // number of times to turn right
                    let ch = board[ty][tx];

                    for (let idx = 0; idx < s; idx++) {
                        if (ch == 'v') ch = '<';
                        else if (ch == '^') ch = '>';
                        else if (ch == '<') ch = '^';
                        else if (ch == '>') ch = 'v';  
                    }

                    input[py][px] = ch;
                    input[ty][tx] = track[ty][tx];                        

                    cart_turn2[1000 * py + px] = (cart_turn[1000 * ty + tx] || 0) + 1;
                    
                } else if (board[py][px] == '-') {
                    input[py][px] = board[ty][tx];
                    input[ty][tx] = track[ty][tx];
                } else if (board[py][px] == '|') {
                    input[py][px] = board[ty][tx];
                    input[ty][tx] = track[ty][tx];
                } else if (board[py][px] == '<' || board[py][px] == '>' || board[py][px] == '^' || board[py][px] == 'v') {
                    carts -= 2;
                    input[py][px] = track[py][px];
                    input[ty][tx] = track[ty][tx];

                    // Signal part 1
                    if(flag_crash) {
                        flag_crash = false;
                        $("#first_result").append(px + ',' + py);
                    }

                    // Signal to let one last tick before marking the last spot
                    if(carts == 1) final_flag = true;
                }
            }
        }
    }

    if (carts == 1 && final_flag) {
        for (let ty = 0; ty < y; ty++) {
            for (let tx = 0; tx < x; tx++) {

                let ch = board[ty][tx];
                if (ch != 'v' && ch != '^' && ch != '<' && ch != '>') continue;
                    $("#second_result").append(tx + ',' + ty);
                return;
            }
        }
    }

    board       = input;
    cart_turn   = cart_turn2;

    return flag_crash;
}

function visualize() {
    var html = '<code>';

    for(let ty = 0; ty < y; ty++) {
        html += '<p>';
        for(let tx = 0; tx < x; tx++) {
            html+= input[ty][tx];
        }
        html += '</p>'
    }

    html += '</code>';
    $("#draw").empty();
    $("#draw").append(html);
}