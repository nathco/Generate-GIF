// Sketch Plugin: Generate Animated GIF From Artboards
// Source: github.com/NathanRutzky/Generate-GIF
// Version: 1.0

function plugin(option) {

    var artboardCount = [[[doc currentPage] artboards] count]

    if (![doc fileURL] || artboardCount < 2) {
    
        var error = [[NSTask alloc] init]
        
        [error setLaunchPath:"/bin/bash"]
        [error setArguments:["-c", "afplay /System/Library/Sounds/Basso.aiff"]]
        [error launch]
        [doc showMessage:"Create your Artboards, then Save the document..."]
    }
    
    else {
    
        for (var i=0; i < artboardCount; i++) {
        
            var artboard = [[doc currentPage] artboards][i],
                artboardName = [artboard name]
            
            if (artboardName != "Lock") {
            
                var setting = [[NSProcessInfo processInfo] environment],
                    sandbox = (nil != [setting objectForKey:@"APP_SANDBOX_CONTAINER_ID"]),
                    filePath = [[doc fileURL] path].split([doc displayName])[0],
                    fileName = ".img.imgset/" + ".img" + artboardName + ".png",
                    fileFolder = filePath + fileName
                                
                if (sandbox) {
                
                    var userHome = "/Users/" + NSUserName(),
                        userPath = [[[NSURL fileURLWithPath:userHome] URLByStandardizingPath] URLByResolvingSymlinksInPath],
                        bookmark = [[NSUserDefaults standardUserDefaults] objectForKey:userHome]
                        
                    if (!bookmark) {
                    
                        var openPanel = [NSOpenPanel openPanel]
                        
                        [openPanel setTitle:"Sketch Authorization"]
                        [openPanel setMessage:"Sketch.app needs permission to write to this directory."]
                        [openPanel setPrompt:"Authorize"]
                        [openPanel setCanChooseFiles:false]
                        [openPanel setCanChooseDirectories:true]
                        [openPanel setDirectoryURL:userPath]
                        
                        if ([openPanel runModal] == NSOKButton) {
                        
                            bookmarkURL = [openPanel URL]
                            
                        } else return false
                
                        bookmark = [userPath bookmarkDataWithOptions:NSURLBookmarkCreationWithSecurityScope
                                    includingResourceValuesForKeys:nil
                                    relativeToURL:nil
                                    error:nil]
                                    
                        [[NSUserDefaults standardUserDefaults] setObject:bookmark forKey:userHome]
                        [[NSUserDefaults standardUserDefaults] synchronize]
                    }
                    
                    var bookmarkURL = [NSURL URLByResolvingBookmarkData:bookmark
                        options:NSURLBookmarkResolutionWithSecurityScope
                        relativeToURL:nil
                        bookmarkDataIsStale:nil
                        error:nil]
                        
                    if (bookmarkURL)
                    
                       [doc saveArtboardOrSlice:artboard toFile:fileFolder]
                } else [doc saveArtboardOrSlice:artboard toFile:fileFolder]
            }      
        }

        var convert = [[NSTask alloc] init],
            creates = [[NSTask alloc] init],
            removes = [[NSTask alloc] init],
            success = [[NSTask alloc] init]
        
            [convert setLaunchPath:"/bin/bash"]
            [convert setArguments:["-c","find ~/ -name '.img*.png' -exec sips -s format gif -o {}.gif {} \\;"]]
            [convert launch]
            [convert waitUntilExit]
            
            [creates setLaunchPath:"/bin/bash"]
            [creates setArguments:["-c", option]]
            [creates launch]
            [creates waitUntilExit]
            
            [removes setLaunchPath:"/bin/bash"]
            [removes setArguments:["-c","find ~/ -name '.img.imgset' -exec rm -r {} \\;"]]
            [removes launch]
            
            [success setLaunchPath:"/bin/bash"]
            [success setArguments:["-c", "afplay /System/Library/Sounds/Pop.aiff"]]
            [success launch]
            [doc showMessage:"GIF Complete..."]
    }    
}