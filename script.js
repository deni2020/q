console.log(123)
// alert(123)
const se = {
	vivaldi(q,data) {
		"use strict";

		let firstSpaceIndex = q.indexOf(' ');
		if (firstSpaceIndex===-1) firstSpaceIndex=q.length;

		let keyword=q.substr(0,firstSpaceIndex);
		q=q.substr(firstSpaceIndex+1);

		let search = data.engines.filter(a=>a.keyword===keyword);
		if (1<search.length) throw {message:'more then 1 search keyword matched',search,keyword};
		else  if(search.length!==1) return 'not found';
		search=search[0];


	    console.log(1);
		location.replace(search.url.replace(/%S/gis,q));
	},
	duckduckgoBangs(q,data){
		throw {message:'TODO!'};
	},
	duckduckgo(q,data){
	    console.log(2);
		location.replace('https://duckduckgo.com/?q='+encodeURIComponent(q));
	}
};
void async function(){
	"use strict";
	try{
		let q = decodeURIComponent(location.hash.substr(1));
		if(!q) throw {message:`usage: ${location.href.replace(/#|$/,'#')}QUERY (v2)`};

		let data = {
			vivaldi: await(await fetch('vivaldi_x-search-engine.json')).json()
		};

		for (let i of ['vivaldi','duckduckgo']) se[i](q,data[i]);


	} catch (e) {window.console.error(e);window.alert(e.message||'Error ocured, check console')}




}()
