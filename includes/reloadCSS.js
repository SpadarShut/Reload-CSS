window.addEventListener('DOMContentLoaded', function(event) {
	
	function reloadCSS (){
		var h, f, l;
		var a = document.getElementsByTagName('link');
        var l = a.length;
		var sl = 0;

		for (h=0; h<l; h++){
			f=a[h];
			if(f.rel.toLowerCase().match(/stylesheet/)&&f.href){
				sl++;
				var g = f.href.replace(/(&|%5C?)forceReload=\d+/,'');
				f.href = g+(g.match(/\?/)?'&':'?')+'forceReload='+(new Date().valueOf())
			}
        }
        if (sl) {
            mes({ type: 'linksCount', data: sl })
        }
	}
		
	function handleMessaging (event) {
        switch (event.data) {
            case 'reload'   : reloadCSS();
                break;
        }
    }

    function mes(mes){
        opera.extension.postMessage(mes);
    }
	
	opera.extension.onmessage = handleMessaging;
})