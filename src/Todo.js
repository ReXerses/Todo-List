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
        progetto.splice(indice, 1);
    }
    

    return {
        aggiungiToProgetto,
        rimuoviTodo
    };
})();

export default todo;