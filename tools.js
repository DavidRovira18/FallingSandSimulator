var TOOLS = {
    IX: function(x, y, N) //Get the 2D location on a 1D array
    {
        return x + y * N;
    },

    inverseIX: function(IX, width) //Recover the 2D location from the 1D array
    {
        var x = IX % width;
        var y = Math.floor(IX / width);
        return{x, y};
    }
}