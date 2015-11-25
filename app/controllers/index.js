
$.index.open();

var intent = Titanium.Android.createServiceIntent({
	url : 'androidBGService.js'
});
intent.putExtra('interval', 5000);
androidBGService = Titanium.Android.createService(intent);
androidBGService.start();




