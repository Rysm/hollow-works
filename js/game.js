// yew sir

Game = {

    // lets make it, ez
    createImage: function(url, opt) {
        opt = opt || {};
        var image = new Image();
        if (opt.onload)
            image.on('load', opt.onload);
        image.src = url;
        return image;
    },

    loadResources: function( images, sounds ) {
        images = images || [];
        sounds = sounds || [];
        var count = images.length + sounds.length;
        var resources = { images: {}, sounds: {} };
        if ( count != 0 ) {
            var done = false;
            var loaded = function () {
                if (!done)
                    done = true; // we only want it called once
            }

            var onload = function () {
                if (--count == 0)
                    loaded();
            };

            for (var n = 0; n < images.length; n++) {
                var image = images[n];
                image = is.string(image) ? { id: image, url: image } : image;
                resources.images[image.id] = Game.createImage(image.url, { onload: onload });
            }
            for(var n = 0 ; n < sounds.length ; n++) {
                var sound  = sounds[n];
                sound = is.string(sound) ? { id: sound, name: sound } : sound;
                // need somthin here for soundFX stuffs
                // I'll deal with this in a bit, just want image balls to work
            }
        }

    }
}
