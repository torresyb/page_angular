var pageApp = angular.module('pageModule',[]);
// 自定义一个分页服务
pageApp.factory('Pagination', function(){
	var pagination = {};
	pagination.getNew = function(perPage,interval){
		// 每页显示的条数和间隔是可控 初始化值分别为 5/2
		perPage = perPage === undefined ? 5 : perPage;
		interval = interval === undefined ? 2 : interval;
		var paginator = {
			numPages:1, // 总页数
			interval:2, // 间隔
			perPage:perPage, //每页总数
			page:0 //当前页
		};
		// 向前翻页
		paginator.prevPage = function(){
			if(paginator.page > 0){
				paginator.page -= 1;
			}
		};
		// 向后翻页
		paginator.nextPage = function(){
			if(paginator.page < paginator.numPages - 1){
				paginator.page += 1;
			}
		};
		// 页数定位
		paginator.toPageId = function(id){
			if(id>=0 && id<=paginator.numPages-1){
				paginator.page = id;
			}
		};
		return paginator;
	};

	return pagination;
});

// 和limitTo配合控制显示的范围
pageApp.filter("startFrom",function() {
	return function(input, start){
		start = parseInt(start,10);
		if(input instanceof Array){
			return input.slice(start);
		}
	};
});

// 页面间的间隔
pageApp.filter("intervalPage",function() {
	return function(input, interval, page, perPage, numPages){
		if(input instanceof Array){
			var start = Math.max(0,page-interval);
			var end = Math.min(page+interval+1,numPages);
			if(page-interval<0){
				end = (2*interval+1)>numPages?numPages:(2*interval+1);
			}
			if((page+interval+1)>numPages){
				start = (numPages-2*interval-1)<1?1:(numPages-2*interval-1);
			}
			return input.slice(start,end);
		}
	};
});

// 页码
pageApp.filter("range",function(){
	return function(input,total){
		total = parseInt(total,10);
		for(var i=0;i<total;i++){
			input.push(i);
		}
		return input;
	};
});