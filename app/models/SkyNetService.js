SkyNetService.identifier = 'palm://org.webosinternals.skynet';

function SkyNetService() {
    this.log = '';
    this.logNum = 1;
}

SkyNetService.version = function(callback) {
    var request = new Mojo.Service.Request(SkyNetService.identifier, {
	    method: 'version',
	    onSuccess: callback,
	    onFailure: callback
	});
    return request;
};

SkyNetService.logClear = function() {
    this.log = '';
    this.logNum = 1;
};

SkyNetService.logPayload = function(payload, stage) {
    if (payload.stage || stage) {
	this.log += '<div class="container '+(this.logNum%2?'one':'two')+'">';
		
	if (payload.stage) this.log += '<div class="title">' + payload.stage + '</div>';
	else if (stage) this.log += '<div class="title">' + stage + '</div>';
		
	var stdPlus = false;
		
	if (payload.errorCode || payload.errorText) {
	    stdPlus = true;
	    this.log += '<div class="stdErr">';
	    this.log += '<b>' + payload.errorCode + '</b>: ';
	    this.log += payload.errorText;
	    this.log += '</div>';
	}
		
	if (payload.stdOut && payload.stdOut.length > 0) {
	    stdPlus = true;
	    this.log += '<div class="stdOut">';
	    for (var s = 0; s < payload.stdOut.length; s++) {
		this.log += '<div>' + payload.stdOut[s] + '</div>';
	    }
	    this.log += '</div>';
	}
		
	if (payload.stdErr && payload.stdErr.length > 0) {
	    stdPlus = true;
	    this.log += '<div class="stdErr">';
	    for (var s = 0; s < payload.stdErr.length; s++) {
		this.log += '<div>' + payload.stdErr[s] + '</div>';
	    }
	    this.log += '</div>';
	}
	
	if (!stdPlus) {
	    this.log += $L("<div class=\"msg\">Nothing Interesting.</div>");
	}
		
	this.log += '</div>';
	this.logNum++;
    }
    /*
    // debug display
    alert('--- IPKG Log ---');
    for (p in payload) {
        alert(p + ': ' + payload[p]);
    }
    */
};
