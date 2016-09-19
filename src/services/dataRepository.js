import {eventsData} from 'services/eventsData';
import moment from 'moment';

export class DataRepository {
    constructor() {
    }

    getEvents() {
      var promise = new Promise((resolve, reject) => {
        if(!this.events) {
          setTimeout(()=> {
            this.events = eventsData;
            var sorted = this.events.sort((a,b)=> a.dateTime >= b.dateTime ? 1 : -1);
            this.events = sorted;
            this.events.forEach(item => {
              var dateTime = moment(item.dateTime).format("MM/DD/YYYY HH:mm");
              item.dateTime = dateTime;
            });
            resolve(this.events);
          }, 2000);
        } else {
          resolve(this.events);
        }

      });
      return promise;
    }

    getEvent(eventId) {
      return this.events.find(item => item.id == eventId);
    }
}
