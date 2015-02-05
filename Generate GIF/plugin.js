// Sketch Plugin: Generate Animated GIF
// Source: github.com/NathanRutzky/Generate-GIF
// Version: 1.0.1

var scriptPath = sketch.scriptPath
var gifx = [scriptPath stringByDeletingLastPathComponent] + "/GIFX"
var gifPath = savePath()
var tempPath = NSTemporaryDirectory()
var string = [[NSProcessInfo processInfo] globallyUniqueString]
var gifsetPath = [tempPath stringByAppendingPathComponent: string + @".gifset"]

function plugin(option) {
    
    var fileManager = [NSFileManager defaultManager]

    [fileManager createDirectoryAtPath:gifsetPath withIntermediateDirectories:true attributes:nil error:nil]

    var artboards = [[doc currentPage] artboards]
    
    if ([artboards count] < 1) {
        
        var error = [[NSTask alloc] init]
        
        [error setLaunchPath:@"/bin/bash"]
        [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
        [error launch]
        [doc showMessage:"Error: Artboard Not Found"]
        return false
    }
    
    for (var i=0; i < [artboards count]; i++) {
    
        var artboard = [artboards objectAtIndex:i]
        var artboardName = [artboard name]
        var fileName = [gifsetPath stringByAppendingPathComponent: artboardName + ".png"]
        
        if ([artboardName hasSuffix:@"Lock"]) {
            
            continue
        }
                            
        [doc saveArtboardOrSlice:artboard toFile:fileName]    
    }
    
    var convertTask = [[NSTask alloc] init]
    var createsTask = [[NSTask alloc] init]
    var convertGIF = "find \"" + gifsetPath + "\" -name '*.png' -exec sips -s format gif -o {}.gif {} \\;"
    
    [convertTask setLaunchPath:@"/bin/bash"]
    [convertTask setArguments:["-c", convertGIF]]
    [convertTask launch]
    [convertTask waitUntilExit]
    [createsTask setLaunchPath:@"/bin/bash"]
    [createsTask setArguments:["-c", option]]
    [createsTask launch]
    [createsTask waitUntilExit]
  
    if ([createsTask terminationStatus] == 0) {
        
        [doc showMessage:@"Export Complete..."]
        
    } else {
        
        var error = [[NSTask alloc] init]
        
        [error setLaunchPath:@"/bin/bash"]
        [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
        [error launch]
        [doc showMessage:@"Export Failed..."]
    } 
    
    [fileManager removeItemAtPath:gifsetPath error:nil]   
}

function savePath() {
    
    var filePath = [doc fileURL] ? [[[doc fileURL] path] stringByDeletingLastPathComponent] : @"~"
    var fileName = [[doc displayName] stringByDeletingPathExtension]
    var savePanel = [NSSavePanel savePanel]
    
    [savePanel setTitle:@"Export Animated GIF"]
    [savePanel setNameFieldLabel:@"Export To:"]
    [savePanel setPrompt:@"Export"]
    [savePanel setAllowedFileTypes: [NSArray arrayWithObject:@"gif"]]
    [savePanel setAllowsOtherFileTypes:false]
    [savePanel setCanCreateDirectories:true]
    [savePanel setDirectoryURL:[NSURL fileURLWithPath:filePath]]
    [savePanel setNameFieldStringValue:fileName]

    if ([savePanel runModal] != NSOKButton) {
        
        exit
    } 
    
    return [[savePanel URL] path]
}