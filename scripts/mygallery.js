hexo.extend.tag.register('mygallery', function (args) {
	if(!args[0]){return '';}
	var galleryName = args[0],
	max = args[1] || undefined;
	var fs = require('hexo-fs'), path = require('path');
	if(!fs.existsSync(path.join(__dirname,'..','source','images',galleryName))){hexo.log.info('mygallery: '+galleryName+' does not exist!');} else {
	return '<center>' + (fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).filter(c=>c.indexOf('-thumb')<0).slice(0,max).map(curr=>{
		let thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
		return '<a class="fancybox" href="/images/'+galleryName+'/'+curr+'"><img class="gallth" width="200px" height="160px" src="/images/'+galleryName+'/'+thumb.join('.')+'"></a>';
	}).join('')||'') + '</center>';
	}
	
	
	
	
	
	
	
});
