import {eventsData} from 'services/eventsData';
import {jobs, states, jobTypes, jobSkills} from 'services/jobsData';
import moment from 'moment';
import {BindingSignaler} from 'aurelia-templating-resources';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {NotificationPayload} from 'common/NotificationPayload';

function filterAndFormat(pastOrFuture, events) {
  var results = JSON.parse(JSON.stringify(events));
  if(pastOrFuture == 'past') {
    results = results.filter(item => moment(item.dateTime) < moment());
  } else if(pastOrFuture == 'future') {
    results = results.filter(item => moment(item.dateTime) > moment());
  } else {
    results = results;
  }

  return results;
}

@inject(BindingSignaler, EventAggregator)
export class DataRepository {
    constructor(bindingSignaler, eventAggregator) {
      this.eventAggregator = eventAggregator;
      setInterval(()=> {bindingSignaler.signal('check-freshness')}, 1000);
      setTimeout(() => this.backgroundNotificationReceived(this.eventAggregator), 5000);
    }

    backgroundNotificationReceived(eventAggregator) {
      eventAggregator.publish(new NotificationPayload(moment().format("HH:mm:ss")));
    }

    getEvents(pastOrFuture) {
      var promise = new Promise((resolve, reject) => {
        if(!this.events) {
          setTimeout(()=> {
            this.events = eventsData.sort((a,b)=> a.dateTime >= b.dateTime ? 1 : -1);
            resolve(filterAndFormat(pastOrFuture, this.events));
        }, 10);
        } else {
          resolve(filterAndFormat(pastOrFuture, this.events));
        }
      });
      return promise;
    }

    getEvent(eventId) {
      return this.events.find(item => item.id == eventId);
    }

    addJob(job) {
        var promise = new Promise((resolve, reject) => {
            this.jobs.push(job);
            resolve(job);
        });
        return promise;
    }

    getJobs() {
        var promise = new Promise((resolve, reject) => {
            if(!this.jobs) {
                this.jobs = jobs;
            }
            resolve(this.jobs);
        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve, reject) => {
            if(!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve, reject) => {
            if(!this.jobTypes) {
                this.jobTypes = jobTypes;
            }
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve, reject) => {
            if(!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}
