const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");

const num_cells = 10;
const cell_size = 30;
canvas.width = num_cells * cell_size;
canvas.height = num_cells * cell_size;

//init grid
grid = new Grid(num_cells, cell_size);
grid.initCells();

//DEFINE ELEMENTS
const elements = {
    NOTHING: 0,
    SAND: 1
}

//User Interaction
canvas.addEventListener("click", onClick);

function sim()
{
    draw(ctx);
    grid.update();
    requestAnimationFrame(sim);
}

function draw(ctx)
{
    ctx.strokeStyle = "#545454";
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.stroke();

    grid.render(ctx);
}


function onClick(event)
{
    var cell_x = Math.floor(event.clientX  / cell_size);
    var cell_y = Math.floor(event.clientY  / cell_size);
    
    var index = TOOLS.IX(cell_x, cell_y, num_cells);
    
    var cell = grid.cells[index];
    cell.element = elements.SAND;
}

sim();
