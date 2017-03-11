# The-game-of-life
The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970

##Rules

Life is played on a two dimensional game board which is partitioned into cells. Cells may be occupied with counters. The default (Conway) rules are:

1. BIRTH. Each empty cell adjacent to exactly 3 neighbors will have a birth in the next generation. Otherwise, the cell remains empty.
2. DEATH. Each occupied cell with exactly 0 or 1 neighbors dies of isolation and loneliness. Each occupied cell with 4 or more neighbors dies of overpopulation.
3. SURVIVAL. Each occupied cell with exactly 2 or 3 neighbors survives to the next generation.

All births and deaths occur simultaneously. Applying all rules to an entire board creates a new generation. Ultimately, the society dies out, reaches some steady state (constant or oscillating).

The ideal game board is infinite. For this program, we wrap around at the boundaries of the board, the left edge to the right edge and the top edge to the bottom edge, we play on a torus. 

Currently, the game board is set to to a fixed size of 30 x 50 cells. This value is adjustable.


