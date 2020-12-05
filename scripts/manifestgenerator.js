const imageSize = require('image-size'), imageWidth = e => imageSize(e).width;
var config = hexo.config, mConfig = config.hasOwnProperty('manifest') ? config.manifest : {};

config.manifestEnabled = Array.isArray(config.manifest.icons) && mConfig.icons.length >= 2;
hexo.extend.generator.register('manifest', manifestGenerator);

function manifestGenerator(site) {
	if(!config.manifestEnabled)return;
	var manifest = {
		name: mConfig.name || (config.title || 'Website'),
		short_name: mConfig.short_name || '',
		theme_color: mConfig.theme_color || '#898e8c',
		background_color: mConfig.background_color || '#ffffff',
		display: mConfig.display || 'standalone',
		start_url: mConfig.start_url || (config.root || '/'),
		icons: mConfig.icons.map(icon => {
			let width, matches = /-(\d{1,5})(px)?((x|-)?\d{1,5})?/i.exec(icon);
			width = matches && matches[1] ? matches[1] : imageWidth('../source/' + icon);
			
			return {src: icon, sizes: `${width}x${width}`, type: 'image/png'};
		}),
		splash_pages: mConfig.splash_pages || null
	};
	
	if(!manifest.short_name)delete manifest.short_name;
	
	return {path: 'manifest.json', data: JSON.stringify(manifest, null, '\t')};
}