import { observable, action } from 'mobx';

class StateStore {
  @observable installDash = false;
  @observable movePic = false;

  @action setInstallDash(installDash: boolean): void {
    this.installDash = installDash;
  }

  @action setMovePic(movePic: boolean): void {
    this.movePic = movePic;
  }
  
}

const stateStore = new StateStore();
export default stateStore;
