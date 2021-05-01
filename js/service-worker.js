self.addEventListener("install", function(event){
	console.log("Service Worker installing.");
	self.skipWaiting();
});

self.addEventListener("activate", function(event){
	console.log("Service Worker activating.");
});

self.addEventListener("fetch", function(event){
	console.log("Service Worker fetching.");
	console.log("Fetch:",event.request.url);
});

self.addEventListener('push', function(event) {
	console.log('[Service Worker] Push Received.');
	console.log(event);
	// var notificationText = "You Got New Message!";
	// if(event.data){
	//  notificationText = event.data.text();
	// }

	// const title = 'DY Chat Machine';
	// const options = {
	// 	body: notificationText,
	// 	icon: 'images/icons/icon-128x128.png',
	// };

	// event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) { //What happens when clicked on Notification
	console.log('[Service Worker] Notification click Received.');

	// event.notification.close();

	// event.waitUntil(
	// 	clients.openWindow('http://localhost:8887')
	// );
});

self.addEventListener('message', event => {
  console.log('[Service Worker] Message Received.');
//   console.log(event.data);
//   event.ports[0].postMessage("Returning Value: " + event.data);

});


