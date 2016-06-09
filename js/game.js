
Game = {
    
    createImage: function (url, opt) {
        
        var image = new Image();
        
        
        image.src = url;
        return image;
    },

    createSprite: function (opt) {

        var self = {},
            index = 0,
            tickCount = 0,
            ticksPerFrame = opt.ticksPerFrame || 0,
            numFrames = opt.numFrames || 1;
    
        self.context = opt.context;
        self.width = opt.width;
        self.height = opt.height;
        self.image = opt.image;
    
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
                self.image,
                index * self.width / numFrames,
                0,
                self.width / numFrames,
                self.height,
                self.image.X,
                self.image.Y,
                self.image.width,
                self.image.height);
        };
    
        return self;
    }
};
