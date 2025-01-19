var TOOLS = {
    ELEMENTS_COLORS:
    {
        SAND_COLOR: "#C2B280"
    },

    CELL_STATES:
    {
        EMPTY: "EMPTY",
        SAND: "SAND"
    },

    varyColor: function(color)
    {
        // Convert HEX 2 RGB
        const rgb = this.hex2rgb(color);
    
        // Convert RGB 2 HSL
        const hsl = this.rgb2hsl(rgb.r, rgb.g, rgb.b);
    
        // Add random variation to the HSL values
        hsl.h += Math.floor(Math.random() * 10 - 5); // Vary hue by ±5
        hsl.s += Math.floor(Math.random() * 10 - 5); // Vary saturation by ±5%
        hsl.l += Math.floor(Math.random() * 10 - 5); // Vary lightness by ±5%
    
        // Clamp values to valid HSL ranges
        hsl.h = (hsl.h + 360) % 360; // Ensure hue is in [0, 360]
        hsl.s = Math.min(100, Math.max(0, hsl.s)); // Ensure saturation is in [0, 100]
        hsl.l = Math.min(100, Math.max(0, hsl.l)); // Ensure lightness is in [0, 100]
    
        // Convert back to HEX
        return this.hsl2hex(hsl.h, hsl.s, hsl.l);    
    },
    
    hex2rgb: function(hex) {
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }
        const bigint = parseInt(hex, 16);
        return { 
            r: (bigint >> 16) & 255, 
            g: (bigint >> 8) & 255, 
            b: bigint & 255 
        };
    },
    
    rgb2hsl: function(r, g, b)
    {
        r /= 255;
        g /= 255;
        b /= 255;
    
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max === min) {
            h = s = 0; // Achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }
    
        return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    },
    
    hsl2hex: function(h, s, l)
    {
        s /= 100;
        l /= 100;
    
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
    
        let r = 0, g = 0, b = 0;
    
        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
    
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
    
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
}