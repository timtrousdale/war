//Fix the fourth card to fifth card. it is affecting the war

$(document).ready(function() {
	
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
	var newDeck = function(deck) {
		var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
		for (var i = 0; i < suits.length; i++) {
			var suit = suits[i];
			for (var j = 1; j < 14; j++) {
				deck.push({
					number: j + 1, suit: suit, cardImage: -3536 + (i * 884) + (68 * j)
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
			cards_player_1.push(array.shift());
			cards_player_2.push(array.shift());
			n--;
			n--;
		}
	};

	var cards_player_1 = [];
	var cards_player_2 = [];
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
        
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			var winner = war(card_1.number, card_2.number);
			if (winner === 'player1') {
				$("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit + " Wins!");
				$("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit);
			} else if (winner === 'player2') {
				$("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit);
				$("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit + " Wins!");
			} else {
				$("#opp-card").html(convert_value_to_string(card_1.number) + " " + card_1.suit + " WAR!!!!");
				$("#my-card").html(convert_value_to_string(card_2.number) + " " + card_2.suit + " WAR!!!!");
			}
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card-count").html(cards_player_2.length);
			$('.opp-card-container').css('background-position', card_1.cardImage);
			$('.my-card-container').animate().css('background-position', card_2.cardImage);

		}
	};
	var war_time = function (i, e, f, g) {
		var card_1 = cards_player_1[f];
		var card_2 = cards_player_2[g];
		$('.potCard').css('visibility', 'visible');
		$('.oppCard' + (f)).css('background-position', card_1.cardImage);
		$('.myCard' + (g)).css('background-position', card_2.cardImage);
		if(f === 1 || g === 1){
			cards_player_1 = cards_player_1.concat(cards_player_1.splice(0, i));
			cards_player_2 = cards_player_2.concat(cards_player_2.splice(0, e));
		} else if (war(card_1.number, card_2.number) === "player1") {
			//Refactor for a card loop to show the correct amount of cards
			cards_player_1 = cards_player_1.concat(cards_player_1.splice(0, i));
			cards_player_1 = cards_player_1.concat(cards_player_2.splice(0, e));
		} else if (war(card_1.number, card_2.number) === "player2") {
			cards_player_2 = cards_player_2.concat(cards_player_1.splice(0, i));
			cards_player_2 = cards_player_2.concat(cards_player_2.splice(0, e));
		} else {
			war_time(i, e, f - 1, g - 1)
		}
	};

		//compare the cards
		//give the winner both cards (at end of deck)
	var play = function() {
		var card_1 = cards_player_1[0];
		var card_2 = cards_player_2[0];
		var c1 = cards_player_1.length;
		var c2 = cards_player_2.length;
		var c3 = 4;
		advance();
		if (war(card_1.number, card_2.number) === "player1") {
			cards_player_1.push(cards_player_1.shift());
			cards_player_1.push(cards_player_2.shift());
		} else if (war(card_1.number, card_2.number) === "player2") {
			cards_player_2.push(cards_player_1.shift());
			cards_player_2.push(cards_player_2.shift());
		} else {
			var c = c1 >= c3 && c2 >=c3 ? c3 : c1 < c2 && c1 < c3 ? c1 : c3;
			var d = c1 >= c3 && c2 >=c3 ? c3 : c2 < a1 && c2 < c3 ? c2 : c3;
			war_time(c, d, c, d);
		}
	};

	var resetWar = function(){
		$('.potCard').css('visibility', 'hidden');
		$('.potCard').css('background-position', '-3536');
	};

	
	//this function (defined below) will continue to the next turn
	$(".btn").click(function() {
		$('.potCard').css('visibility', 'visible');
		console.log(cards_player_1);
		console.log(cards_player_2);
		resetWar();
		play();
	});
	$(".btn2").click(function() {

		resetWar();
		$('.opp-card-container').css('background-position', '-3536');
		$('.my-card-container').css('background-position', '-3536');
		cards_player_1 = [];
		cards_player_2 = [];
		deck = [];
		newDeck(deck);
		deck = shuffle(deck);
		deal(deck);
		$("#opp-card-count").html(cards_player_1.length);
		$("#my-card-count").html(cards_player_2.length);
	});


});




