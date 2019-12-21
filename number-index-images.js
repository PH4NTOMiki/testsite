var fs = require('fs'), path = require('path'),
folders=fs.readdirSync(path.join(__dirname,'source','images'),{withFileTypes:true}).filter(dirent=>dirent.isDirectory()).map(dirent=>dirent.name);
console.log(JSON.stringify(fs.readdirSync(path.join(__dirname,'source','images'))));
folders.forEach(name=>{
	let relPath=path.join(__dirname,'source','images',name), i=1;
	fs.readdirSync(relPath).forEach(img=>{
		fs.renameSync(path.join(relPath, img), path.join(relPath, (i++)+'.jpg'));
	});
});