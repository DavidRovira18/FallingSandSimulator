class Grid {
    constructor(num_cells, cell_size, num_bombs)
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
                this.cells[index] = new Cell(TOOLS.IX(i,j,this.num_cells_x), this.num_cells_x, this.cell_size, false, false, false, 0);
            }
    }

    render(ctx)
    {
        for(var i = 0; i < this.num_cells_x; ++i)
            for(var j = 0; j < this.num_cells_y; ++j)
            {
                var cell = this.cells[TOOLS.IX(i, j, this.num_cells_x)];
                //DO SOMETHING
            }   
    }

    // Clear the grid
    clear() 
    {
        this.cells = new Array(this.num_cells).fill(0);
    }
}


class Cell{
    constructor(array_pos, grid_width, cell_size)
    {
        this.array_pos = array_pos;
        this.grid_width = grid_width;
        this.cell_size = cell_size;
    }

    render(ctx)
    {
        var pos = TOOLS.inverseIX(this.array_pos, this.grid_width);
        ctx.strokeStyle = "#545454";
        ctx.beginPath();
        ctx.rect(pos.x * this.cell_size, pos.y * this.cell_size, this.cell_size, this.cell_size);
        ctx.stroke();
    }
}