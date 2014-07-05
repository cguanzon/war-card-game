$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {
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
			}
		}
		return value.toString();
	}

	//what does this do?
	//Caleb: This creates a deck in order, starting from
	//1 of hearts to king of clubs
	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	}
	
	//shuffle the deck
	deck = _.shuffle(deck);
	
	
	var cards_player_1 = [];
	var cards_player_2 = [];
	//divide out the cards into the two arrays
	
	cards_player_1 = (deck.splice(0,26));
	//deck will be left with only 26 cards at this point
	cards_player_2 = (deck);
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and returns a winner. A tie should return false.
	function war(card1, card2) {
		if(card1.number > card2.number){
			return card1;
		//else if to give room for tie breakers
		}else if(card2.number > card1.number){
			return card2;
		}else{
			return false;
		}
	}

	function unload(array){
		while(pending.length > 0){
			var pushMe = pending.pop();
			array.push(pushMe);
			
		}
		logPending();

	}

	function logPending(){
		var message = "";
		for (var j in pending){
			message += " --> " + pending[j].number + " of " + pending[j].suit;
		}
		console.log(message);
	}

	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)
	function play() {
		var card_1 = cards_player_1[0];
		var card_2 = cards_player_2[0];
		pending.push(card_1, card_2);
		logPending();
		cards_player_2 = _.without(cards_player_2,card_2);
		cards_player_1 = _.without(cards_player_1,card_1);
		var l = pending.length-1;
		var result = war(pending[l-1],pending[l]);
		if(result === pending[l-1] ){
			unload(cards_player_1);
		}else if(result === pending[l]){
			unload(cards_player_2);
		}else{
			advance();
			play();
		}

		//this function (defined below) will continue to the next turn
		advance();

	}
	


	function advance() {
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	}
	advance();
	var pending = [];
	
	$(".btn").click(function() {
		play();
	});
});