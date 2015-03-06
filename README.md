# About Giphy Image
A x-tag web component that consumes the [Giphy API](https://github.com/Giphy/GiphyAPI).


See it in action at [x-giphy-image](http://www.wolvesintheserverroom.com/xgiphyimage/demo/index.html)
# Example

```
<x-giphy-image type="translate" term="boom"></x-giphy-image>
<x-giphy-image type="search" term="hackers"></x-giphy-image>
<x-giphy-image type="trending"></x-giphy-image>
<x-giphy-image type="random" term="futurama"></x-giphy-image>
```

# Attributes

`type`:
  *  `translate`
  *  `search`
  *  `trending`
  *  `random`


`term`: Search term, translate term or tag to filter random results by. Does not apply to trending type.


`random`: This attribute will display a random gif from the returned gifs.


`rating`: (defaults to r)
  * y
  * g
  * pg
  * pg-13
  * r
