# About Giphy Image
A x-tag web component that uses the Giphy API.

# Example

```
<x-giphy-image type="translate" term="boom"></x-giphy-image>
<x-giphy-image type="search" term="hackers"></x-giphy-image>
<x-giphy-image type="trending"></x-giphy-image>
<x-giphy-image type="random" term="futurama"></x-giphy-image>
```

`types`:
  *  `translate`
  *  `search`
  *  `trending`
  *  `random`


`term`:
  * Search term, translate term or tag to filter random results by. Does not apply to trending type.


`random`:
  *  This attribute will start with a random gif from the returned gifs.


`rating`:
  *  y, g, pg, pg-13, r (defaults to `r`)
