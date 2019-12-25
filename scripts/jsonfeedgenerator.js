var util = require('hexo-util');

hexo.extend.generator.register('json-feed', hexo_generator_json_feed);

function hexo_generator_json_feed(site) {
	var config, posts, rss, feedPath, siteAuthor;

	generateTags = function(post) {
    	return post.categories.length ? post.categories.map(function (cat) {
          return cat.name;
        }).join(',') : post.tags.map(function (tag) {
          return tag.name;
        }).join(',')
    }

	config = hexo.config.hasOwnProperty('jsonFeed') ? hexo.config.jsonFeed : {};

	feedPath = config.path ? config.path + '.json' : 'feed.json';

	posts = site.all_posts.sort('-date').filter(function (post) {
      return post.published;
    }).filter(function(post){return !post.searchpage});

    if (config.limit) posts = posts.splice(0, config.limit);

    siteAuthor = {
		name: hexo.config.author,
		url: hexo.config.url
	}

	posts = posts.map(function (post) {
		return {
			id: post.permalink,
			url: post.permalink,
			external_url: post.link,
			title: post.title,
			link: post.permalink,
			summary: post.excerpt ? post.excerpt.replace(/<!-- hidden -->/g,'').replace(/<script.*?>.*?<\/script>/gi,'').replace(/(<center>|<\/center>)/gi,'').replace(/<div class="loadimages" style="display:none;" data-imgs=".*?"><\/div>/gi,'') : '',
			image: post.image,
			banner_image: post.image,
			content_html: post.content.replace(/<!-- hidden -->/g,'').replace(/<script.*?>.*?<\/script>/gi,'').replace(/(<center>|<\/center>)/gi,'').replace(/<div class="loadimages" style="display:none;" data-imgs=".*?"><\/div>/gi,''),
			date_published: post.date.toDate().toISOString(),
			date_modified: post.updated.toDate().toISOString(),
			author: post.author ? {
				"name": post.author
			} : siteAuthor,
			tags: generateTags(post)
		};
    });

	feedContent = {
		version: 1,
		title: hexo.config.title,
		description: hexo.config.description,
		home_page_url: hexo.config.url,
		feed_url: hexo.config.url + '/' + feedPath,
		language: hexo.config.language,
		author: siteAuthor,
		items: posts
	};
	
	var arr = [], url = hexo.config.url;
	posts.forEach(function(item){
		var curr={t:item.title,u:item.id.replace(url,''),c:''};
		if(item.id.indexOf('galerija/')<0)curr.c=item.content_html;
		arr.push(curr);
	});

	return [
	{path: feedPath, data: JSON.stringify(feedContent)},
	{path: 'json-feed.json', data: JSON.stringify(arr)}
	];
}