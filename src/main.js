import 'bootstrap';

export function configure(aurelia){
  aurelia.use.globalResources('common/dateFormat');
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-dialog')
    .plugin('aurelia-validation');
  aurelia.start().then(a=>a.setRoot("shell"));
}
