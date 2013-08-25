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
		Sizzle: null,
		JSONP: null,
		jStore: null,
		md5: null,
		AjaxIM: null
	};
	var haveRequirejs = (
		typeof define === "function" &&
			define.amd &&
			typeof window['require'] !== 'undefined' &&
			typeof window['requirejs'] !== 'undefined' &&
			require === requirejs
		);
	//console.log(haveRequirejs);

	var tagsrc =
		(thistag = document.getElementsByTagName('script'))[thistag.length - 1].src;
	var jsfolder = tagsrc.replace(/im.load.js([?].+)?/, '');
	var imfolder = jsfolder.replace(/js\/$/, '');

	var nodehost = '';

	var dependencies = [
		['jquery', window['jQuery'], 'undefined', 'jQuery'],
		['sizzle', window['Sizzle'], 'undefined', 'Sizzle'],
		['jquery.jsonp', window['jsonp'], 'undefined', 'JSONP'],
		['jquery.jstore-all-min', window['jstore'], 'undefined', 'jStore'],
		['jquery.md5', window['md5'], 'undefined', 'md5'],
		['im', window['AjaxIM'], 'object', 'AjaxIM']
	];

	var head = document.getElementsByTagName('head')[0];

	(loadDep = function(depPos) {
		if(depPos >= dependencies.length) {
			init();
			return;
		}
		var dep = dependencies[depPos];

		if(haveRequirejs) {
			/*require([dep[0]], function(v) {
				AjaxIMENV[dep[3]] = v;
				loadDep(depPos + 1);
			}, function(err) {
				//The errback, error callback
				//The error has a list of modules that failed
				//console.log(err);
				var failedId = err.requireModules && err.requireModules[0];
				//console.log(failedId);
				requirejs.undef(failedId);
				require([jsfolder + dep[0] + '.js'], function(v) {
					AjaxIMENV[dep[3]] = v;
					loadDep(depPos + 1);
				});
			});*/
		} else {
			if(typeof dep[1] === dep[2]) {
				var newdep = document.createElement('script');
				newdep.type = 'text/javascript';
				newdep.src = jsfolder + dep[0] + '.js';
				newdep.onload = function() {
					AjaxIMENV[dep[3]] = dep[1];
					loadDep(depPos + 1);
				};
				newdep.onreadystatechange = function() {
					if(/loaded|complete/.test(this.readyState)) {
						AjaxIMENV[dep[3]] = dep[1];
						loadDep(depPos + 1);
					}
				};
				head.appendChild(newdep);
			} else {
				AjaxIMENV[dep[3]] = dep[1];
				loadDep(depPos + 1);
			}
		}
	})(0);

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
})();
