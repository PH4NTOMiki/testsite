hexo.extend.tag.register('mygallery', function (args) {
	var galleryName = args[0] || '',htmlTxt='';
	var max = args[1] || undefined;
	var fs = require('hexo-fs'), path = require('path');
	if(!fs.existsSync(path.join(__dirname,'..','source','images',galleryName))){hexo.log.info('mygallery: '+galleryName+' does not exist!');} else {
	fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).filter(function(curr){return curr.indexOf('-thumb')<0}).slice(0,max).forEach(function(curr){
		let thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
		htmlTxt+='<a class="fancybox" href="/images/'+galleryName+'/'+curr+'"><img class="gallth" width="200px" height="160px" src="/images/'+galleryName+'/'+thumb.join('.')+'"></a>';
	});}
	
	
	
	
	
	
	return htmlTxt;
});