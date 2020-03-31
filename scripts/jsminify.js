hexo.extend.filter.register('after_render:js', (js, data)=>{
	if(data.path.endsWith('.min.js'))return js;
	const /* request = require('request'),  */ log = hexo.log || console, 
	minified = require('minify').js(js);
	log.log('jsminify(JS): '+data.path+' [ '+ ((js.length - minified.length) / js.length * 100).toFixed(2) +'% saved]');
	return minified;
	// if(!data.path.includes('script.js')){log.warn('jsminify(JS): '+data.path+' Skip minifying.');return js;}
	/* return new Promise(function (resolve, reject) {
		request.post('https://javascript-minifier.com/raw', {form: {input: js}}, (err, resp, body)=>{
			if(err || body.includes('/ Error')){
				log.warn('jsminify(JS): '+data.path+' Error: [ '+(err || body.split('\n').join(' '))+' ], Skip minifying.');
				return resolve(js);
			}
			let saved = ((js.length - body.length) / js.length * 100).toFixed(2);
			log.log('jsminify(JS): '+data.path+' [ '+saved+'% saved]');
			resolve(body);
		});
    }); */
});