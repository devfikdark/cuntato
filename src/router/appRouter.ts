import { appController } from '../controllers/appController';

export class appRouter {
  public appController: appController = new appController();

  public router(app): void {
    /*** Get Request ***/
    app.get('/project-data', this.appController.getFromData);
    app.get('/get-project-count', this.appController.getProjectCount);
    app.get('/get-project-list', this.appController.getProjectList);
    app.get('/get-project-domain', this.appController.getProjectDomain);


    /*** Post Request ***/
    app.post('/project-data', this.appController.postFromData);
    app.post('/get-project-token', this.appController.getProjectToken);
    app.post('/update-domain-url', this.appController.updateURL);
  }
}