# The-game-of-life
[The Game of Life](https://www.youtube.com/watch?v=CgOcEZinQ2I) also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970

##Rules

Life is played on a two dimensional game board which is partitioned into cells. Cells may be occupied with counters. The default (Conway) rules are:

1. BIRTH. Each empty cell adjacent to exactly 3 neighbors will have a birth in the next generation. Otherwise, the cell remains empty.
2. DEATH. Each occupied cell with exactly 0 or 1 neighbors dies of isolation and loneliness. Each occupied cell with 4 or more neighbors dies of overpopulation.
3. SURVIVAL. Each occupied cell with exactly 2 or 3 neighbors survives to the next generation.

All births and deaths occur simultaneously. Applying all rules to an entire board creates a new generation. Ultimately, the society dies out, reaches some steady state (constant or oscillating).

The ideal game board is infinite. For this program, we wrap around at the boundaries of the board, the left edge to the right edge and the top edge to the bottom edge, we play on a torus. 

Currently, the game board is set to to a fixed size of 30 x 50 cells. This value is adjustable.

Code design: 
* As always I took a piece of paper, and draw how IT should look. 
* Then wrote down what app should do, like "outputs cells 30x50", "a cell is clickable", "compute next generation" etc. 
* Next broke down the app in components and functions. And made connections between.
* Last step was make out a sequence of actions:

1. Make 2-dimensional array
2. Output the array on the screen
3. Make cells clickable
4. Randomize the grid
5. Clear the grid (button)
6. Calculate the next generation (count neighbors and make torus)
7. Figure out a life cycle for computation of next generation 
8. Play/Pause

***
That's it. All that's left to do is build a static version in React and implement all step above to provide logic


