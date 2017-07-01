var lastClicked;
var lastClickedVal = '';
var lastIndex;
var suits = ["spades", "hearts", "diamonds", "clubs"];
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "blank"];
var deck = suits.map(function (e) {
    return cards.map(function(el){
      return [e, el];
    });
});

var values = {
	"ace": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"10": 10,
	"jack": 11,
	"queen": 12,
	"king": 13
}

deck = [].concat.apply([], deck);
deck = shuffleDeck(deck);
gridRows = 4;
gridCols = 14;
var grid = clickableGrid(gridRows,gridCols,function(el,row,col){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on val:",el.getAttribute('value'));
    //if there is already something clicked
    	//if the thing clicked is blank
    		//switch the inner html, value, and index attributes
    		//set neither to clicked
    //if nothing is clicked
    	//highlight it and set it to lastClicked
    if (lastClicked && lastClicked.getAttribute('index') != el.getAttribute('index') 
    	&& el.getAttribute('value') != 'ace') 
  	{
  		if(el.getAttribute('value') == 'blank')
  		{
  			if (( col != 1 && values[deck[el.getAttribute('index') - 1][1]]+1 == values[deck[lastClicked.getAttribute('index')][1]]
  				&& deck[el.getAttribute('index') - 1][0] == deck[lastClicked.getAttribute('index')][0]) || ( col == 1 && 2 == values[deck[lastClicked.getAttribute('index')][1]]
  				&& suits[row] == deck[lastClicked.getAttribute('index')][0]))
  			{
	  			var tempIndex = el.getAttribute('index');

	  			el.innerHTML = lastClicked.innerHTML;
	  			el.setAttribute('value', lastClicked.getAttribute('value'));
	  			el.className='';

	  			var temp = deck[tempIndex];
	  			deck[tempIndex] = deck[lastClicked.getAttribute('index')];
	  			deck[lastClicked.getAttribute('index')] = temp;

	  			lastClicked.innerHTML = '';
	  			lastClicked.setAttribute('value', 'blank');
		  		lastClicked.className='';
		  		lastClicked = null;
	  		}
  		}
  		else if(el.getAttribute('value') != 'blank')
  		{
  			lastClicked.className = '';
  			el.className='clicked';
    		lastClicked = el;
  		}
  	}
  	else if(el.getAttribute('value') != 'blank' && el.getAttribute('value') != 'ace' && el.className != 'clicked')
  	{
  		el.className='clicked';
    	lastClicked = el;
  	}
  	else if(el.className == 'clicked')
  	{
  		el.className = '';
  		lastClicked = null;
  	}
});

document.body.appendChild(grid);

function shuffleDeck( d ){
	var j;
	for (var i = d.length-1; i >= 0; i--){
		j = Math.floor(Math.random()*d.length);
		temp = d[i];
		d[i] = d[j];
		d[j] = temp;
	}
	return d;
}


// Given a solved deck d, generate a list of eligible moves.
function initEligibleMovesList( d ){
  var list = List();
  for(var i = 0; i < d.length; i++)
  {
    //List.add(suit, value, index)
    if(d[i][1] != 'blank')
      list.add(d[i][0], d[i][1], i);
  }
  return list;
}

// Given a deck d, find the holes and return an array of their index positions.
function findHoles( d ){
  var holes[gridRows];
  var holeCount = 0;
  for(var i = 0; i < d.length; i++)
    if(d[i][1] == 'blank')
    {
      holes[holeCount] = i;
      holeCount++;
    }
  return holes;
}

// Given a solved deck d and difficulty, generate a solveable deck.

function makeSolveable( d, difficulty ){
  var eligibleMoves = initEligibleMovesList(d);
  var madeMoves = List();
  var moveCount = 0;
  var holes = findHoles(d);
  var randomCard, randomHole;
  var card, oldRightCard, newRightCard;
  while(moveCount < difficulty && eligibleMoves.length != 0)
  {
    // Get a random card and a random hole

    randomCard = Math.floor(Math.random()*eligibleMoves.length)
    randomHole = Math.floor(Math.random()*4);

    // Set all card variables
    card = eligibleMoves.get(card[randomCard])
    // Switch card and hole in the deck array

    // Remove the current card from the list of eligible moves

    // Check to see if the oldRightCard needs to be removed from the list of eligible moves

    // Check to see if the newRightCard is eligible

    // Increment moveCount

  }


  return d;
}

function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            console.log('Col:', deck);
						var val = document.createAttribute("value");       // Create a "class" attribute
						var ind = document.createAttribute("index");       // Create a "class" attribute
            if(c != 0)
            {
            	if(deck[r*(cols-1) + c-1][1] != "blank")
            	{
            		cell.innerHTML = '<img src="SVG-cards-1.3/' + deck[r*(cols-1) + c-1][1] + '_of_' + deck[r*(cols-1) + c-1][0] + '.svg" class="card"></img>';
            		val.value = deck[r*(cols-1) + c-1][1];
            	}
            	else
            		val.value = "blank";
            }
            else
            {
            	cell.innerHTML = '<img src="SVG-cards-1.3/ace_of_' + suits[r] + '.svg" class="card"></img>';
            	val.value = "ace";
            }
            ind.value = r*(cols-1) + c-1;
            cell.setAttributeNode(val);                          // Add the class attribute to <h1>
            cell.setAttributeNode(ind);                          // Add the class attribute to <h1>

            cell.addEventListener('click',(function(el,r,c){
                return function(){
                    callback(el,r,c);
                }
            })(cell,r,c),false);
        }
    }
    return grid;
}

function List(){
  List.createNode=function(){
    return {'suit': null, 'value': null, 'index': null, 'next': null, 'prev': null};
  }

  this.head = null;
  this.tail = null;
  this.length = 0;

  this.add = function(suit, value, index){
    var node = List.createNode();
    node.suit = suit;
    node.value = value;
    node.index = index;
    if(this.head == null)
    {
      this.head = node;
      this.tail = this.head;
    }
    else
    {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.length++;
  };

  this.remove = function(suit, value){
    var node = this.head;
    while(node != null)
    {
      if(node.suit == suit && node.value == value)
      {
        var prev = node.prev;
        var next = node.next;
        prev.next = next;
        if(next == null)
          this.tail = prev;
        else
          next.prev = prev;

        this.length--;
        node = null;
      }
    }
  };

  this.get = function(index){
    var node = this.head;
    while(node != null)
    {
      if(node.index == index)
        return node;
      node = node.next;
    }
    return null;
  };

  this.print = function(){
    var node = this.head;
    while(node != null)
    {
      console.log(node.value);
      node = node.next;
    }
  };
}