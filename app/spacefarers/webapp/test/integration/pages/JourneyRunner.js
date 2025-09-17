sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"sap/galaxy/spacefarers/test/integration/pages/SpacefarersList",
	"sap/galaxy/spacefarers/test/integration/pages/SpacefarersObjectPage"
], function (JourneyRunner, SpacefarersList, SpacefarersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('sap/galaxy/spacefarers') + '/test/flp.html#app-preview',
        pages: {
			onTheSpacefarersList: SpacefarersList,
			onTheSpacefarersObjectPage: SpacefarersObjectPage
        },
        async: true
    });

    return runner;
});

