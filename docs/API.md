<a name="beholder"></a>

## beholder : <code>object</code>
**Kind**: global namespace  
**Requires**: <code>module:Beholder</code>  

* [beholder](#beholder) : <code>object</code>
    * [.prepare(config, querySelector)](#beholder.prepare)
    * [.markerPresenceToMouseClick(markerId, clickX, clickY)](#beholder.markerPresenceToMouseClick)

<a name="beholder.prepare"></a>

### beholder.prepare(config, querySelector)
Configures and initializes the Beholder system. It must be called at during the sketch `setup()`.

**Kind**: static method of [<code>beholder</code>](#beholder)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>BeholderConfig</code> | Information about Beholder detection setup (optional) |
| querySelector | <code>string</code> | A CSS selector for an element where Beholder will be added |

<a name="beholder.markerPresenceToMouseClick"></a>

### beholder.markerPresenceToMouseClick(markerId, clickX, clickY)
If a marker is present, the mouse button 0 goes down and, when undetected, goes up. The position of the resulting click can be defined, in pixels.

**Kind**: static method of [<code>beholder</code>](#beholder)  

| Param | Type | Description |
| --- | --- | --- |
| markerId | <code>number</code> | The id of the marker to check presence |
| clickX | <code>number</code> | The X position where of the resulting click |
| clickY | <code>number</code> | The Y position where of the resulting click |

