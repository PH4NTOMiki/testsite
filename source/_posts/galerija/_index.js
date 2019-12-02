var path = require('path'),
fs = require('fs');

fs.readdirSync(__dirname).forEach(file=>{
    if(file!='_index.js'){
		content=fs.readFileSync(path.join(__dirname, file), 'utf8')
		if(content.toLowerCase().indexOf('sample-data-articles')>-1){
			content=content.replace(/sample-data-articles/gi,'galerija');
			fs.writeFileSync(path.join(__dirname, file),content,'utf8')
		}
	}
});