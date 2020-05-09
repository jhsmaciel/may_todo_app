import React, { useContext } from 'react';
import { Text, Card as CardKitten, Button, Icon, Layout } from '@ui-kitten/components';
import { deleteTarefa } from '../../utils/requesters/tarefas';
import { TarefaContext } from '../../tarefa-context';

export const Card = ({ item, setList, callback }) => {
    const [state, setState] = useContext(TarefaContext);

    async function _handleExcluir() {
        await deleteTarefa(item.id)
        setList((list) => list.filter(tarefa => tarefa.id != item.id) )
    }

    function _handleEdit() {
        callback(item);
    }
    
    return (
        <CardKitten
            style={{
                marginBottom: 10
            }}
            header={() => (
                <Text category="h5" style={{padding: 5, textAlign: 'center' }}>
                    {`${item.titulo} - ${item.id} `}
                </Text>
            )}
            footer={() => (
                <Layout style={{ padding: 10, flexDirection: 'row',  }}>  
                    <Button 
                        onPress={_handleExcluir}
                        status="danger"
                        appearance="ghost"
                        size="small"
                        accessoryLeft={(props) => <Icon name="trash-2-outline" {...props}/>} 
                        style={{ flex: 0.5 }} 
                    />
                    <Button 
                        onPress={_handleEdit}
                        status="info" 
                        appearance="ghost" 
                        size="small"
                        accessoryLeft={(props) => <Icon name="edit-2-outline" {...props}/>} 
                        style={{ flex: 0.5 }}
                    />
                </Layout>
            )}
        >
            <Text>{item.descricao}</Text>
        </CardKitten>
    );
}