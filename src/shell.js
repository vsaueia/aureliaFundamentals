import toastr from 'toastr';
import moment from 'moment';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NotificationPayload} from 'common/NotificationPayload';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class Shell {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.eventAggregator.subscribe(NotificationPayload, payload => {
			this.notification = payload.time;
		});

		setInterval(()=>this.timeIs = moment().format('hh:mm:ss.SSS'), 100);
	}

	clearNotification() {
		this.notification = null;
	}

	configureRouter(config, router) {
		this.router = router;
		config.title = "Palmeiras SEP";
		//config.addPipelineStep('modelbind', ToastNavResult);
		config.map([
				{ route: ['', 'events'],
					viewPorts:{
							mainContent: {moduleId: 'events/events'},
							sideBar:{moduleId: 'sideBar/sponsors'}
					}, name: 'Events', title: 'Events', nav: true },
				{ route: 'jobs', viewPorts:{
						mainContent: {moduleId: 'jobs/jobs'},
						sideBar:{moduleId: 'sideBar/sponsors'}
				}, name: 'jobs', title: 'Jobs', nav: true },
				{ route: 'discussion', viewPorts:{
						mainContent: {moduleId: 'discussion/discussion'},
						sideBar:{moduleId: 'sideBar/ads'}
				},title: 'Discussion', nav: true },
				{ route: 'eventDetail/:eventId',viewPorts:{
						mainContent: {moduleId: 'events/eventDetail'},
						sideBar:{moduleId: 'sideBar/ads'}
				} , name: 'eventDetail'},
				{ route: 'addJob', name: 'addJob', viewPorts: {
					mainContent: {moduleId: 'jobs/addJob'}, sideBar:{moduleId: 'sideBar/sponsors'}
				}}
			]);
	}
}

// class ToastNavResult {
// 	run(navigationInstruction, next) {
// 		return next().then(a => {toastr.info(a.status); return a;});
// 	}
// }
