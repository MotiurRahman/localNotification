function getCurrentLocation() {
	if (!Ti.Geolocation.getLocationServicesEnabled()) {
		alert('Location Services are not enabled');
	} else {

		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
		Ti.Geolocation.distanceFilter = 10;
		Ti.Geolocation.addEventListener('location', function listener(_location) {

			// remove event handler since event was received
			Ti.Geolocation.removeEventListener('location', listener);

			// process the results
			if (!_location.error && _location && _location.coords) {

				checkDischargeLocation(_location);

			} else {
				alert('Location Services Error: ' + _location.error);
			}
		});
	}
};
getCurrentLocation();

/*
 * if user is one mile away from hospital, send local notification.
 */
function checkDischargeLocation(e) {
	//send local notification
	console.log("send local notification");
	sendLocalNotification();
}

function sendLocalNotification() {
	// Intent object to launch the application
	var intent = Ti.Android.createIntent({
		action : Ti.Android.ACTION_MAIN,
		className : 'com.localNotification.localNotificationActivity',
		packageName : 'com.localNotification',
	});
	intent.flags |= Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP;
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);

	// Create a PendingIntent to tie together the Activity and Intent
	var pending = Ti.Android.createPendingIntent({
		activity : Ti.Android.currentActivity,
		intent : intent,
		type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
		flags : Ti.Android.FLAG_UPDATE_CURRENT
	});

	function value() {
		return Math.floor((Math.random() * 10) + 1).toString();
	}

	// Create the notification
	var notification = Titanium.Android.createNotification({
		contentTitle : value(),
		contentText : 'Just another notification',
		contentIntent : pending,
		icon : Ti.Android.R.drawable.btn_star,
		when : new Date(),
		defaults : Titanium.Android.NotificationManager.DEFAULT_SOUND,

	});

	// Send the notification.
	Ti.Android.NotificationManager.notify(1, notification);
}
