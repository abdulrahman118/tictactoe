var valueArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
],
    winningArray = [
        ['', ''],
        ['', ''],
        ['', '']
    ],
    currentValue = 'X',
    playMode = 'computer',
    nextMoveBy = 'user';

$(document).ready(function () {
    $('#play-mode').on('change', function (e) {
        playMode = e.target.value;
        resetGame();
    });

    $('td').on('click', function () {
        if (valueArray[this.id.split('-')[0]][this.id.split('-')[1]].length == 0) {
            valueArray[this.id.split('-')[0]][this.id.split('-')[1]] = currentValue;
            this.innerHTML = currentValue;
            validateMove();
        }
    })
})

function makeMove() {
    var x = Math.floor(Math.random() * 3);
    var y = Math.floor(Math.random() * 3);
    if (valueArray[x][y].length == 0) {
        valueArray[x][y] = currentValue;
        $(`#${x}-${y}`).html(currentValue);
        validateMove();
    }
    else
        makeMove();
}

function resetGame() {
    currentValue = 'X';
    $('p').html('Next Move X');
    valueArray = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    $("td").html('&nbsp;');
    nextMoveBy = 'user';
    winningArray = [
        ['', ''],
        ['', ''],
        ['', '']
    ];
}

function getResult() {    
    if ((valueArray[0][0] == currentValue && valueArray[0][1] == currentValue && valueArray[0][2] == currentValue) ||
        (valueArray[1][0] == currentValue && valueArray[1][1] == currentValue && valueArray[1][2] == currentValue) ||
        (valueArray[2][0] == currentValue && valueArray[2][1] == currentValue && valueArray[2][2] == currentValue) ||
        (valueArray[0][0] == currentValue && valueArray[1][1] == currentValue && valueArray[2][2] == currentValue) ||
        (valueArray[0][0] == currentValue && valueArray[1][0] == currentValue && valueArray[2][0] == currentValue) ||
        (valueArray[0][1] == currentValue && valueArray[1][1] == currentValue && valueArray[2][1] == currentValue) ||
        (valueArray[0][2] == currentValue && valueArray[1][2] == currentValue && valueArray[2][2] == currentValue) ||
        (valueArray[0][2] == currentValue && valueArray[1][1] == currentValue && valueArray[2][0] == currentValue)
    ) {

        if (valueArray[0][0] == currentValue && valueArray[0][1] == currentValue && valueArray[0][2] == currentValue) {
            winningArray[0] = ['0', '0'];
            winningArray[1] = ['0', '1'];
            winningArray[2] = ['0', '2'];
        }
        else if (valueArray[1][0] == currentValue && valueArray[1][1] == currentValue && valueArray[1][2] == currentValue) {
            winningArray[0] = ['1', '0'];
            winningArray[1] = ['1', '1'];
            winningArray[2] = ['1', '2'];
        }
        else if (valueArray[2][0] == currentValue && valueArray[2][1] == currentValue && valueArray[2][2] == currentValue) {
            winningArray[0] = ['2', '0'];
            winningArray[1] = ['2', '1'];
            winningArray[2] = ['2', '2'];
        }
        else if (valueArray[0][0] == currentValue && valueArray[1][1] == currentValue && valueArray[2][2] == currentValue) {
            winningArray[0] = ['0', '0'];
            winningArray[1] = ['1', '1'];
            winningArray[2] = ['2', '2'];
        }
        else if (valueArray[0][0] == currentValue && valueArray[1][0] == currentValue && valueArray[2][0] == currentValue) {
            winningArray[0] = ['0', '0'];
            winningArray[1] = ['1', '0'];
            winningArray[2] = ['2', '0'];
        }
        else if (valueArray[0][1] == currentValue && valueArray[1][1] == currentValue && valueArray[2][1] == currentValue) {
            winningArray[0] = ['0', '1'];
            winningArray[1] = ['1', '1'];
            winningArray[2] = ['2', '1'];
        }
        else if (valueArray[0][2] == currentValue && valueArray[1][2] == currentValue && valueArray[2][2] == currentValue) {
            winningArray[0] = ['0', '2'];
            winningArray[1] = ['1', '2'];
            winningArray[2] = ['2', '2'];
        }
        else if (valueArray[0][2] == currentValue && valueArray[1][1] == currentValue && valueArray[2][0] == currentValue) {
            winningArray[0] = ['0', '2'];
            winningArray[1] = ['1', '1'];
            winningArray[2] = ['2', '0'];
        }
        return "won";

    }
    else if (valueArray.filter(function (v) {
        var a = v.filter(function (value) { return value == "" });
        return a.length == 0;
    }).length == 3)
        return "draw";
    else
        return "continue";

}

function validateMove() {
    var result = getResult();
    // console.log(result);
    if (result == "won") {
        winningArray.forEach(function (valueArray) {
            $(`#${valueArray[0]}-${valueArray[1]}`).addClass('animated flash');
            $(`#${valueArray[0]}-${valueArray[1]}`).on('animationend', function () {
                $(`#${valueArray[0]}-${valueArray[1]}`).removeClass('animated flash');
            });
        })

        $('p').html(`Player ${currentValue} won!`);
        $(`.score-${currentValue}`).html(Number($(`.score-${currentValue}`).html()) + 1);
        setTimeout(function () {
            resetGame();
        }, 1500);

    }
    else if (result == "draw") {
        $('p').html("Match is Draw!");
        setTimeout(function () {
            resetGame();
        }, 1500);
    }
    else {

        $('p').html(`Next Move ${currentValue == 'X' ? 'Y' : 'X'}`);
        currentValue = currentValue == 'X' ? 'Y' : 'X';
        if (playMode === 'computer')
            nextMoveBy = nextMoveBy == 'user' ? 'computer' : 'user';
        if (nextMoveBy === 'computer')
            makeMove();
    }

}