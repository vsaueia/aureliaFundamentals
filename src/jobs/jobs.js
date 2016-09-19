export class Jobs{
  canActivate(params, routeConfig, navigationInstruction) {
    var promise = new Promise((resolve, reject) => {
      setTimeout(_ => {
        resolve(true);
      }, 3000);
    });
    return promise;
  }
}
