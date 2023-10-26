import { parse, isToday, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';
import caricaPagina from './manipolazioneDOM';

const filtriDate = (() => {
    function isTodoToday(todo) {
        const dataScadenza = parse(todo.dataScadenza, 'yyyy-MM-dd', new Date());
        return isToday(dataScadenza);
      }
      
    function isTodoThisWeek(todo) {
        const dataScadenza = parse(todo.dataScadenza, 'yyyy-MM-dd', new Date());
        const inizioSettimana = startOfWeek(new Date());
        const fineSettimana = endOfWeek(new Date());
        return isWithinInterval(dataScadenza, { start: inizioSettimana, end: fineSettimana });
    }

    function mostraTodoOggiEsettimana(progetti) {
        const dataOggi = new Date();
        const inizioSettimana = startOfWeek(dataOggi);
        const fineSettimana = endOfWeek(dataOggi);
      
        for (let id = 0; id < progetti.length; id++) {
          for (let todoId = 0; todoId < progetti[id].todos.length; todoId++) {
            const todo = progetti[id].todos[todoId];
            const dataScadenza = parse(todo.data, 'yyyy-MM-dd', new Date());
      
            if (isToday(dataScadenza) || isWithinInterval(dataScadenza, { start: inizioSettimana, end: fineSettimana })) {
              caricaPagina.inserisciTodoDOM(progetti[id].todos, todoId);
            }
          }
        }
      }

    return {
        isTodoToday,
        isTodoThisWeek,
        mostraTodoOggiEsettimana
    };
})();

export default filtriDate;

