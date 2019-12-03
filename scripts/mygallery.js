hexo.extend.tag.register('mygallery', function (args) {
	var galleryName = args[0] || '',htmlTxt='';
	var fs = require('hexo-fs'), path = require('path');
	fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).filter(function(curr){return curr.indexOf('-thumb')<0}).forEach(function(curr){
		let thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
		htmlTxt+='<a data-fancybox-href="/images/'+galleryName+'/'+curr+'" href="/images/'+galleryName+'/'+curr+'"><img class="gallth" width="200px" height="160px" src="/images/'+galleryName+'/'+thumb.join('.')+'"></a>';
	});
	
	
	
	
	
	
	return htmlTxt;
});