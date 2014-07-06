$(document).ready(function() {

	//what does this do?
	function convert_value_to_string(value) {	
		switch (value) {
			case 1:
			return 'ace';
			case 11:
			return 'jack';
			break;
			case 12:
			return 'queen';
			break;
			case 13:
			return 'king';
			break;
		}	
		return value.toString();
	}
	function getFileName(card){
		var fileName = "./PNG-cards/" + convert_value_to_string(card.number) + "_of_" + card.suit + ".png";
		return fileName;
	}
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
		advance();
	}
	function advance() {
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			 $("#opp-card-count").html(cards_player_1.length);
			 $("#my-card-count").html(cards_player_2.length);
			$("#opp-card").html('<img src="' + getFileName(card_1) + '"/>');
			$("#my-card").html('<img src="' + getFileName(card_2) + '"/>');
			
		}
	}
	advance();
	var pending = [];
	$(".btn").click(function() {
		play();
	});
});