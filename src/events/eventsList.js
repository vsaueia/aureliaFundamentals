import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';
import {Router, activationStrategy} from 'aurelia-router';

@inject(DataRepository, Router)
export class EventsList {
	constructor(dataRepository, router) {
		this.dataRepository = dataRepository;
		this.router = router;
		this.whoareyou = "Luke Im your father";
	}

	activate(params, routeConfig) {
		var pastOrFuture = routeConfig.name == '' ? 'future' : routeConfig.name;
		return this.dataRepository.getEvents(pastOrFuture).then(events => {
			  if(params.speaker || params.topic) {
					var filteredResults = [];
					events.forEach(item => {
						if(params.speaker && item.speaker.toLowerCase().indexOf(params.speaker.toLowerCase()) > -1) {
							filteredResults.push(item);
						}
						if(params.topic && item.title.toLowerCase().indexOf(params.topic.toLowerCase()) > -1) {
							filteredResults.push(item);
						}
					});
					this.events = filteredResults;
				} else {
					this.events = events;
				}

				this.events.forEach(item => {
					item.detailUrl = this.router.generate('eventDetail', {eventId: item.id});
				});
			});
	}

	determineActivationStrategy() {
		return activationStrategy.invokeLifecycle;
	}
}
