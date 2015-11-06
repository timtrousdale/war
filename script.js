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
    };

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
    };

    var deck = [];
    var newDeck = function (deck) {
        var suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
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
    };

    function deal(array) {
        var n = array.length;
        while (n > 0) {
            oppDeck.push(array.shift());
            myDeck.push(array.shift());
            n--;
            n--;
        }
    }

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

    var advance = function (a) {

        //take the top two cards and display them
        if (oppDeck.length && myDeck.length) {
            console.log('now');
            var oppCard = oppDeck[0];
            var myCard = myDeck[a];
            var winner = war(oppCard.number, myCard.number);
            if (winner === 'player1') {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " of " + oppCard.suit + " Wins!");
                $("#my-card").html(convert_value_to_string(myCard.number) + " of " + myCard.suit);
            } else if (winner === 'player2') {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " of " + oppCard.suit);
                $("#my-card").html(convert_value_to_string(myCard.number) + " of " + myCard.suit + " Wins!");
            } else {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " of " + oppCard.suit + " WAR!!!!");
                $("#my-card").html(convert_value_to_string(myCard.number) + " of " + myCard.suit + " WAR!!!!");
            }
        }
    };
    var cardCount = function () {
        if (oppDeck.length === 0 || myDeck.length === 0) {
            if (oppDeck.length === 0) {
                myWins("Ran out of Cards");
            } else {
                oppWins("Ran out of Cards");
            }
        } else {
            $("#opp-card-count").html(oppDeck.length);
            $("#my-card-count").html(myDeck.length);
        }
    };


  /*  for (var i = 1; i <= 3; i++) {
        oppCard = oppDeck[i - 1];
        myCard = myDeck[i - 1];
        $('.my-card' + i).css('background-position', myCard.cardImage);
    }

    */

    var reset = function (a, b) {
        //do the reset to the deck and then the re-deal in jquery

    };

    var warSetup = function (a, b) {
        var c = a; //myCard
        var d = b; //oppCard
        setTimeout(function () {
            $('.my-card' + c).css('left', '300');
            $('.opp-card' + d).css('left', '300');
        }, 500);


        setTimeout(function () {
            warTime(4, 4, 250, c, d)
        }, 1000);
    };

    var warTime = function (f, g, h, i, j) {
        var r = i; //myCard
        var t = j; //oppCard
        var oppCard = oppDeck[f + 2];
        var myCard = myDeck[g + 2];
        var delay = h + 250;
        $('.potCard').css('visibility', 'visible');
        if (war(oppCard.number, myCard.number) === "player1") {
            setTimeout(function () {
                advance(i);
                $('.oppCard' + f).css('background-position', oppCard.cardImage);
                $('.myCard' + g).css('background-position', myCard.cardImage);
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " of " + oppCard.suit + " Wins!");
                $("#my-card").html(convert_value_to_string(myCard.number) + " of " + myCard.suit);
                oppDeck = oppDeck.concat(myDeck.splice(3, 4));
                oppDeck.concat(myDeck.splice(r, 1));
                shuffleDeck(oppDeck);
                shuffleDeck(myDeck);
                cardCount();

                //reset(i, j);
            }, delay);
        } else if (war(oppCard.number, myCard.number) === "player2") {
            advance(i);
            setTimeout(function () {
                advance(i);
                $('.oppCard' + f).css('background-position', oppCard.cardImage);
                $('.myCard' + g).css('background-position', myCard.cardImage);
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " of " + oppCard.suit);
                $("#my-card").html(convert_value_to_string(myCard.number) + " of " + myCard.suit + " Wins!");
                myDeck = myDeck.concat(oppDeck.splice(3, 4));
                oppDeck.push(oppDeck.shift());

                cardCount();
                //reset(i,j);
            }, delay);

        } else {
            setTimeout(function () {
                $('.oppCard' + f).css('background-position', oppCard.cardImage);
                $('.myCard' + g).css('background-position', myCard.cardImage);

            }, delay);
            if (f === 1 || g === 1) {
                shuffleDeck(myDeck);
                shuffleDeck(oppDeck);
            } else {
                warTime(f - 1, g - 1, delay, i, t)
            }
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
            oppDeck.concat(myDeck.splice(card, 1));
            shuffleDeck(myDeck);
            shuffleDeck(oppDeck);
            cardCount();
        } else if (war(oppCard.number, myCard.number) === "player2") {
            myDeck.push(oppDeck.shift());
            shuffleDeck(myDeck);
            shuffleDeck(oppDeck);
            cardCount();
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
        advance(i);
        play(i);
        //resetWar();

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
/*
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
        cardImage: -2536,
        n: 0
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 1
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 2
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 3
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 4
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
        ,
        n: 5
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 6
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536,
        n: 7
    }, {
        number: 3,
        suit: "hearts",
        cardImage: -2536
        ,
        n: 8
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
*/

});
