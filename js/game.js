// Game
Game = {
    
    createImage: function (url, opt) {
        
        var image = {};

        image.pic    = new Image();
        image.width  = opt.width;
        image.height = opt.height;
        image.dx     = opt.dx;
        image.dy     = opt.dy;
        
        image.pic.src = url;
        return image;
    },

    createSprite: function (opt) {

        var self = {},
            index = 0,
            tickCount = 0,
            ticksPerFrame = opt.ticksPerFrame || 0,
            numFrames = opt.numFrames || 1;
    
        self.context = opt.context;
        self.width   = opt.width;
        self.height  = opt.height;
        self.image   = opt.image;
    
        self.update = function() {
    
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                
                tickCount = 0;
                if (index < numFrames - 1) 
                    index += 1;
                else 
                    index = 0;
            }
        };
        self.draw = function() {
            
            self.context.drawImage(
                self.image.pic,
                index * self.width / numFrames,
                0,
                self.width / numFrames,
                self.height,
                self.image.dx,
                self.image.dy,
                self.image.width,
                self.image.height);
        };
    
        return self;
    },
    
    createWeapon: function (opt) {
        
        var weapon = {};
        
        weapon.owner = opt.owner;
        weapon.type  = opt.type;
        
        return weapon;
    }
};

// Tools
Tools = {

    search: function (id, arr) {
        for (var i=0; i < arr.length; i++) 
            if (arr[i].id === id) 
                return i;
    }
};