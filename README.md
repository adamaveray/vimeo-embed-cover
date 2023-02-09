# vimeo-embed-cover

A utility to scale a Vimeo embed to fill an element regardless of aspect ratio.

Vimeo embeds letterbox to fit within their embedding iframe (equivalent to CSS's `object-fit: contain`). This utility dynamically scales up the embed to fill the container with the video content and hiding the letterboxing (equivalent to `object-fit: cover`).

## Usage

Initialise a Vimeo Player, then pass the Player instance into the utility function:

```js
import vimeoEmbedCover from 'vimeo-embed-cover';

const player = new Vimeo.Player(/* ... */);
vimeoEmbedCover(player);
```

The player's `<iframe>` element will be resized & repositioned within its parent.

As the positioning is configured via CSS, the player's containing element (the element passed in to `new Vimeo.Player(element)`) must also have `position: relative` or `position: absolute` set.

---

[MIT License](./LICENSE)
