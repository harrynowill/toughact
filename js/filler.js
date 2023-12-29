window.onload = function () {
    var posts = document.getElementsByClassName('content');
    var previousBackground = '';
    var previousBackgroundImage = '';

    for (var i = 0; i < posts.length; i++) {
        var post = posts[i];
        var backgroundColor = window.getComputedStyle(post).backgroundColor;
        var backgroundImage = window.getComputedStyle(post).backgroundImage;

        console.log(`color: ${backgroundColor}, image: ${backgroundImage}`);

        if (previousBackground && previousBackground !== backgroundColor) {
            var filler = document.createElement('div');
            filler.className = 'filler';
            filler.style.background = `linear-gradient(${previousBackground}, ${backgroundColor})`;

            // if we're transitioning between two colours, insert the filler between the two posts
            if (backgroundImage === 'none' && previousBackgroundImage === 'none') {
                post.parentNode.insertBefore(filler, post);
            }
            else // put the filler inside a wrapper div with the background image
            {
                var wrapper = document.createElement('div');
                wrapper.className = 'wrapper';
                // note: this doesn't work if we're transitioning between two images
                if (backgroundImage !== 'none') {
                    wrapper.style.background = backgroundImage;
                }
                else {
                    wrapper.style.background = previousBackgroundImage;
                }
                wrapper.appendChild(filler);
                post.parentNode.insertBefore(wrapper, post);
            }
        }

        previousBackground = backgroundColor;
        previousBackgroundImage = backgroundImage;
    }
};