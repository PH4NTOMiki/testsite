hexo.extend.tag.register('mygallery', function (args) {
	if(!args[0]){return '';}
	var galleryName = args[0],
	max = args[1] || undefined;
	var fs = require('hexo-fs'), path = require('path');
	if(!fs.existsSync(path.join(__dirname,'..','source','images',galleryName))){hexo.log.info('mygallery: '+galleryName+' does not exist!');return '';} else {
		let imgs = fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).filter(c=>c.indexOf('-thumb')<0),
		showedImgs = '<center>' + 
			(imgs.slice(0,max).map(curr=>{
				let thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
				return '<a class="fancybox" href="/images/'+galleryName+'/'+curr+'"><img class="gallth" width="200px" height="160px" src="/images/'+galleryName+'/'+thumb.join('.')+'"></a>';
			}).join('')||'') + 
			'</center>';
		return showedImgs + (max?'<div class="loadimages" style="display:none;" data-imgs="' + [galleryName].concat(imgs.slice(max)).join(',') + '"></div>':'');
	}
	
	
	
	
	
	
	
});
