function Sprite(opt) {

    var self = {},
        index = 0,
        tickCount = 0,
        ticksPerFrame = opt.ticksPerFrame || 0,
        numFrames = opt.numFrames || 1;

    self.ctx = opt.ctx;
    self.width = opt.width;
    self.height = opt.height;
    self.image = opt.image;

    self.update = function() {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;

            // If the current frame index is in range
            if (index < numFrames - 1) {
                // Go to the next frame
                index += 1;
            } else {
                index = 0;
            }
        }
    };

    self.draw = function() {

        // Clear the canvas
        self.ctx.clearRect(0, 0, self.width, self.height);

        // Draw the animation
        self.ctx.drawImage(
            self.image,
            index * self.width / numFrames,
            0,
            self.width / numFrames,
            self.height,
            0,
            0,
            self.width / numFrames,
            self.height);
    };

    return self;
}
