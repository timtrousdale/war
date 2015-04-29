//Fix the fourth card to fifth card. it is affecting the war

$(document).ready(function() {
	//what does this do?
	//this takes the a number, 1-13 only, and coverts it from a value into a string so it can be displayed
	//if the value is above 13 what would happen?
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

	//NEED TO FIX IMAGE SO THAT THE CARDS DON'T SHIFT
	//what does this do?
	//this is a loop within a a loop that will add one of each number (1-13)
	// to the deck array as an object with a number value and suit string
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

	//what does this do?
	//I assume that if you just put a variable as the controller of the while loop, it will stop when it reaches 0
	// but I'm not sure
	//I get it, so this takes in an array (our being 52 entries) that lowers the array length by one by deleting out the
	// array item it adds to the new temp array. It takes the array length, multiplies it by a random number between
	// 0 and 1 and then rounds down to the nearest integer. That integer is used to take a card from the old arranged
	// arrange array and put it into a new order
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

	// write a function called deal that will evenly divide the deck up between the two players
	//done
	function deal(array) {
		var n = array.length;
		while (n > 0) {
			cards_player_1.push(array.shift());
			cards_player_2.push(array.shift());
			n--;
			n--;
		}
	};

	//Now call the shuffle function and save the result of what shuffle returns into your deck variable
	//Done
	var cards_player_1 = [];
	var cards_player_2 = [];
	deck = shuffle(deck);
	deal(deck);

	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
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

	//create a play function
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

	//TEST SECTION!!!!!!
	//cards_player_1 = [{number: 2, suit: 'diamond', cardImage: (-3536 + 68)}, {number: 3, suit: 'diamond', cardImage: -3536 + 136}, {number: 4, suit: 'diamond', cardImage: -3536+204},{number: 5, suit: 'diamond', cardImage: -3536+272},{number: 6, suit: 'diamond', cardImage: -3536+340},{number: 7, suit: 'diamond', cardImage: -3536+408}];
	//cards_player_2 = [{number: 2, suit: 'diamond', cardImage: (-3536 + 68)}, {number: 3, suit: 'diamond', cardImage: -3536 + 136}, {number: 4, suit: 'diamond', cardImage: -3536+204},{number: 5, suit: 'diamond', cardImage: -3536+272},{number: 6, suit: 'diamond', cardImage: -3536+340},{number: 7, suit: 'diamond', cardImage: -3536+408}];

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




