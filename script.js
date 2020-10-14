const {location,console,alert} = window;
const searchFnObj = {
	async vivaldi(q,data) {
		'use strict';
		data=data||await(await fetch('vivaldi_x-search-engine.json')).json();
		var [,keyword,q]=q.match(/([^ ]+) ?(.+)?/);

		let search = data.engines.filter(a=>a.keyword===keyword);
		if (1<search.length) throw {message:'more then 1 search keyword matched',search,keyword};
		else if(search.length!==1) return 'not found';
		search=search[0];


		console.log(1);
		location.replace(search.url.replace(/%S/gis,q));
		return true;
	},
	duckduckgoBangs(q,data){
		throw {message:'TODO!'};
	},
	duckduckgo(q,data){
		'use strict';
		
		console.log(2);
		location.replace('https://duckduckgo.com/?q='+encodeURIComponent(q));
		return true;
	}
};
void async function(){
	'use strict';
	
	try{
		let q = decodeURIComponent(location.hash.substr(1));
		if(!q) throw {message:`usage: ${location.href.replace(/#|$/,'#')}QUERY (v2)`};

		for (let i of ['vivaldi','duckduckgo']) if (await searchFnObj[i](q)) break;


	} catch (e) {console.error(e);alert(e.message||'Error ocured, check console')};




}()
