class Grid {
    constructor(num_cells, cell_size)
    {
        this.num_cells_x = num_cells;
        this.num_cells_y = num_cells;
        this.num_cells = this.num_cells_x * this.num_cells_y;  //num_cells x * num_cells y
        this.cell_size = cell_size;
        this.cells = new Array(this.num_cells).fill(0);
    }

    initCells()
    {
        //Init cells
        for(var i = 0; i < this.num_cells_x; ++i)
            for(var j = 0; j < this.num_cells_y; ++j)
            {
                var index = TOOLS.IX(i, j, this.num_cells_x);
                this.cells[index] = new Cell(TOOLS.IX(i,j,this.num_cells_x), this.num_cells_x, this.cell_size, 0);
            }
    }

    render(ctx)
    {
        for(var i = 0; i < this.num_cells_x; ++i)
            for(var j = 0; j < this.num_cells_y; ++j)
            {
                var cell = this.cells[TOOLS.IX(i, j, this.num_cells_x)];
                cell.render(ctx);
            }   
    }

    // Clear the grid
    clear() 
    {
        this.cells = new Array(this.num_cells).fill(0);
    }
}


class Cell{
    constructor(array_pos, grid_width, cell_size, element)
    {
        this.array_pos = array_pos;
        this.grid_width = grid_width;
        this.cell_size = cell_size;
        this.element = element;
    }

    render(ctx)
    {
        var pos = TOOLS.inverseIX(this.array_pos, this.grid_width);
        ctx.strokeStyle = "white";
        this.element === 1 ? ctx.fillStyle = "#c2b280" : ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(pos.x * this.cell_size, pos.y * this.cell_size, this.cell_size, this.cell_size);
        ctx.fill();
        ctx.stroke();
    }
}