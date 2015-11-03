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

        //take the top two cards and display them
        if (oppDeck.length && myDeck.length) {
            var oppCard = oppDeck[0];
            var myCard = myDeck[0];
            var winner = war(oppCard.number, myCard.number);
            if (winner === 'player1') {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " " + oppCard.suit + " Wins!");
                $("#my-card").html(convert_value_to_string(myCard.number) + " " + myCard.suit);
            } else if (winner === 'player2') {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " " + oppCard.suit);
                $("#my-card").html(convert_value_to_string(myCard.number) + " " + myCard.suit + " Wins!");
            } else {
                $("#opp-card").html(convert_value_to_string(oppCard.number) + " " + oppCard.suit + " WAR!!!!");
                $("#my-card").html(convert_value_to_string(myCard.number) + " " + myCard.suit + " WAR!!!!");
            }
            $("#opp-card-count").html(oppDeck.length);
            $("#my-card-count").html(myDeck.length);
            for (var i = 1; i <= 3; i++) {
                oppCard = oppDeck[i - 1];
                myCard = myDeck[i - 1];
                $('.my-card' + i).animate().css('background-position', myCard.cardImage);
            }
        }
    };
    var warTime = function (f, g) {
        var oppCard = oppDeck[f];
        var myCard = myDeck[g];
        $('.myCard').css('visibility', 'hidden');
        $('.oppCard').css('visibility', 'hidden');
        $('.potCard').css('visibility', 'visible');
        $('.oppCard' + (f)).css('background-position', oppCard.cardImage);
        $('.myCard' + (g)).css('background-position', myCard.cardImage);
        if (f === 1 || g === 1) {
            oppDeck = oppDeck.concat(oppDeck.splice(0, 3));
            myDeck = myDeck.concat(myDeck.splice(0, 3));
        } else if (war(oppCard.number, myCard.number) === "player1") {
            //Refactor for a card loop to show the correct amount of cards
            oppDeck = oppDeck.concat(oppDeck.splice(0, 3));
            oppDeck = oppDeck.concat(myDeck.splice(0, 3));
        } else if (war(oppCard.number, myCard.number) === "player2") {
            myDeck = myDeck.concat(oppDeck.splice(0, 3));
            myDeck = myDeck.concat(myDeck.splice(0, 3));
        } else {
            setTimeout(warTime(f - 1, g - 1), 500);
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
        if (war(oppCard.number, myCard.number) === "player1") {
            oppDeck.push(oppDeck.shift());
            oppDeck.push(myDeck.shift());
            shuffleDeck(oppDeck);
        } else if (war(oppCard.number, myCard.number) === "player2") {
            myDeck.push(oppDeck.shift());
            myDeck.push(myDeck.shift());
            shuffleDeck(myDeck);
        } else {
            var c = c1 >= 4 && c2 >= 4 ? warTime(3, 3) : c1 < c2 ? oppWins("Ran out of Cards") : myWins("Ran out of Cards");
        }
    };

    var resetWar = function () {
        $('.potCard').css('visibility', 'hidden');
        $('.potCard').css('background-position', '-3536');
    };


    //this function (defined below) will continue to the next turn
    $(".my-card-container").click(function () {
        var i = this.id;
        play(i);
        advance();
        resetWar();
    });
    $(".btn2").click(function () {

        resetWar();
        $('.opp-card-container').css('background-position', '-3536');
        $('.my-card-container').css('background-position', '-3536');
        oppDeck = [];
        myDeck = [];
        deck = [];
        newDeck(deck);
        deal(deck);
        $("#opp-card-count").html(oppDeck.length);
        $("#my-card-count").html(myDeck.length);
    });


});