import 'bootstrap';

export function configure(aurelia){
  aurelia.use.globalResources('common/dateFormat');
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-dialog');
  aurelia.start().then(a=>a.setRoot("shell"));
}
