var path = require('path'),
fs = require('fs');

fs.readdirSync(__dirname).forEach(file=>{
    if(/.*\.md$/.test(file)){
		content=fs.readFileSync(path.join(__dirname, file), 'utf8');
		content=content.replace(/\[(.*)\]\((.*)\)/gi,function(m,a,b){
			return '<a href="'+b+'">'+a+'</a>';
		});
		fs.writeFileSync(path.join(__dirname, file),content,'utf8');
	}
});