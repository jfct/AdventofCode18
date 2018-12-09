$(document).ready(function(){
    let result          = day9();
    // With linked list
    let result_2        = day9Part2();
});

var max             = 0,
    max_winner_idx  = 0;

function day9() {
    var input           = '465 players; last marble is worth 71498 points',
    //var input           = '10 players; last marble is worth 1618 points';
    //var input           = '9 players; last marble is worth 25 points';
        nr_players      = Number(input.split(';')[0].split(' ')[0]),
        total_marbles   = Number(input.split(';')[1].split(' ')[5]),
        cur_marble      = 0,
        idx             = 0,
        players         = new Array(),
        circle          = new Array();
        
    t0 = performance.now();

    circle.push(0);

    for(let marble = 1; marble <= total_marbles; marble++) {
        if(idx == 0 || idx > nr_players) idx = 1;

        let size = circle.length,
            remainder = marble % 23;

        // Multiple 23
        if(remainder == 0) {
            players = inc(players, idx, marble);
            
            if(cur_marble - 7 < 0) {
                let score = circle.splice(size + (cur_marble-7), 1);
                players = inc(players, idx, Number(score[0]));
                cur_marble = size + (cur_marble-7);
            } else {
                let score = circle.splice(cur_marble-7, 1);
                players = inc(players, idx, Number(score[0]));
                cur_marble = cur_marble-7;
            }
        } else {
            if(cur_marble+1 >= size && size != 1) {
                circle.splice(1, 0, marble);
                cur_marble = 1;
            } else {
                circle.splice(cur_marble+2, 0, marble);
                cur_marble = cur_marble+2;
            }
        }
        idx++;
    }
    
    t1 = performance.now();
    $("#first_result").text(max);
    $("#timer").text(t1-t0 + ' miliseconds');
}

function day9Part2() {
    var input           = '465 players; last marble is worth 71498 points',
        nr_players      = Number(input.split(';')[0].split(' ')[0]),
        total_marbles   = Number(input.split(';')[1].split(' ')[5]),
        players         = new Array(),
        
        
    t0 = performance.now();

    for (let idx = 1; idx <= nr_players; idx += 1) {
        players[idx] = 0;
    }
    let currentPlayer = 1;
    
    let current = {
        value: 0,
    };
    current.next = current;
    current.prev = current;
    
    for (let marble = 1; marble <= total_marbles * 100; marble += 1) {
        let remainder = marble % 23;

        if (remainder === 0) {
            players[currentPlayer] += marble;

            // Remove 7 marbles before
            for(let idx_r = 0 ; idx_r < 6; idx_r++) {
                current = current.prev;
            }
            players[currentPlayer] += current.prev.value;

            // "Remove" marble entry
            current.prev.prev.next = current;
            current.prev = current.prev.prev;
        } else {
            current = addEntry(marble, current.next);
        }
        // Loop through number of players
        currentPlayer = currentPlayer % nr_players + 1;
    }
    
    t1 = performance.now();
    $("#second_result").text(Math.max(...Object.values(players)));
    $("#timer_2").text(t1-t0 + ' miliseconds');
}

function inc(table, key, amt) {
    let idx = table.findIndex(v => v.id == key);

    // if there is no entry yet
    if(idx != -1) {
        table[idx].score += amt;
        if(max < table[idx].score) max = table[idx].score;
    } else {
        table.push({id: key, score: amt});
        if(max < amt) max = amt;
    }

    return table;
}

function addEntry(value, entry) {
    var new_entry = {value, prev: entry, next: entry.next};
    entry.next.prev    = new_entry;
    entry.next         = new_entry;
    return new_entry;
};

