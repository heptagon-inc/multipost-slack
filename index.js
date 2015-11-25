exports.handler = function(event, context) {

ConfigFile = require('config');
Slack = require('node-slackr');
client = require('cheerio-httpcli');

//Load configration.
post = ConfigFile.config 

//Input from slash command.
news = event.text 

//Create messages including link, description and image.
client.fetch(news, { q: "" }, function (err, $, res, body) {
post.forEach(function(list){
messages = {
    channel: list.channel,
  attachments: [
    {
            title: $('title').text(),
            title_link: news,
            text: $('meta[property="og:description"]').attr("content"),
            image_url: $('meta[property="og:image"]').attr("content")
    }
		]
 	  }	

//Post to slack.
distribution = new Slack(list.URL);
distribution.notify(messages); 
			});
							});
};
