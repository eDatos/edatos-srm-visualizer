var showCaptcha = function () {	
	return;
};

var showCaptchaWithButton = function (request, url, options) {	
	return requestWithCaptcha(request, url, options);
};

var sendRequestWithCaptcha = function(request, baseUrl, recaptchaToken, action) {
    var url = new URL(baseUrl);
	if(isCaptchaEnabled()) {
	    url.searchParams.set('userValue', recaptchaToken);
		if(action) {
			url.searchParams.set('captchaAction', action);			
		}
	}
    return request(url.href);
};

var isCaptchaEnabled = function() {
	return true;
};

var requestWithCaptcha = function(request, url, options) {
    return new Promise((resolve, reject) => {
		if(isCaptchaEnabled()) {			
			grecaptcha.ready(function() {
				grecaptcha.execute(("6LeK1dcbAAAAAD-UW5qQc-VrHJbsVHgxc2Jer-IR"), options.action ? {action: options.action} : {}).then(function(token) {
					sendRequestWithCaptcha(request, url, token, options.action).then(function (response) {
			            resolve(response);
			        }).catch(function (error) {
						reject(error);
					});
				});
			});
		} else {
			sendRequestWithCaptcha(request, url).then(function (response) {
	            resolve(response);
	        }).catch(function (error) {
				reject(error);
			});
		}
    });
}

if(isCaptchaEnabled()) {
	var recaptchaScript = document.createElement("script");
	recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=" + ("6LeK1dcbAAAAAD-UW5qQc-VrHJbsVHgxc2Jer-IR");
	document.head.appendChild(recaptchaScript);	
}