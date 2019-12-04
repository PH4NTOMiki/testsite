const /*imageThumbnail = require('image-thumbnail'),*/
fs = require('fs'), path = require('path')/*, sizeOf = require('image-size')*/;
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
return filelist;
}

walkSync(path.join(__dirname,'source','images')).concat(walkSync(path.join(__dirname,'public','images'))).forEach(function(img){
	img.indexOf('-thumb')>-1&&fs.unlinkSync(img);
});