//Fix the fourth card to fifth card. it is affecting the war

$(document).ready(function () {

    var shuffleDeck = function (array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    var convert_value_to_string = function (value) {
        if (value > 10) {
            switch (value) {
            case 11:
                return 'Jack';
                break;
            case 12:
                return 'Queen';
                break;
            case 13:
                return 'King';
                break;
            case 14:
                return 'Ace';
                break
            }
        }
        return value.toString();
    }

    var deck = [];
    var newDeck = function (deck) {
        var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        for (var i = 0; i < suits.length; i++) {
            var suit = suits[i];
            for (var j = 1; j < 14; j++) {
                deck.push({
                    number: j + 1,
                    suit: suit,
                    cardImage: -3536 + (i * 884) + (68 * j)
                })
            }
        }
    };
    newDeck(deck);

    var shuffle = function (array) {
        var copy = [];
        var n = array.length;
        var i;
        while (n) {
            i = Math.floor(Math.random() * array.length);
            if (i in array) {
                copy.push(array[i]);
                delete array[i];
                n--;
            }
        }
        return copy;
    }

    function deal(array) {
        var n = array.length;
        while (n > 0) {
            oppDeck.push(array.shift());
            myDeck.push(array.shift());
            n--;
            n--;
        }
    };

    var oppDeck = [];
    var myDeck = [];
    deck = shuffle(deck);
    deal(deck);

    var war = function (card1, card2) {
        if (card1 > card2) {
            return "player1"
        } else if (card1 < card2) {
            return "player2"
        } else {
            return false
        }
    };

    var advance = function () {

        if (oppDeck.length || myDeck.length === 0) {
            if (oppDeck.length === 0) {
                myWins("Ran out of Cards");
            } else {
                oppWins("Ran out of Cards");
            }

        } else {
            $("#opp-card-count").html(oppDeck.length);
            $("#my-card-count").html(myDeck.length);
            $('.potCard').css('visibility', 'hidden');
            $('.potCard').css('background-position', '-3536');
        };

        for (var i = 1; i <= 3; i++) {
            oppCard = oppDeck[i - 1];
            myCard = myDeck[i - 1];
            $('.my-card' + i).css('background-position', myCard.cardImage);
        }
    };


    var warSetup = function (a, b) {
        setTimeout(function () {
            $('.my-card' + a).css('left', '300');
            $('.opp-card' + b).css('left', '300');
        }, 500);


        setTimeout(function () {
            warTime(4, 4, 250)
        }, 1000);
    };

    var warTime = function (f, g, h) {
        var oppCard = oppDeck[f + 2];
        var myCard = myDeck[g + 2];
        if (war(oppCard.number, myCard.number) === "player1") {
            oppDeck.concat(oppDeck.splice(3, 6));
            oppDeck.concat(myDeck.splice(3, 6));
            oppDeck.push(oppDeck.shift());
            oppDeck.push(myDeck.shift());
            shuffleDeck(oppDeck);
        } else if (war(oppCard.number, myCard.number) === "player2") {
            myDeck.concat(oppDeck.splice(3, 6));
            myDeck.concat(myDeck.splice(3, 6));
            myDeck.push(oppDeck.shift());
            myDeck.push(myDeck.shift());
            shuffleDeck(myDeck);
        }
        $('.potCard').css('visibility', 'visible');
        var delay = h + 250;
        setTimeout(function () {
            $('.oppCard' + f).css('background-position', oppCard.cardImage);
            $('.myCard' + g).css('background-position', myCard.cardImage);

        }, delay);
        if (f === 1 || g === 1) {
            oppDeck = oppDeck.concat(oppDeck.splice(0, 6));
            myDeck = myDeck.concat(myDeck.splice(0, 6));
        } else if (war(oppCard.number, myCard.number) === "player1") {
            //Refactor for a card loop to show the correct amount of cards
            oppDeck = oppDeck.concat(oppDeck.splice(0, 6));
            oppDeck = oppDeck.concat(myDeck.splice(0, 6));
        } else
        if (war(oppCard.number, myCard.number) === "player2") {
            myDeck = myDeck.concat(oppDeck.splice(0, 6));
            myDeck = myDeck.concat(myDeck.splice(0, 6));
        } else {
            warTime(f - 1, g - 1, delay)
        }
    };


    var oppWins = function () {

    };

    var myWins = function () {

    };
    //compare the cards
    //give the winner both cards (at end of deck)
    var play = function (card) {
        var oppCard = oppDeck[0];
        var myCard = myDeck[card];
        var c1 = oppDeck.length;
        var c2 = myDeck.length;
        var card1 = card;
        var card2 = Math.floor((Math.random() * 3) + 1);
        $('.my-card' + card1).css('left', '113px').css('bottom', '0px');
        $('.opp-card' + card2).css('left', '113px').css('top', '0px');
        if (war(oppCard.number, myCard.number) === "player1") {
            oppDeck.push(oppDeck.shift());
            oppDeck.push(myDeck.shift());
            shuffleDeck(oppDeck);
        } else if (war(oppCard.number, myCard.number) === "player2") {
            myDeck.push(oppDeck.shift());
            myDeck.push(myDeck.shift());
            shuffleDeck(myDeck);
        } else {
            if (c1 >= 6 && c2 >= 6) {
                warSetup(card1, card2)
            } else if (c1 < c2) {
                oppWins("Ran out of Cards");
            } else {
                myWins("Ran out of Cards");
            }
        }
    };



    //this function (defined below) will continue to the next turn
    $(".my-card-container").click(function () {
        var i = this.id;
        play(i);
         setTimeout(function () {
            advance();
         }, 3000);

    });

    $(".btn2").click(function () {

        $('.opp-card-container').css('background-position', '-3536');
        $('.my-card-container').css('background-position', '-3536');
        // oppDeck = [];
        //myDeck = [];
        //deck = [];
        //newDeck(deck);
        //deck = shuffle(deck);
        //deal(deck);
        $("#opp-card-count").html(oppDeck.length);
        $("#my-card-count").html(myDeck.length);
        for (var i = 0; i <= 3; i++) {
            myCard = myDeck[i];
            $('.my-card' + i).css('background-position', myCard.cardImage);
        }
    });

    //test section

    oppDeck = [{
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 4,
        suit: "hearts",
        cardImage: -2636
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536

}];
    myDeck = [{
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
}, {
        number: 3,
        suit: "hearts",
        cardImage: -3536
}];


});