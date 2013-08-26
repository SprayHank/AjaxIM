// Automatically load dependencies, in order, if they aren't already loaded.
// Each array is: [filename, deptest] where deptest is the function to
// test for the dependency.
var AjaxIM, AjaxIMLoadedFunction, AjaxIMENV;
(function() {
	AjaxIM = {};
	AjaxIM.loaded = function(f) {
		AjaxIMLoadedFunction = f;
	};
	AjaxIMENV = {
		jQuery: null,
		Sizzle: null
	};
	//console.log(haveRequirejs);

	var tagsrc =
		(thistag = document.getElementsByTagName('script'))[thistag.length - 1].src;
	var jsfolder = tagsrc.replace(/im.load.js([?].+)?/, '');
	var imfolder = jsfolder.replace(/js\/$/, '');

	var nodehost = '';

	//储存全局对象
	var _jQuery = window['jQuery'], _Sizzle = window['Sizzle'];

	var dependencies = [
		['jquery', function (jQuery){
			!jQuery && (jQuery = window['jQuery']);
			window['jQuery'] = jQuery.noConflict();
		}, 'undefined', 'jQuery'],
		['jquery.jsonp', function(){}, 'undefined', 'JSONP'],
		['jquery.jstore-all-min', function(){}, 'undefined', 'jStore'],
		['jquery.md5', function(){}, 'undefined', 'md5'],
		['sizzle', function(Sizzle){
			!Sizzle && (Sizzle = window['Sizzle']);
			window['Sizzle'] = Sizzle;
			AjaxIMENV.jQuery = window['jQuery'], window['jQuery'] = _jQuery;
			AjaxIMENV.Sizzle = window['Sizzle'], window['Sizzle'] = _Sizzle;
			typeof window['jQuery'] === 'undefined' && delete window['jQuery'];
			typeof window['Sizzle'] === 'undefined' && delete window['Sizzle'];
		}, 'undefined', 'Sizzle'],
		['im', function(){window['AjaxIM']}, 'object', 'AjaxIM']
	];


	var loadAndAction = function(env, action) {
		!action && (action = function() {});
		var newdep = document.createElement('script');
		newdep.type = 'text/javascript';
		newdep.src = jsfolder + env + '.js';
		newdep.onload = function() {
			action();
		};
		newdep.onreadystatechange = function() {
			if(/loaded|complete/.test(this.readyState)) {
				action();
			}
		};
		var head = (document.getElementsByTagName('head')[0] || document.documentElement);
		head.appendChild(newdep);
	}

	var init = function() {
		if(tagsrc.match(/[?]php$/)) {
			AjaxIM.init({
				pollServer: imfolder + 'ajaxim.php',
				theme: imfolder + 'themes/default',
				flashStorage: jsfolder + 'jStore.Flash.html'
			});
		} else if(tagsrc.match(/[?]node$/)) {
			AjaxIM.init({
				pollServer: imfolder + 'ajaxim.php',
				theme: imfolder + 'themes/default',
				flashStorage: jsfolder + 'jStore.Flash.html'
			}, {
				poll: 'http://' + nodehost + '/poll',
				send: 'http://' + nodehost + '/send',
				status: 'http://' + nodehost + '/status',
				resume: 'http://' + nodehost + '/resume'
			});
		} else if(tagsrc.match(/[?]guest$/)) {
			AjaxIM.init({
				pollServer: imfolder + 'ajaxim.php',
				theme: imfolder + 'themes/default',
				flashStorage: jsfolder + 'jStore.Flash.html'
			}, {
				poll: 'http://' + nodehost + '/poll',
				send: 'http://' + nodehost + '/send',
				status: 'http://' + nodehost + '/status',
				resume: 'http://' + nodehost + '/resume'
			});
			AjaxIM.client.login();
		}

		AjaxIM.loaded();
	};

	var isOldIE = !-[1, ];

	if(typeof define === "function" && define.amd) {
		require.config({
			baseUrl: jsfolder,
			paths: {
				jquery: 'jquery-' + (isOldIE ? 'i' : 'n') + 'e'
			}
		});
	}

	(loadDep = function(depPos) {
		if(depPos >= dependencies.length) {
			//还原全局对象
			init();
			return;
		}
		var dep = dependencies[depPos];
		if(typeof define === "function" && define.amd) {
			require([dep[0]], function(v){
				dep[1](v);
				loadDep(depPos + 1);
			});
			/*
			 require([dep[0]], function(v) {
			 AjaxIMENV[dep[3]] = v;
			 loadDep(depPos + 1);
			 }, function(err) {
			 //The errback, error callback
			 //The error has a list of modules that failed
			 //console.log(err);
			 var failedId = err.requireModules && err.requireModules[0];
			 console.log(failedId);
			 requirejs.undef(failedId);
			 require([jsfolder + dep[0] + '.js'], function(v) {
			 AjaxIMENV[dep[3]] = v;
			 loadDep(depPos + 1);
			 });
			 });
			 */
		} else {
			loadAndAction(dep[0], function() {
				dep[1]();
				loadDep(depPos + 1);
			});
		}
	})(0);


})();
