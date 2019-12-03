const imageThumbnail = require('image-thumbnail'),
fs = require('fs'), path = require('path'), sizeOf = require('image-size');
const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
return filelist;
}
//counter=0;
var arr=walkSync(path.join(__dirname,'source','images'));
arr.forEach(function(img){
	let n=img.split('.');
	n[n.length-2]+='-thumb';
	n=n.join('.');
	if(img.indexOf('-thumb')<0 && arr.indexOf(n)<0){
	sizeOf(img, function (err, dimensions){
		//console.log(dimensions.width,dimensions.height)
		let options = dimensions.width>=dimensions.height ? {width:200,height:160} : {width:200,height:269};
		//console.log(options);
		imageThumbnail(img,options).then(thumbnail=>{
			fs.writeFileSync(n,thumbnail);
		})
	})
	//counter++;
	}
});
//console.log(counter);