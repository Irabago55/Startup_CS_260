d# Notes

## Git Commands
1. **Putting 2 astericks on each side of the text will make it bold**
2. Successive # from 1-3 will make headers (1 being the largest size and 3 the smallest)
3. "git pull" in the terminal will pull the latest github version I have
4. "git commit" will commit the changes in my terminal
5. "git push" will send those changes back to my github

## HTML Notes

1. "img" tag is used to display images in html. It will either have a full url from an external website or a relative url from the computer you're using. You put the url in the "src" attriubute and you can describe the image in the "alt" attribute.
2. To display audio you use the "audio" element with the "src" attribute that takes the url. If you add the "controls" element it allows the user to control the audio (which is preferred). The "autoplay" attribute plays it as soon as it loads, and the "loop" attribute plays is over and over (discouraged unless user has the option to opt into the action).
3. To display a video you use the "video" elements and it has the same rules with the "src", "autoplay", and "loop" attributes as the audio.
   a. You may need to include the "crossorigin="anonymous"" if you're requesting files from a different domain than the one serving the content.
   
   b. You can also provide a width (and I assume a height) attribute to the video.
4. cdc

## CSS Notes

1. If you have an id in your html you reference it in css by saying #(id name)

## Vite & React Notes

1. Use "npm run dev" to host the website to see changes live
2. A component in JSX (React) is a function that returns something to the DOM which basically means it renders (changes) something on the screen
