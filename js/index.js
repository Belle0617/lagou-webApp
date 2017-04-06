'use strict';

angular.module('app',['ui.router','ngCookies']);
'use strict';

angular.module('app').run(['$rootScope','$http',function($rootScope,$http){
	$rootScope.selects={};
	$http.get('data/city.json').then(function(reps){
		$rootScope.selects.city=reps.data;
	});
	$http.get('data/salary.json').then(function(reps){
		$rootScope.selects.salary=reps.data;
	});
	$http.get('data/scale.json').then(function(reps){
		$rootScope.selects.scale=reps.data;
	});
}]);
'use strict';
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'view/main.html',
            controller: 'mainCtrl'
        })
        .state('search',{
            url:'/search',
            templateUrl:'view/search.html',
            controller:'searchCtrl'
        })
        .state('me',{
            url:'/me',
            templateUrl:'view/me.html',
            controller:'meCtrl'
        })
        .state('detail',{
        	url:'/detail/:id',
        	templateUrl:'view/detail.html',
        	controller:'detailCtrl'
        })
        .state('classify',{
            url:'/classify/:id',
            templateUrl:'view/classify.html',
            controller:'classifyCtrl'
        })
        .state('login',{
            url:'/login',
            templateUrl:'view/login.html',
            controller:'loginCtrl'
        })
        .state('regist',{
            url:'/regist',
            templateUrl:'view/regist.html',
            controller:'registCtrl'
        })
        .state('deliver',{
            url:'/deliver',
            templateUrl:'view/deliver.html',
            controller:'deliverCtrl'
        })
        .state('collect',{
            url:'/collect',
            templateUrl:'view/collect.html',
            controller:'collectCtrl'
        });
    $urlRouterProvider.otherwise('main');
}])

'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('classifyCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http({
		method:'get',
		url:'data/company.json?id='+$state.params.id,
		responseType:'json'
	}).then(function(resp){
		$scope.company=resp.data;
		// console.log(resp.data.positionClass)
	},function(resp){
		console.log('请求失败！')
	});
}])
'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('collectCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http({
        method: 'get',
        url: 'data/myFavorite.json',
        responseType: 'json'
    }).then(function(resp) {
        $scope.collectList = resp.data;
    }, function(resp) {
        console.log('请求失败！')
    });
    $scope.starImg = "image/star-active.png";
    var starFlag = true; //默认已收藏
    // 收藏&取消收藏
    $scope.doStar = function() {
        if (starFlag == true) {
            $scope.starImg = "image/star.png";
            starFlag = false;
        } else {
        	$scope.starImg = "image/star-active.png";
            starFlag = true;

        }
    }
}])

'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('deliverCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$http({
		method:'get',
		url:'data/myPost.json',
		responseType:'json'
	}).then(function(resp){
		$scope.deliverList=resp.data;
		// console.log($scope.deliverList);
	},function(resp){
		console.log('请求失败！')
	});
	$scope.post1='underline';
	$scope.tabList=[{
		id:'all',
		name:'全部'
	},{
		id:'invite',
		name:'面试邀请'
	},{
		id:'unsuit',
		name:'不合适'
	}];

	$scope.filterObj={};
	$scope.tabClick=function(id,name){
		$scope.tabId=id;
		switch (id) {
			case 'all':
				delete $scope.filterObj.state;
				break;
			case 'invite':
				$scope.filterObj.state='1';
				break;
			case 'unsuit':
				$scope.filterObj.state='-1';
				break;
		}
	}
}])
'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('detailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    // console.log($stateParams.id)
    // console.log($stateParams.state)
    $http({
        method: 'get',
        url: 'data/position.json?id=' + $state.params.id,
        responseType: 'json'
    }).then(function(resp) {
        $scope.positionDetail = resp.data;
    }, function(resp) {
        console.log('请求失败！')
    });
    $http({
        method: 'get',
        url: 'data/company.json?id=' + $state.params.id,
        responseType: 'json'
    }).then(function(resp) {
        $scope.company = resp.data;
    }, function(resp) {
        console.log('请求失败！')
    });
    $scope.resume = '投个简历';
    var resumeFlag = false;
    // 点击‘投个简历’
    $scope.doResume = function() {
        if (resumeFlag == false) {
            $scope.resume = '已投递';
            $scope.resumeFlag = true;
        }
    }
    // 点击‘收藏’
    $scope.imgSrc='image/star.png';
    var collectFlag=false;
    $scope.doCollect=function(){
    	
        if (collectFlag == true) {
            $scope.imgSrc='image/star.png';
            collectFlag=false;
        } else if(collectFlag==false){
            $scope.imgSrc='image/star-active.png'
            collectFlag = true;
        }
    }
    // 点击‘去登录’
    $scope.doLogin=function(){
        $state.go('login');
    }
}]);

