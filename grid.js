class Grid{
    constructor(num_cols, num_rows, cell_size, render_grid, ctx)
    {
        this.num_cols = num_cols;
        this.num_rows = num_rows;
        this.num_cells = num_cols * num_rows;
        this.cell_size = cell_size;
        this.cells = new Array(this.num_cells).fill(0);
        this.render_grid = render_grid;
        this.ctx = ctx;

        this.initCells();
    }

    render()
    {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for(var row = 0; row < this.num_rows; ++row)
            for(var col = 0; col < this.num_cols; ++col)
            {
                const x = col * this.cell_size;
                const y = row * this.cell_size;
                
                if(this.render_grid)
                    this.renderGrid(x,y);

                //Cell Index
                const idx = row * this.num_cols + col;
                this.cells[idx].render(x, y, ctx);
            }

    }

    update()
    {
        this.cells.forEach(cell => cell.update());
    }

    initCells()
    {
        for(var row = 0; row < this.num_rows; ++row)
            for(var col = 0; col < this.num_cols; ++col)
            {
                const idx = row * this.num_cols + col;
                this.cells[idx] = new Cell(this.cell_size);
            }
    }

    clearCells()
    {
        this.cells = new Array(this.num_cells).fill(0);
    }

    renderGrid(x,y) //DEBUG TO RENDER GRID BORDERS
    {
        this.ctx.strokeStyle= "white";
        this.ctx.strokeRect(x, y, this.cell_size, this.cell_size);
    }

    handleClick(clientX,clientY) 
    {
        //Coordinates relative to the canvas
        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        var spread_matrix = 3;
        var extent = Math.floor(spread_matrix/2);
        for(var i = -extent; i <= extent; ++i)
            for(var j = -extent; j <= extent; ++j)
            {
                const col = Math.floor(x / this.cell_size) + i;
                const row = Math.floor(y / this.cell_size) + j;
                const index = row * this.num_cols + col;
                
                if (col >= this.num_cols || col < 0 || row >= this.num_rows || row < 0) 
                    continue;

                //Add randomness
                const isSand = Math.random() < 0.5;
                if(!isSand)
                    continue;

                this.cells[index].state = TOOLS.CELL_STATES.SAND;
            }

    }
}

class Cell{
    constructor(cell_size)
    {
        this.cell_size = cell_size;
        this.state = TOOLS.CELL_STATES.EMPTY;
        this.color = undefined;
    }

    render(x, y, ctx)
    {
        if (this.state == TOOLS.CELL_STATES.EMPTY)
            return;

        if(this.state == TOOLS.CELL_STATES.SAND)
        {
            ctx.fillStyle = this.color;
            ctx.fillRect(x, y, this.cell_size, this.cell_size);
        }
    }

    update()
    {
        //ADD CODE TO UPDATE CELL
    }
}