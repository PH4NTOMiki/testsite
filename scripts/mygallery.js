hexo.extend.tag.register('mygallery', function (args) {
	if(!args[0]){return '';}
	const galleryName = args[0],
	max = args[1] || undefined,
	source = /*hexo.config.cdn || */'',
	fs = require('hexo-fs'), path = require('path');
	if(!fs.existsSync(path.join(__dirname,'..','source','images',galleryName))){hexo.log.info('mygallery: '+galleryName+' does not exist!');return '';} else {
		let imgs = fs.listDirSync(path.join(__dirname,'..','source','images',galleryName)).filter(c=>c.indexOf('-thumb')<0),
		showedImgs = 
			(imgs.slice(0,max).map(curr=>{
				let thumb=curr.split('.');thumb[thumb.length-2]+='-thumb';
				return '<a class="fancybox" href="'+source+'/images/'+galleryName+'/'+curr+'"><img class="gallth" width="200px" height="160px" src="'+source+'/images/'+galleryName+'/'+thumb.join('.')+'" alt="'/*+curr.split('.').slice(0,-1).join('.')*/+'"></a>';
			}).join('')||'') + 
			'</center>';
		return '<center' + (max?' data-imgs="' + [galleryName].concat(imgs.slice(max)).join(',') + '"':'') + '>' + showedImgs;
	}
	
	
	
	
	
	
	
});