'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('loginCtrl', ['$scope','$http','$state','$rootScope', function($scope,$http,$state,$rootScope){
	$http({
		method:'get',
		url:'data/login.json',
		responseType:'json'
	}).then(function(resp){
		$scope.login=resp.data;
		// console.log(resp.data);
	},function(resp){
		console.log('请求失败！')
	});
	$scope.all=true;
	$scope.doLogin=function(){
		var count=localStorage.count;		for(var i=1;i<=count;i++){
			var user=localStorage.getItem("user"+i);
			user=user.split(",");
			if($scope.phone==user[0]&&$scope.pwd==user[1]){
				$rootScope.show=true;
				$state.go('main');
				return;
			}
		}
		$scope.all=false;
		$scope.allInfo="手机号或者密码错误！";	}
}])
'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('mainCtrl', ['$scope','$http','$stateParams','$state', function($scope,$http,$stateParams,$state){
	$http({
		method:'get',
		url:'data/positionList.json',
		responseType:'json'
	}).then(function(resp){
		$scope.mainList=resp.data;
	},function(resp){
		console.log('请求失败！')
	});
	$http({
		method:'get',
		url:'data/login.json',
		responseType:'json'
	}).then(function(resp){
		$scope.stateMessage=resp.data;
	}),function(resp){
		console.log('请求失败！')
	};
	$scope.doLogin=function(){
		$state.go('login');
	}
}]);
'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('meCtrl', ['$scope','$http','$rootScope','$state', function($scope,$http,$rootScope,$state){
	$http({
		method:'get',
		url:'data/positionList.json',
		responseType:'json'
	}).then(function(resp){
		$scope.positionList=resp.data;
	},function(resp){
		console.log('请求失败！')
	});
	$http({
		method:'get',
		url:'data/login.json',
		responseType:'json'
	}).then(function(resp){
		$scope.user=resp.data;
	},function(resp){
		console.log('请求失败！')
	});
	// 退出登录
	$scope.doExit=function(){
		$rootScope.show=false;
	}
}])
'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('registCtrl', ['$scope', '$http','$state', function($scope, $http,$state) {
    $http({
        method: 'get',
        url: 'data/regist.json',
        responseType: 'json'
    }).then(function(resp) {
        $scope.login = resp.data;
    }, function(resp) {
        console.log('请求失败！')
    });
    var phoneflag=false;
    var pwdflag=false;
    var codeflag=false;
    // 验证号码格式
    $scope.checkRegistPhone = function() {
        var regPhone = /^1\d{10}$/;
        if($scope.phone==''||$scope.phone==undefined){
            // input框内没有任何内容
        }else if (regPhone.test($scope.phone)) {
            // 验证用户是否已存在
            var count=localStorage.count;
            for(var i=1;i<=count;i++){
                var user=localStorage.getItem("user"+i);
                user=user.split(",");
                if($scope.phone==user[0]){
                    console.log('用户已存在');  
                    phoneflag=false;
                    $scope.all=false;
                    $scope.allInfo="用户已存在!";
                    $scope.phoneCheck = "❌";
                    return ;
                }
            }
            $scope.all=true;
            phoneflag=true;
            $scope.phoneCheck="✅";
        } else{
            phoneflag=false;
            $scope.phoneCheck = "❌";
        }
    }
    // 验证密码格式
    $scope.checkRegistPwd = function() {
        var regPwd = /^[0-9 a-z A-Z]{6,}$/;
        if($scope.pwd==''||$scope.pwd==undefined){
            // input框内没有任何内容
        }else if (regPwd.test($scope.pwd)) {
            $scope.all=true;
            pwdflag=true;
            $scope.pwdCheck = "✅";
        } else {
            pwdflag=false;
            $scope.pwdCheck = "❌";
        }
    }
    // 获取验证码
    var str;
    $scope.doSend = function() {
        str='';
        $scope.all=true;
        $scope.codeCheck="";
        for (var i = 1; i <= 4; i++) {
            var n = Math.floor(Math.random() * 10);
                str += n;
        }
        $scope.codeText=str;
    }
    // 验证注册信息并存储到本地
    $scope.all=true;
    $scope.checkRegistCode=function(){
        // 验证验证码是否正确
    	if($scope.codeText == str&& $scope.codeText!=undefined){
            $scope.all=true;
            codeflag=true;
    		$scope.codeCheck="✅";
    	}else{
            codeflag=false;
    		$scope.codeCheck="❌";
    	}
        // 验证所有注册信息是否正确
        if(phoneflag==true&&pwdflag==true&&codeflag==true){
            var count=localStorage.count;
            if(!count){
                count=1;
            }else{
                count++;
            }
            var user=[$scope.phone,$scope.pwd];
            localStorage.setItem("user"+count, user);
            localStorage.setItem("count",count);
            console.log(localStorage);
            $state.go('login');
        }else{
            $scope.all=false;
            $scope.allInfo="用户注册信息错误!";
        }
    }
}]);

'use strict';

