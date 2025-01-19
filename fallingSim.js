const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");

const num_cells = 10;
const cell_size = 32;
canvas.width = num_cells * cell_size;
canvas.height = num_cells * cell_size;

const testGrid = new Grid(num_cells,num_cells,cell_size, true, ctx);

testGrid.render();

canvas.addEventListener("click", (event) => {
    testGrid.handleClick(event.clientX, event.clientY);
});
