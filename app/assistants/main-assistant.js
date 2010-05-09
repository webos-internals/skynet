function MainAssistant() {
    // subtitle random list
    this.randomSub = 
	[
	 {weight: 30, text: $L('Open Source Networking')},
	 {weight: 15, text: $L('Hasta La Vista, Baby')},
	 {weight:  2, text: $L('Random Taglines Are Awesome')},
	 {weight:  2, text: $L('We Know Palm Loves SkyNet')},
	 {weight:  2, text: $L('Now With More Cowbell')}
	 ];

    // setup list model
    this.mainModel = {items:[]};

    // setup menu
    this.menuModel =
    {
	visible: true,
	items:
	[
    {
	label: $L("Preferences"),
	command: 'do-prefs'
    },
    {
	label: $L("Help"),
	command: 'do-help'
    }
	 ]
    };
}

MainAssistant.prototype.setup = function() {
	
    // set theme because this can be the first scene pushed
    this.controller.document.body.className = prefs.get().theme;
	
	
    this.controller.get('main-title').innerHTML = $L('SkyNet');
    this.controller.get('version').innerHTML = $L('v0.0.0');
    this.controller.get('subTitle').innerHTML = $L('Open Source Networking');	

    // get elements
    this.versionElement =  this.controller.get('version');
    this.subTitleElement = this.controller.get('subTitle');
    this.listElement =     this.controller.get('mainList');

    // handlers
    this.listTapHandler =		this.listTap.bindAsEventListener(this);
	
    this.versionElement.innerHTML = "v" + Mojo.Controller.appInfo.version;
    this.subTitleElement.innerHTML = this.getRandomSubTitle();

    // setup menu
    this.controller.setupWidget(Mojo.Menu.appMenu, { omitDefaultItems: true }, this.menuModel);
	
    this.mainModel.items.push({
	    name:     $L('Something'),
		style:    'disabled',
		// scene:    'something',
		});
    
    // setup widget
    this.controller.setupWidget('mainList', { itemTemplate: "main/rowTemplate", swipeToDelete: false, reorderable: false }, this.mainModel);
    this.controller.listen(this.listElement, Mojo.Event.listTap, this.listTapHandler);
};

MainAssistant.prototype.listTap = function(event)
{
    if (event.item.scene === false || event.item.style == 'disabled') {
	// no scene or its disabled, so we won't do anything
    }
    else {
	// push the scene
	this.controller.stageController.pushScene(event.item.scene, event.item);
    }
};

MainAssistant.prototype.updateList = function()
{
    // this.mainModel.items[0].style = 'showCount';
    this.listElement.mojo.noticeUpdatedItems(0, this.mainModel.items);
};
    
MainAssistant.prototype.getRandomSubTitle = function()
{
	// loop to get total weight value
	var weight = 0;
	for (var r = 0; r < this.randomSub.length; r++)
	{
		weight += this.randomSub[r].weight;
	}
	
	// random weighted value
	var rand = Math.floor(Math.random() * weight);
	//alert('rand: ' + rand + ' of ' + weight);
	
	// loop through to find the random title
	for (var r = 0; r < this.randomSub.length; r++)
	{
		if (rand <= this.randomSub[r].weight)
		{
			return this.randomSub[r].text;
		}
		else
		{
			rand -= this.randomSub[r].weight;
		}
	}
	
	// if no random title was found (for whatever reason, wtf?) return first and best subtitle
	return this.randomSub[0].text;
}

MainAssistant.prototype.handleCommand = function(event)
{
	if (event.type == Mojo.Event.command)
	{
		switch (event.command)
		{
			case 'do-prefs':
				this.controller.stageController.pushScene('preferences');
				break;
	
			case 'do-help':
				this.controller.stageController.pushScene('help');
				break;
		}
	}
}

MainAssistant.prototype.activate = function(event) {
    // for (var i = 0; i < this.mainModel.items.length; i++) {
    // this.mainModel.items[i].style = 'disabled';
    // }
    // this.listElement.mojo.noticeUpdatedItems(0, this.mainModel.items);
    var appController = Mojo.Controller.getAppController();
    appController.showBanner({ messageText: "SkyNet is ready ..." }, {}, "initSkyNet");
};

MainAssistant.prototype.deactivate = function(event) {
    /* remove any event handlers you added in activate and do any other cleanup that should happen before
       this scene is popped or another scene is pushed on top */
};

MainAssistant.prototype.cleanup = function(event) {
    /* this function should do any cleanup needed before the scene is destroyed as 
       a result of being popped off the scene stack */
    this.controller.stopListening(this.listElement, Mojo.Event.listTap, this.listTapHandler);
};
