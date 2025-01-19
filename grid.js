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

        if(this.render_grid)
            this.renderGrid();

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

    renderGrid() //DEBUG TO RENDER GRID BORDERS
    {
        for(var row = 0; row < this.num_rows; ++row)
            for(var col = 0; col < this.num_cols; ++col)
            {
                const x = col * this.cell_size;
                const y = row * this.cell_size;

                this.ctx.strokeStyle= "white";
                this.ctx.strokeRect(x, y, this.cell_size, this.cell_size);
            }
    }

    handleClick(clientX,clientY) 
    {
        //Coordinates relative to the canvas
        const rect = this.ctx.canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        //Get clicked cell
        const col = Math.floor(x / this.cell_size);
        const row = Math.floor(y / this.cell_size);
        const index = row * this.num_cols + col;
        console.log(`Cell clicked: ${index}`);
    }
}

class Cell{
    constructor(cell_size, ctx)
    {
        this.cell_size = cell_size;
        this.ctx = ctx;
    }

    render()
    {
        //ADD CODE TO RENDER CELL
    }

    update()
    {
        //ADD CODE TO UPDATE CELL
    }
}