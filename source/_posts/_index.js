var path = require('path'),
fs = require('fs'),
arr=[];

var files = fs.readdirSync(__dirname);
files.forEach(file=>{
    if(/.*\.md$/.test(file) && (/*file.toLowerCase().indexOf('galerija')>-1 || */fs.readFileSync(path.join(__dirname, file), 'utf8').toLowerCase().indexOf('{gallery}')>-1)){
		arr.push(file);
	}
});
console.log(arr);
arr.forEach(file=>{
	fs.renameSync(path.join(__dirname, file), path.join(__dirname, 'galerija', file));
});