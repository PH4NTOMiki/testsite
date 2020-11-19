const Hexo = require('hexo');
const hexo = new Hexo(process.cwd(), {});
const numberOfPostsInIteration = Math.min(parseInt(process.env.NUMBER_OF_POSTS_IN_ITERATION || 100), 100);
const { execSync } = require('child_process');
const filterObjKeys = (obj, keyStart = '_', leaveKey = false) => Object.keys(obj).filter(key=>key.startsWith(keyStart)==leaveKey).reduce((a,b)=>(a[b]=obj[b],a),{});
const trimObjStrings = (obj) => Object.keys(obj).reduce((a,b)=>(a[b]=typeof(obj[b])==='string'||obj[b] instanceof String?obj[b].trim():obj[b],a),{});
const execCmd = (skip = 0) => JSON.parse(execSync(`node "./node_modules/gqall/index" ${process.env.GRAPHQL_API_URL} "${process.env.GRAPHQL_POSTS_ID || 'allPosts'}(first:${numberOfPostsInIteration}, skip:${skip})" -H "Authorization:${process.env.GRAPHQL_API_KEY}"`).toString().trim())[process.env.GRAPHQL_POSTS_ID || 'allPosts'];
// const { get, post } = require('axios');
// const lowerCaseObj = (obj) => Object.keys(obj).reduce((a,b)=>(a[b.toLowerCase()]=obj[b],a),{});
// const exec = require('util').promisify(require('child_process').exec);

//hexo.extend.filter.register('after_post_render', data => {
//	hexo.log.info(data.title);
//});

//hexo.on('processBefore', function(){
//(async function(){
//	if(!((hexo.env.args && hexo.env.args._) || []).includes('clean')){
//		let { data } = await get('https://localhost:8000/posts');
//	}
//})();

hexo.init().then(function(){
	let posts = execCmd();
	if(posts.length >= numberOfPostsInIteration){
		let i = numberOfPostsInIteration;
		let tempPosts = execCmd(i);
		while(tempPosts.length){
			posts = posts.slice().concat(tempPosts.slice());
			if(tempPosts.length < numberOfPostsInIteration){
				tempPosts = [];
				break;
			}
			tempPosts = execCmd(i += numberOfPostsInIteration);
		}
	}
	console.log('posts: ', posts.length);
	
	posts.map(e=>filterObjKeys(e)).map(trimObjStrings).forEach(post => {
		delete post.createdAt;
		delete post.updatedAt;
		delete post.id;
		if(post.hexoid)post.id = post.hexoid;
		delete post.hexoid;
		post.categories = post.categories ? (post.categories.split(/\s*,\s*/).length > 1 ? post.categories.split(/\s*,\s*/) : (post.categories || '')) : '';
		post.tags = post.tags ? (post.tags.split(/\s*,\s*/).length > 1 ? post.tags.split(/\s*,\s*/) : (post.tags || '')) : '';
		// console.log('post: ', post);
		hexo.post.create(post, true);
	});
});