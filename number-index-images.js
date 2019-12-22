function nf(n,m){typeof(m)!='undefined'||(m=2);n=String(n);while(n.length<m){n='0'+n;}return n;}
var fs = require('fs'), path = require('path'),
folders=fs.readdirSync(path.join(__dirname,'source','images'),{withFileTypes:true}).filter(dirent=>dirent.isDirectory()).map(dirent=>dirent.name);
// console.log(JSON.stringify(fs.readdirSync(path.join(__dirname,'source','images'))));
folders.forEach(name=>{
	let relPath=path.join(__dirname,'source','images',name);
	fs.readdirSync(relPath).forEach((img, i)=>{
		/\d{1,10}\.(jpg|png)/i.test(img)||fs.renameSync(path.join(relPath, img), path.join(relPath, nf(i+1,3)+'.jpg'));
	});
});