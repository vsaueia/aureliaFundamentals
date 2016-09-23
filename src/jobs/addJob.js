import {inject} from 'aurelia-framework';
import {DataRepository} from 'services/dataRepository';
import {Validation} from 'aurelia-validation';

@inject(DataRepository, Validation)
export class AddJob {
	constructor(dataRepository, validation) {
		this.job = {jobType: 'Full Time', jobSkills: []};
		this.dataRepository = dataRepository;
		this.dataRepository.getStates().then(states => {
			this.states = states;
		});
		this.dataRepository.getJobTypes().then(jobTypes => {
			this.jobTypes = jobTypes;
		});
		this.dataRepository.getJobSkills().then(jobSkills => {
			this.jobSkills = jobSkills;
		});
		this.validation = validation.on(this)
		  .ensure('job.title').isNotEmpty().hasMinLength(3);
	}

	activate(params, routeConfig, navigationInstruction) {
		this.router = navigationInstruction.router;
	}

	save() {
		this.validation.validate().then(() => {
			if(this.job.needDate) {
				this.job.needDate = new Date(this.job.needDate);
			}
			this.dataRepository.addJob(this.job).then(job=>this.router.navigateToRoute('jobs'));
		});
	}
}
