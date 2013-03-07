window.addEventListener("load", function() {

    var button = opera.contexts.toolbar.createItem({
        title:      'Reload CSS',
        icon:       'img/icon-18.png',
        onclick:    buttonClicked,
        badge: {
            display: "block",
            textContent: "",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,.3)"
        }
    });

	function buttonClicked() {
	  var tab = opera.extension.tabs.getFocused();
      if (tab) { // Null if the focused tab is not accessible by this extension
        tab.postMessage('reload');
      }
	}

    function handleMessages (event) {
        //console.log('ONMESSAGE: '+ event.data);
        if (typeof event.data === 'object'){
            switch(event.data.type){
                case 'linksCount':
                    handleCount(event);
                    break;
            }
        }
    }

    function handleCount(e) {
        if (e.data.data) {
            setBadge(e.data.data)
        }
        setTimeout(function(){
            setBadge('')
        }, 3000)
    }

    function setBadge(txt) {
        txt = txt || '';
        var badge = button.badge;
        badge.textContent = txt;
    }

    function init(){
        opera.contexts.toolbar.addItem(button);
        opera.extension.onmessage = handleMessages;
    }

    init();

}, false);
