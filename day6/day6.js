$(document).ready(function(){
    let result          = day6();
});

function day6() {
    var input       = new XMLHttpRequest();
    var file_path   = 'input.txt';

    input.open("GET", file_path, false);
    input.onreadystatechange = function () {
        if(input.readyState === 4) {
            if(input.status === 200 || input.status == 0) {
                let allText         = input.responseText.replace('\n', '').replace('\r', ''),
            }
        }
    }
    input.send(null);
}

