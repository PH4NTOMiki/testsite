hexo.extend.filter.register('before_exit', function(){
	var fs = require('hexo-fs'), path = require('path');
	var arr = [], url = hexo.config.url + '/';
	if(fs.existsSync(path.join(__dirname,'..','public','feed.json'))){
	JSON.parse(fs.readFileSync(path.join(__dirname,'..','public','feed.json'))).items.forEach(function(item){
		let curr={title:item.title,uri:item.id.replace(url,''),content:''};
		if(item.id.indexOf('galerija/')<0)curr.content=item.content_html;
		arr.push(curr);
	});
	fs.writeFileSync(path.join(__dirname,'..','public','json-feed.json'),JSON.stringify(arr));
	}
});