# Pretzel Solitaire
A Javascript implementation of pretzel solitaire as described in N. G. de Bruijn's 1981 paper included in the book _The Mathematical Gardener_.

Try it at https://andmcadams.github.io/pretzelSolitaire/.

Pretzel solitaire is similar to the Montana style Patience game Gaps. Generally, Gaps allows you to play any suit in any row and allows one or more redeals when a dead state is encountered. Pretzel solitaire, as described by de Bruijn, has a set order of suits. While redealing is not necessarily against the rules, in the interest of deciding if a configuration is solvable, redealing is ignored.

# Rules
In this implementation, only solvable boards are generated.

Although any _kxn_ "pretzel" can be used, a 4x13 pretzel (4 suits with 13 cards each) is used here. In order to make the board, the deck is shuffled, then laid out in a 4x13 grid. The aces are then removed and placed in a set order in another column to the left of the grid (resulting in a 4x(13+1) size board). For the case of 4 suits, the order is given as (from top to bottom) Spades, Hearts, Diamonds, Clubs. This leaves gaps where the aces were originally placed (hence the general name Gaps). A move consists of filling one of these gaps with another card on the board. In order to win, the player must line up each row of cards in order of increasing rank (from left to right) so that each row contains only cards of a single suit and a gap at the rightmost position.

### Legal Moves
Moving a card in to a gap is legal if and only if the card to the left of the gap is:
1. The same suit as the card being moved
2. Exactly one rank less than the card being moved

Since aces start off in the leftmost column, and no cards have a lower rank than aces, aces cannot be moved legally.

Since holes have no rank or suit, no card can be moved to a hole with another hole to its immediate left.

Since kings (in the 4x13 pretzel) have the highest rank, no hole to the immediate right of a king can be filled.

When there are no legal moves remaining, the board is considered "dead". In Gaps, cards that are not 'in place' can be removed and reshuffled, but in this implementation of pretzel solitaire, no reshuffling is allowed.


# Resources

Pretzel Solitaire as a Pastime for the Lonely Mathematician (1981)

Thanks to Byron Knoll, who created the SVG playing cards used. These cards are in the public domain.
More information about the SVG cards used can be found here: http://byronknoll.blogspot.fr/2011/03/vector-playing-cards.html
