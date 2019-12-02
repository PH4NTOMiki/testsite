hexo.extend.tag.register('mygallery', function (args) {
	var galleryName = args[0] || '',htmlTxt='';
	var fs = require('hexo-fs'), path = require('path');
	fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).forEach(function(curr){
		htmlTxt+='<a href="/images/'+galleryName+'/'+curr+'"><img style="display:inline-block;" width="200px" height="160px" src="/images/'+galleryName+'/'+curr+'"></a>';
	});
	
	
	
	
	
	
	return htmlTxt;
});