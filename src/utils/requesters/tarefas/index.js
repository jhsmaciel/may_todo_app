const { api } = require("../../../services");

export async function getTarefas(status = "TODO") {
    try {
        const { data } = await api.get("/tarefas", { 
            params: {
                status,
            } 
        })
        return data
    } catch (error) {
        throw error
    }
}

export async function postTarefas(tarefa) {
    try {
        const { data } = await api.post(`/tarefas/${tarefa.id}`, tarefa)
        return data
    } catch (error) {
        throw error
    }
}

export async function deleteTarefa(id) {
    try {
        const { data } = await api.delete(`/tarefas/${id}`)
        return data
    } catch (error) {
        throw error
    }
}