// 后端交互 ajax 请求
angular.module('app').controller('searchCtrl', ['$scope', '$http','$rootScope', function($scope, $http,$rootScope) {
    $http({
        method: 'get',
        url: 'data/positionList.json',
        responseType: 'json'
    }).then(function(resp) {
        $scope.searchList = resp.data;
        // console.log(resp.data);
    }, function(resp) {
        console.log('请求失败！')
    });

    $scope.tabList=[{
        id:'city',
        name:'城市'
    },{
        id:'salary',
        name:'薪水'
    },{
        id:'scale',
        name:'公司规模'
    }];

    //点击tab选项时执行
   $scope.tabClick=function(id,name){ //city,城市   salary 薪水
    // console.log(id);
    $scope.selectList=$rootScope.selects[id]; //获取选择列表
    $scope.tabId=id; //当前选中tab的索引
    $scope.visible=true; //是否显示选择列表
   };

   //点击选择列表时执行
   $scope.filterObj=[]; //搜索条件，过滤对象
   $scope.selectClick=function(id,name){ //c1,南京  c2,上海  s1,3000以下
    $scope.visible=false;
     if(id){ //点击具体选择
        //设置搜索条件
        $scope.filterObj[$scope.tabId+'Id']=id; //cityId c1
        //修改tab选项中当前选中项的名称 
        angular.forEach($scope.tabList,function(item){
            if(item.id==$scope.tabId){
                item.name=name;
            }
        });
     }else{ //点击“全国”或"不限"
        delete $scope.filterObj[$scope.tabId+'Id'];
        //修改tab选项中当前选中项的名称 
        angular.forEach($scope.tabList,function(item){
            if(item.id==$scope.tabId){
                switch(item.id){
                    case 'city':
                        item.name='城市';
                        break;
                    case 'salary':
                        item.name='薪水';
                        break;
                    case 'scale':
                        item.name='公司规模';
                        break;      
                }
            }
        })
     }
   };
}])

'user strict';

angular.module('app').directive('appClassifyContent', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/classifyContent.html',
		link:function($scope){
			$scope.click = function(index){
				$scope.isActive = index;
				$scope.list = $scope.company.positionClass[index].positionList;
			}
			$scope.$watch('company',function(newValue){
				if(newValue){
					$scope.click(0);
				}
			})
		}
	};
}]);

'user strict';

angular.module('app').directive('appDeliverClassify', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		scope:{
			list:'=',//隔离作用域中，值是对象
			tabClick:'&',
			tabId:'='
		},
		templateUrl: 'view/template/deliverClassify.html',
	};
}])
'user strict';

angular.module('app').directive('appDetailContent', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/detailContent.html'
	};
}])
'user strict';

angular.module('app').directive('appDetailFooter', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/detailFooter.html'
	};
}])
'user strict';

angular.module('app').directive('appDetailHeader', [function () {
	return {
		scope:{
			title:'@appDetailHeader',
		},
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/detailHeader.html',
		link:function($scope){
			$scope.goBack=function(){
				window.history.go('-1');
			}
		}
	};
}]);
'user strict';

angular.module('app').directive('appFooter', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/footer.html'
	};
}])

'user strict';

angular.module('app').directive('appGrey', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/grey.html'
	};
}])
'user strict';

angular.module('app').directive('appHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head.html'
	};
}])

'user strict';

angular.module('app').directive('appLoginContent', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/loginContent.html'
	};
}])

'user strict';

angular.module('app').directive('appLoginedMe', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/loginedMe.html'
	};
}])

'user strict';

angular.module('app').directive('appMeContent', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/meContent.html'
	};
}])

'user strict';

angular.module('app').directive('appPositionCompany', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/positionCompany.html'
	};
}])
'user strict';

angular.module('app').directive('appPositionList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		scope:{
			list:'=',
			filterObj:'=',
			visible:'=',
			selectClick:'&',
			starImg:'=',
			doStar:'&'
		},
		templateUrl: 'view/template/positionList.html'
	};
}])

'user strict';

angular.module('app').directive('appRegistContent', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/registContent.html'
	};
}])
'user strict';

angular.module('app').directive('appSearchClass', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		scope:{
			selectList:'=',
			selectClick:'&',
			visible:'='
		},
		templateUrl: 'view/template/searchClass.html'
	};
}])

'user strict';

angular.module('app').directive('appSearchHead', [function () {
	return {
		scope:{
			title:'@appSearchHead',
		},
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/searchHead.html',
		link:function($scope){
			
		}
	};
}]);
'user strict';

angular.module('app').directive('appSearchList', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		scope:{
			list:'=',
			tabClick:'&',
			tabId:'='
		},
		templateUrl: 'view/template/searchList.html'
	};
}])

'use strict';

angular.module('app').filter('filterByObj',[function(){
	return function(data,filterObj){
		var result=[];

		angular.forEach(data,function(item){
			var flag=true;
			for(var index in filterObj){
				if(item[index]!=filterObj[index]){
					flag=false;
				}
			}

			if(flag){
				result.push(item);
			}
		});
		return result;
	}
}])