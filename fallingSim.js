const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");

const num_cells = 100;
const cell_size = 10;
canvas.width = num_cells * cell_size;
canvas.height = num_cells * cell_size;

var currentGrid = new Grid(num_cells, num_cells, cell_size, false, ctx);
var nextGrid = new Grid(num_cells, num_cells, cell_size, false, ctx);

function loop()
{
    currentGrid.render();
    fallingSand();
    currentGrid.cells.forEach(cell => {
        if(cell.state == TOOLS.CELL_STATES.SAND)
            console.log(cell.color)
    });
    requestAnimationFrame(loop);
}

//Start the sim loop
loop();

//Adding sand user input handling
var isDragging = false;

canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    currentGrid.handleClick(event.pageX, event.pageY);
});
canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        currentGrid.handleClick(event.pageX, event.pageY);
    }
});
canvas.addEventListener("mouseup", () => {
    isDragging = false;
});
canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});

function fallingSand() //CHECK THE STATE OF THE SURROUNDINGS AND MAKE SAND FALL
{
    for(var row = 0; row < currentGrid.num_rows; ++row)
        for(var col = 0; col < currentGrid.num_cols; ++col)
        {
            const idx = row * currentGrid.num_cols + col;
            const cell = currentGrid.cells[idx]; 

            if (cell.state == TOOLS.CELL_STATES.SAND)
            {
                if(row < currentGrid.num_rows - 1)
                {
                    const idx_below = idx + currentGrid.num_cols;
                    const cell_below = currentGrid.cells[idx_below];

                    if (cell_below.state == TOOLS.CELL_STATES.EMPTY)
                    {
                        nextGrid.cells[idx].state = TOOLS.CELL_STATES.EMPTY;
                        nextGrid.cells[idx_below].state = TOOLS.CELL_STATES.SAND;
                        continue;
                    }

                    const rand_dir = Math.random() < 0.5 ? -1 : 1;
                    if (col > 0 && rand_dir == -1)
                    { 
                        const idx_belowL = idx + currentGrid.num_cols - 1;
                        const cell_belowL = currentGrid.cells[idx_belowL];
                        if (cell_belowL.state == TOOLS.CELL_STATES.EMPTY) 
                        {
                            nextGrid.cells[idx].state = TOOLS.CELL_STATES.EMPTY;
                            nextGrid.cells[idx_belowL].state = TOOLS.CELL_STATES.SAND;
                            continue;
                        }
                    }

                    if (col < currentGrid.num_cols - 1 && rand_dir == 1)
                    { 
                        const idx_belowR = idx + currentGrid.num_cols + 1;
                        const cell_belowR = currentGrid.cells[idx_belowR];
                        if (cell_belowR.state == TOOLS.CELL_STATES.EMPTY) 
                        {
                            nextGrid.cells[idx].state = TOOLS.CELL_STATES.EMPTY;
                            nextGrid.cells[idx_belowR].state = TOOLS.CELL_STATES.SAND;
                            continue; // Move the sand to the bottom-right
                        }
                    }
                }
                nextGrid.cells[idx].state = TOOLS.CELL_STATES.SAND;
            }
        }

    currentGrid.cells = nextGrid.cells.map(cell => Object.assign(new Cell(cell.cell_size), cell));

    nextGrid.clearCells();
    nextGrid.initCells();
}