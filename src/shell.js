import toastr from 'toastr';

export class Shell {
	constructor() {
	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "Palmeiras SEP";
		config.addPipelineStep('modelbind', ToastNavResult);
		config.map([
				{ route: ['', 'events'],
					viewPorts:{
							mainContent: {moduleId: 'events/events'},
							sideBar:{moduleId: 'sideBar/sponsors'}
					}, name: 'Events', title: 'Events', nav: true },
				{ route: 'jobs', viewPorts:{
						mainContent: {moduleId: 'jobs/jobs'},
						sideBar:{moduleId: 'sideBar/sponsors'}
				}, name: 'Jobs', title: 'Jobs', nav: true },
				{ route: 'discussion', viewPorts:{
						mainContent: {moduleId: 'discussion/discussion'},
						sideBar:{moduleId: 'sideBar/ads'}
				},title: 'Discussion', nav: true },
				{ route: 'eventDetail/:eventId',viewPorts:{
						mainContent: {moduleId: 'events/eventDetail'},
						sideBar:{moduleId: 'sideBar/ads'}
				} , name: 'eventDetail'}
			]);
	}
}

class ToastNavResult {
	run(navigationInstruction, next) {
		return next().then(a => {toastr.info(a.status); return a;});
	}
}
