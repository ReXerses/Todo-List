import strutturaPagina from "./strutturaPagina";
import progetto from "./Progetto";
import todo from "./Todo";
import storage from "./Storage";
import { parse, isToday, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';

const caricaPagina = (() => {
    strutturaPagina();

    const dataInput = document.getElementById('data');

    // Ottieni la data odierna
    const dataOdierna = new Date();

    // Formatta la data odierna nel formato "YYYY-MM-DD"
    const dataFormattata = dataOdierna.toISOString().split('T')[0];

    // Imposta il valore minimo nell'input data
    dataInput.min = dataFormattata;

    const openModalBtn = document.querySelector('.menu');
    const modalContainer = document.getElementById('modalContainer');
    const addTask = document.querySelector('.aggiungiTask');
    const cancelTaskBtn = document.getElementById('cancel');
    const modale_addTask = document.querySelector('.add-task');
    const addProject = document.getElementById('aggiungiProgetto')
    const modale_addProject = document.querySelector('.add-project');
    const cancelProjectBtn = document.getElementById('cancel-project');
    const oggi = document.getElementById('oggi');
    const questaSettimana = document.getElementById('settimana');
    const nomeProgetto = document.querySelector('.nomeProgetto');
    const inboxBox = document.getElementById('0');
    const overlay = document.getElementById('modalOverlay');
    let progetti = storage.loadDataFromLocalStorage();
    let progettoAttuale=0;
    

    function inserisciProgettoDOM(submit_progetto, id) {
        //Il nome del progetto viene passato come stringa tramite submit_progetto. 
        const contenuto_modale = document.querySelector('.modal-content');
        const box = document.createElement('div');
        box.textContent = submit_progetto;
        box.classList.add('modal-item');
        box.setAttribute('id', id); // Utilizza l'ID specificato
      
        const eliminaProgettoBtn = document.createElement('button');
        eliminaProgettoBtn.classList.add('pulsanti');
        eliminaProgettoBtn.classList.add('trash');
        eliminaProgettoBtn.addEventListener('click', () => {
          progetto.eliminaProgetto(box.id, progetti);
          storage.saveDataToLocalStorage(progetti);
          box.remove();
          removeAllTodoBoxDom();
          progettoAttuale = 0;
          nomeProgetto.textContent = progetti[0].nome;
          inboxBox.click();
        })
      
        box.appendChild(eliminaProgettoBtn);
        contenuto_modale.appendChild(box);
      
        box.addEventListener('click', (e) => {
          addTask.disabled = false;
          if (e.target !== eliminaProgettoBtn) {
            nomeProgetto.textContent = progetti[box.id].nome;
            progettoAttuale = box.id;
      
            if (progetti[progettoAttuale].todos[0]) {
              caricaTodoDom(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length - 1);
            } else {
              removeAllTodoBoxDom(); 
            }
          }

        })
      }

    function inserisciTodoDOM (progetto, id) {
        //L'array di todo è passato tramite 'progetto' che non è altro che progetti[indice].todos.
        const mainContainer = document.querySelector('.main');
        const todoBox = document.createElement('div');

        const linea =document.createElement('div');
        linea.classList.add('linea');

        const firstHalf = document.createElement('div');
        firstHalf.classList.add('firstHalf');

        const secondHalf = document.createElement('div');
        secondHalf.classList.add('secondHalf');

        const checkBtn = document.createElement('button');
        checkBtn.classList.add('pulsanti');
        checkBtn.classList.add('checkbox');

        const descrizioneBox =document.createElement('div')
        descrizioneBox.classList.add("descrizione");
        const descrizioneP = document.createElement('p'); 
        descrizioneP.textContent = progetto[id].descrizione;

        const chiudiDescrizioneBtn = document.createElement('button');
        chiudiDescrizioneBtn.addEventListener('click' , () => {
            overlay.classList.toggle('modal-overlay');
            descrizioneBox.remove();
        })

        //event listener per cambiare il valore IsDone e di conseguenza sbarrare l'intero todoBox
        checkBtn.addEventListener('click', () => {
            if(progetto[id].isDone) {
                progetto[id].isDone = false;
                checkBtn.style.backgroundImage= 'none';
                storage.saveDataToLocalStorage(progetti);
                linea.remove();
                //toglie la riga sull intero box
            } else {
                progetto[id].isDone = true;
                checkBtn.style.backgroundImage= 'url(../src/media/check.svg)';
                storage.saveDataToLocalStorage(progetti);
                todoBox.appendChild(linea);
                //mette la riga sull intero box
            }

        })
        firstHalf.appendChild(checkBtn);
        firstHalf.classList.add('firstHalf');

        const titoloSpan = document.createElement('span');
        titoloSpan.textContent = progetto[id].titolo;
        firstHalf.appendChild(titoloSpan);
        todoBox.appendChild(firstHalf);

        const dataSpan = document.createElement('span');
        dataSpan.textContent = progetto[id].data;
        secondHalf.appendChild(dataSpan);

        const prioritàSpan = document.createElement('span');
        prioritàSpan.textContent = progetto[id].priority;
        secondHalf.appendChild(prioritàSpan);


        todoBox.classList.add('todoBox');

        const cancellaTodoBtn = document.createElement('button');
        cancellaTodoBtn.classList.add('pulsanti');
        cancellaTodoBtn.classList.add('trash');

        cancellaTodoBtn.addEventListener('click', () => {
            todo.rimuoviTodo(progetto,id);
            storage.saveDataToLocalStorage(progetti);
            todoBox.remove();
        })

        todoBox.appendChild(secondHalf);
        todoBox.appendChild(cancellaTodoBtn);

        todoBox.addEventListener('click', (e) => {
            if (e.target !== checkBtn && e.target !== cancellaTodoBtn ) {
                overlay.classList.toggle('modal-overlay');
                descrizioneBox.appendChild(descrizioneP);
                chiudiDescrizioneBtn.textContent = 'Close';
                chiudiDescrizioneBtn.classList.add('aggiungiTask');
                descrizioneBox.appendChild(chiudiDescrizioneBtn);
                mainContainer.appendChild(descrizioneBox);
            }
        })

        if(progetto[id].isDone) {
            checkBtn.style.backgroundImage= 'url(../src/media/check.svg)';
            todoBox.appendChild(linea);
        }

        mainContainer.appendChild(todoBox);
    }

    function caricaTodoDom (progetti, lunghezza) {
        removeAllTodoBoxDom();
        for(let i=0; i<=lunghezza; i++) {
            inserisciTodoDOM(progetti, i);
        }
    }

    function removeAllTodoBoxDom () {
        const todoBoxes = document.querySelectorAll('.todoBox');
        todoBoxes.forEach(todoBox => {
            todoBox.remove();
        });
    }


    function mostraTodoOggiDOM(progetti) {
      
        for (let id = 0; id < progetti.length; id++) {
          for (let todoId = 0; todoId < progetti[id].todos.length; todoId++) {
            const todo = progetti[id].todos[todoId];
            const dataScadenza = parse(todo.data, 'yyyy-MM-dd', new Date());
      
            if (isToday(dataScadenza)) {
              inserisciTodoDOM(progetti[id].todos, todoId);
            }
          }
        }
    }

    function mostraTodoQuestaSettimanaDOM(progetti) {
        const dataOggi = new Date();
        const inizioSettimana = startOfWeek(dataOggi);
        const fineSettimana = endOfWeek(dataOggi, { weekStartsOn: 1 });
        
        for (let id = 0; id < progetti.length; id++) {
          for (let todoId = 0; todoId < progetti[id].todos.length; todoId++) {
            const todo = progetti[id].todos[todoId];
            const dataScadenza = parse(todo.data, 'yyyy-MM-dd', new Date());


            if (isWithinInterval(dataScadenza, { start: inizioSettimana, end: fineSettimana })) {
              inserisciTodoDOM(progetti[id].todos, todoId);
            }
          }
        }
    }

    //caricamento progetti nel DOM dal local storage

    nomeProgetto.textContent='Inbox';
    if (progetti[0] && progetti[0].nome == "Inbox") {

        for( let i= 1; i <= progetti.length -1; i++) {
            inserisciProgettoDOM(progetti[i].nome, i);
        }
    } else {
        progetti = [progetto.creaProgetto('Inbox')];
    }


   // Event Listeners

    inboxBox.addEventListener('click' , () => {
        addTask.disabled = false;
        nomeProgetto.textContent=progetti[inboxBox.id].nome;
        progettoAttuale = 0;

        caricaTodoDom(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length-1);
    })
    inboxBox.click();

    openModalBtn.addEventListener('click', () => { // Per il menù
        openModalBtn.classList.toggle('menu-aperto');
        modalContainer.classList.toggle('modal-open');
    });

    addTask.addEventListener('click', () => { //Per aprire il form dedito alla creazione dei task
        if (addTask.disabled === false ) {
                overlay.classList.toggle('modal-overlay');
                modale_addTask.style.display = "flex";
        }
    });
    
    cancelTaskBtn.addEventListener('click', (e) => { //Chiude e resetta il form in caso l'utente scelga di annullare l'operazione
        e.preventDefault();
        overlay.classList.toggle('modal-overlay');
        modale_addTask.reset();
        modale_addTask.style.display = "none";
    })

    addProject.addEventListener('click', () => { //Per aprire il form dedito alla creazione dei progetti
        overlay.classList.toggle('modal-overlay');
        modale_addProject.style.display = "flex";
    })
    
    cancelProjectBtn.addEventListener('click', (e) => { //Chiude e resetta il form in caso l'utente scelga di annullare l'operazione
        e.preventDefault();
        overlay.classList.toggle('modal-overlay');
        modale_addProject.reset();
        modale_addProject.style.display = "none";
    })

    modale_addProject.addEventListener('submit', (e) => { //Chiude, resetta e crea il progetto dopo che l'utente decide di creare un progetto
        e.preventDefault();
        
        const submit_progetto = document.getElementById('nome-progetto').value;
        if (submit_progetto) {
            overlay.classList.toggle('modal-overlay');
            const nuovo_progetto = progetto.creaProgetto(submit_progetto);
            progetti.push(nuovo_progetto);
            storage.saveDataToLocalStorage(progetti);
            modale_addProject.reset();
            modale_addProject.style.display = "none";
            inserisciProgettoDOM(submit_progetto,progetti.length-1);
        } else {
            alert('Please fill in all fields in the form');
        }

    })

    modale_addTask.addEventListener('submit' , (e) => { //Chiude, resetta e crea un todo dopo che l'utente decide di creare il todo
        e.preventDefault();
        const titolo = document.getElementById('titolo').value;
        const descrizione = document.getElementById('descrizione').value;
        const priorità = document.getElementById('priorità').value;
        const data = document.getElementById('data').value;
        if (titolo && descrizione && priorità && data){
            overlay.classList.toggle('modal-overlay');
            todo.aggiungiToProgetto(progetti[progettoAttuale], titolo, descrizione, priorità, data);

            storage.saveDataToLocalStorage(progetti);
            modale_addTask.reset();
            modale_addTask.style.display = "none";

            inserisciTodoDOM(progetti[progettoAttuale].todos, progetti[progettoAttuale].todos.length -1);
        } else {
            alert('Please fill in all fields in the form');
        }

    })

    oggi.addEventListener('click' , () => { // Mostra i todo che scadono i data odierna
        addTask.disabled = true;
        removeAllTodoBoxDom();
        nomeProgetto.textContent = oggi.textContent;
        mostraTodoOggiDOM(progetti);
    })

    questaSettimana.addEventListener('click' , () => { // Mostra i todo che scadono durante la settimana (da lunedi a domenica)
        addTask.disabled = true;
        removeAllTodoBoxDom();
        nomeProgetto.textContent= questaSettimana.textContent;
        mostraTodoQuestaSettimanaDOM(progetti);
    })
    

});

export default caricaPagina;