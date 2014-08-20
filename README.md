# Generate GIF
Sketch.app plugin for generating animated `GIFs` from a sequence of artboards. Works with sandboxed ( App Store ) and standard application environments.

**Please Note!**  
This plugin is intended for simple keyframe animations. I recommend using Adobe After Effects if you need advanced features or full control of the output. 

## Installation
1. Download and open `Generate-GIF-master.zip`
2. Navigate the Sketch menu bar to `Plugins ▸ Reveal Plugins Folder...`
3. Place the `Generate GIF` folder into the revealed plugins directory
4. Place the `ImageKit` folder in the user `~/Library/` directory ( **Required!** )
5. That's it...

## How to Use
Create your content on a sequence of artboards using a `Frame 1`, `Frame 2`, `Frame 3` naming convention. Each artboard acts as an animation keyframe and will play sequentially according to the naming structure. When ready, navigate to `Plugins ▸ Generate GIF` and select a playback method and frame animation delay ( see options below ). The `Animated.gif` will export to the same directory as your `.sketch` document.

**Playback Options**  
`Loop: play animation forever`    
`Once: play animation one cycle`  

**Frame Delay Options**  
`100 ms` `00.1 sec`  
`200 ms` `00.2 sec`  
`500 ms` `00.5 sec`  
`1000 ms` `1.0 sec`  
`2000 ms` `2.0 sec`   
`5000 ms` `5.0 sec`    
`No Delay`

**Usage Notes**  
If you notice issues with transparency and / or antialiasing, try adding a solid background color to the artboard. You can prevent individual artboards from exporting by appending `Lock` to the name. Frame delay options can be modified by editing the plugin files.

## Feedback
If you discover any issues or have questions regarding usage, please send a message to [mail@nath.co](mailto:mail@nath.co) or find me on twitter [@NathanRutzky](http://twitter.com/NathanRutzky).