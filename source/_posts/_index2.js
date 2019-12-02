var path = require('path'),
fs = require('fs');

fs.readdirSync(__dirname).forEach(file=>{
    if(file!='_index.js'&&file!='_index2.js'&&file!='vijesti'&&file!='galerija'){
		content=fs.readFileSync(path.join(__dirname, file), 'utf8');
		content=content.replace(/\[(.*)\]\((.*)\)/gi,function(m,a,b){
			return '<a href="'+b+'">'+a+'</a>';
		});
		fs.writeFileSync(path.join(__dirname, file),content,'utf8');
	}
});