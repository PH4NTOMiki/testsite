const { appendFileSync, existsSync, unlinkSync } = require('fs');
const testIt = val => undefined !== val;

existsSync('testing.json')&&unlinkSync('testing.json');

hexo.extend.filter.register('before_post_render', (data) => {
	let obj = {
		title: testIt(data.title) ? data.title : '',
		categories: testIt(data.categories) ? String(data.categories) : '',
		date: testIt(data.date._d) ? String(data.date._d) : '',
		content: testIt(data.content) ? data.content : '',
		hidden: testIt(data.hidden) ? data.hidden : false,
		searchpage: testIt(data.searchpage) ? data.searchpage : false,
		sitemap: testIt(data.sitemap) ? data.sitemap : true,
		slug: testIt(data.slug) ? data.slug : '',
		path: testIt(data.path) ? data.path : ''
	};
	appendFileSync('testing.json', '\n'+JSON.stringify(obj));
});