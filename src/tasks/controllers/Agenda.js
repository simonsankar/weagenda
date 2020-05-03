import {Controller} from '../../controller';
import {getTasksByDate} from '../model/selectors';

export default class AgendaController extends Controller {
  // get items() {
  //   return getTasksByDate(state.tasks, new Date());
  // }

  //in order to use reselector I had to override the configureState function of the controller
  configureState(state) {
    return {
      items: getTasksByDate(state.tasks, new Date()),
    };
  }
}
