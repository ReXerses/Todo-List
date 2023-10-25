const todo = (() => {

    function creaTodo(titolo, descrizione, priority, data) {
        return {
            titolo,
            descrizione,
            priority,
            data,
            isDone: false,
        };
    }

    function aggiungiToProgetto (progetto, titolo, descrizione, priority, data) {
        const todo = creaTodo(titolo, descrizione, priority, data);
        progetto.todos.push(todo);
    }

    function rimuoviTodo(progetto, indice) {
        //const progettoCorrente = getProgettoCorrente();
        progetto.splice(indice, 1);
        //mostraTodos(progettoCorrente); una funzione che mostri i todos attivi?
    }
    
    // Funzione per ottenere il progetto corrente (In questo esempio, è Inbox) 
    //da cambiare in modo da considerare anche gli altri progetti
    function getProgettoCorrente() {
        return progetto[0];
    }

    return {
        aggiungiToProgetto,
        rimuoviTodo
    };
})();

export default todo;