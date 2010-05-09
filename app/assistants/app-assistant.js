// get the cookies
var prefs = new preferenceCookie();
var vers =  new versionCookie();

// stage names
var mainStageName = 'skynet-main';
var dashStageName = 'skynet-dash';

function AppAssistant() {}

AppAssistant.prototype.handleLaunch = function(params)
{
    var mainStageController = this.controller.getStageController(mainStageName);
	
    try {
	if (!params) {
	    if (mainStageController) {
		mainStageController.popScenesTo('main');
		mainStageController.activate();
	    }
	    else {
		this.controller.createStageWithCallback({name: mainStageName, lightweight: true},
							this.launchFirstScene.bind(this));
	    }
	}
    }
    catch (e) {
	Mojo.Log.logException(e, "AppAssistant#handleLaunch");
    }
};

AppAssistant.prototype.launchFirstScene = function(controller)
{
    vers.init();
    if (vers.showStartupScene()) {
	controller.pushScene('startup');
    }
    else {
	controller.pushScene('main');
    }
};

AppAssistant.prototype.cleanup = function() {
};
