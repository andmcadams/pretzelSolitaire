var lastClicked;
var lastClickedVal = '';
var lastIndex;
var suits = ["spades", "hearts", "diamonds", "clubs"];
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "blank"];
var deck = cards.map(function (e, i) {
    return [[suits[0], e], [suits[1], e], [suits[2], e], [suits[3], e]];
});
deck = [].concat.apply([], deck);
deck = shuffleDeck(deck);
var grid = clickableGrid(4,14,function(el,row,col){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    //if there is already something clicked
    	//if the thing clicked is blank
    		//switch the inner html, value, and index attributes
    		//set neither to clicked
    //if nothing is clicked
    	//highlight it and set it to lastClicked
    if (lastClicked && lastClicked != el) 
  	{
  		if(el.getAttribute('value') == 'blank')
  		{
  			var tempIndex = el.getAttribute('index');

  			el.innerHTML = lastClicked.innerHTML;
  			el.setAttribute('value', lastClicked.getAttribute('value'));
  			el.setAttribute('index', lastClicked.getAttribute('index'));
  			el.className='';

  			var temp = deck[tempIndex];
  			deck[tempIndex] = deck[lastClicked.getAttribute('index')];
  			deck[lastClicked.getAttribute('index')] = temp;

  			lastClicked.innerHTML = "";
  			lastClicked.setAttribute('value', 'blank');
  			lastClicked.setAttribute('index', tempIndex);
	  		lastClicked.className='';
	  		lastClicked = null;
  		}
  	}
  	else if(el.getAttribute('value') != "blank" && el.className != 'clicked')
  	{
  		el.className='clicked';
    	lastClicked = el;
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