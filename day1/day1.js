$(document).ready(function(){
    let result = day1();
});


function day1() {
    var input = new XMLHttpRequest();
    input.open("GET", 'input.txt', false);
    input.onreadystatechange = function ()
    {
        if(input.readyState === 4)
        {
            if(input.status === 200 || input.status == 0)
            {
                var allText     = input.responseText;
                var array_nr    = allText.split("\n");
                var frequency   = 0;

                $.each(array_nr, function(index, value) {
                    frequency += (value? (value * 1) : 0);
                });
                console.log(frequency);
            }
        }
    }


    input.send(null);
}
