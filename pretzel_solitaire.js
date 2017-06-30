var lastClicked;
var lastClickedVal = '';
var suits = ["spades", "hearts", "diamonds", "clubs"];
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "blank"];
var deck = cards.map(function (e, i) {
    return [[suits[0], e], [suits[1], e], [suits[2], e], [suits[3], e]];
});
deck = [].concat.apply([], deck);
deck = shuffleDeck(deck);
var grid = clickableGrid(4,14,function(el,row,col,i,val){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    el.className='clicked';
    if (lastClicked) 
  	{
  		if(val == 'blank')
  		{
  			el.innerHTML = lastClicked.innerHTML;
  			lastClicked.innerHTML = "";
  			lastClickedVal = '';
  		}
  		lastClicked.className='';
  		console.log("Value of last: ", lastClickedVal);
  	}
  	lastClickedVal = val;
    lastClicked = el;
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
            var val = 'test';
            if(c != 0)
            {
            	if(deck[r*(cols-1) + c-1][1] != "blank")
            	{
            		cell.innerHTML = '<img src="SVG-cards-1.3/' + deck[r*(cols-1) + c-1][1] + '_of_' + deck[r*(cols-1) + c-1][0] + '.svg" class="card"></img>';
            		val = deck[r*(cols-1) + c-1][1];
            	}
            	else
            		val = "blank";
            }
            else
            {
            	cell.innerHTML = '<img src="SVG-cards-1.3/ace_of_' + suits[r] + '.svg" class="card"></img>';
            	val = "ace";
            }
            cell.addEventListener('click',(function(el,r,c,i,val){
                return function(){
                    callback(el,r,c,i,val);
                }
            })(cell,r,c,i,val),false);
        }
    }
    return grid;
}