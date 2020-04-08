// hexo.extend.filter.register('before_exit', function(){
	var fs = require('hexo-fs'), path = require('path');
/*	var arr = [], url = hexo.config.url;
	if(fs.existsSync(path.join(__dirname,'..','public','feed.json'))){
	JSON.parse(fs.readFileSync(path.join(__dirname,'..','public','feed.json'))).items.forEach(function(item){
		var curr={t:item.title,u:item.id.replace(url,''),c:''};
		if(item.id.indexOf('galerija/')<0)curr.c=item.content_html;
		arr.push(curr);
	});
	fs.writeFileSync(path.join(__dirname,'..','public','json-feed.json'),JSON.stringify(arr));
	}
	if(fs.existsSync(path.join(__dirname,'..','public','pretraga','index.html'))){
		var html=fs.readFileSync(path.join(__dirname,'..','public','pretraga','index.html'));
		html=html.replace(/<div class="article-meta".*?<\/time><\/a><\/div>/,'').replace(/<meta property="og:updated_time" content=".*?">/,'').replace(/<meta property="og:time" content=".*?">/,'').replace('class="article-footer"','class="article-footer" style="display:none;"');
		fs.writeFileSync(path.join(__dirname,'..','public','pretraga','index.html'),html);
	}
});*/
const cdn = hexo.config.cdn || '', replaceFunc = str => str.replace(/(href|src|rel)=("|')\/(.*?\.(jpg|jpeg|png|js|css|pdf|doc|docx|xls|xlsx))("|')/gi, (...args)=>{return `${args[1]}=${args[2]}${cdn}/${args[3]}${args[5]}`;});

if(cdn && !((hexo.env.args && hexo.env.args._) || []).includes('clean')){
	hexo.log.info('using CDN: ' + cdn);
	hexo.extend.filter.register('after_post_render', data=>{
		// hexo.log.info('after_post_render');
		data.content = replaceFunc(data.content);
		return data;
	});
	/*hexo.extend.filter.register('before_exit', ()=>{
		let jsPath = path.join(__dirname,'..','public','js','script.js');
		fs.existsSync(jsPath)&&fs.writeFileSync(jsPath, fs.readFileSync(jsPath).replace('cdn=""', 'cdn="'+cdn+'"'));
	});  handled in different function bellow this */
}

hexo.extend.filter.register('after_render:html', data=>{
	return (!cdn?data:replaceFunc(data)).replace('<link rel="alternate" href="/atom.xml"','<link rel="alternate" href="'+hexo.config.url+'/atom.xml"').replace(/(\/|&#x2F;)--index\.html/gi,'&#x2F;').replace(/(<meta .*?property="og:url".*? content=".*?)index\.html/gi,'$1').replace(/&#x2F;/gi,'/').replace(/<meta .*?name="generator".*? content=".*?".*?>/gi,'').replace(/(<a class=".*?(category-list-link|article-category-link).*?" href=".*?">)(.*?)(<\/a>)/g,(...args)=>{return args[1]+args[3][0].toUpperCase()+args[3].slice(1)+args[4];}).replace(/<meta property="og:url" content=".*?\/404\.html">/i,'').replace(/<script defer/gi,'<script').replace(/<script(.*? src=(.*?)>)/gi, (m,n,c)=>{return hexo.config.scriptdefer && !c.toLowerCase().includes('html5shiv')?'<script defer'+n:m})/*.replace(/imgalt/gi,'').replace(/<script/i,'</div><script').replace(/<\/div>(?!.*<\/div>)/i,'').replace(/\/atom\.xml/g,hexo.config.url+'/atom.xml');*/
});

hexo.extend.filter.register('before_exit', ()=>{
	let jsPath = path.join(__dirname,'..','public','js','script.js'),
	cssPath = path.join(__dirname,'..','public','css','style.css'),
	jqPath = path.join(__dirname,'..','public','js','jquery.2.0.3.min.js');
	if(hexo.config.fancyboxjscombined && fs.existsSync(jqPath)){
		let jqFile = fs.readFileSync(jqPath).toString();
		// console.log(jqFile.length);
		jqFile=jqFile.split('\n').slice(0,6).join('\n');
		// console.log(jqFile.length);
		jqFile += '\n' + fs.readFileSync(path.join(__dirname,'..','public','fancybox','jquery.fancybox.pack.js')).toString();
		fs.writeFileSync(jqPath, jqFile);
	}
	if(hexo.config.fancyboxcsscombined && fs.existsSync(cssPath)){
		let cssFile = fs.readFileSync(cssPath).toString().split('\n')[0];
		cssFile += '\n' + fs.readFileSync(path.join(__dirname,'..','public','fancybox','jquery.fancybox.css')).toString();
		fs.writeFileSync(cssPath, cssFile);
	}
	if(fs.existsSync(jsPath)){
		let jsFile = fs.readFileSync(jsPath).toString().split('\n').pop();
		// console.log('cdn: '+cdn)
		// console.log(jsFile.slice(0,20));
		jsFile = jsFile.replace('cdn=""', 'cdn="'+cdn+'"').replace('cdn="undefined"', 'cdn="'+cdn+'"');
		// console.log(jsFile.slice(0,20));
		if(hexo.config.localresources && hexo.config.fusecombined){
			// console.log(hexo.config.fusecombined)
			let fusefile = fs.readFileSync(path.join(__dirname,'..','public','js','fuse.min.js')).toString();
			// console.log(fusefile.slice(0,20));
			jsFile = fusefile + '\n' + jsFile;
		}
		fs.writeFileSync(jsPath, jsFile);
	}
});