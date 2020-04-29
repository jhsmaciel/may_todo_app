import React from 'react';
import { Text, Card as CardKitten, Button, Icon, Layout } from '@ui-kitten/components';
import { deleteTarefa, postTarefas } from '../../utils/requesters/tarefas';

export const Card = ({ item, setList }) => {

    async function _handleExcluir() {
        await deleteTarefa(item.id)
        setList((list) => list.filter(tarefa => tarefa.id != item.id) )
    }

    async function _handleEdit(newTarefa) {
        await postTarefas(newTarefa)
    }

    function _openEdit() {

    }

    return (
        <CardKitten
            style={{
                marginBottom: 10
            }}
            header={() => <Text category="h5" style={{padding: 5, textAlign: 'center' }}>{`${item.titulo} - ${item.id} `}</Text>}
            footer={() => (
                <Layout style={{ padding: 10, flexDirection: 'row',  }}>  
                    <Button onPress={_handleExcluir} status="danger" appearance="ghost" size="small" accessoryLeft={(props) => <Icon name="trash-2-outline" {...props}/>} style={{ flex: 0.5 }} />
                    <Button  status="info" appearance="ghost" size="small" accessoryLeft={(props) => <Icon name="edit-2-outline" {...props}/>} style={{ flex: 0.5 }}/>
                </Layout>
            )}
        >
            <Text>{item.descricao}</Text>
        </CardKitten>
    );
}