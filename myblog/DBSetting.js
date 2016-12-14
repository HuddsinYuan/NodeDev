/**
 * Created by Jonassen on 16/2/17.
 */

/*
	cookieSecret: 使用设置的cookiesecret字符串来计算hash值并放在cookie中
					是产生的signedcookie防止被篡改
	db: the name of the database
	host: which host 
	
	目的是为了写一些配置参数
*/
module.exports = {
    cookieSecret:'microblogyuan',
    db:'microblog',
    host:'localhost'
};