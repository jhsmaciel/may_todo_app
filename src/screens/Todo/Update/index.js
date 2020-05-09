import React, { useState, useContext } from 'react'
import { Layout, Button, TopNavigation, Divider, Icon, Text, Input } from '@ui-kitten/components';
import { updateTarefa } from '../../../utils/requesters/tarefas'
import { SafeAreaView } from 'react-native';
import { MenuAction } from '../../../components/menu';

export default function Update ({ navigation }){
    const tarefa = navigation?.params?.tarefa

    const [titulo, setTitulo] = useState(tarefa?.titulo);
    const [descricao, setDescricao] = useState(tarefa?.descricao);
    const [selectedIndex, setSelectedIndex] = useState(tarefa?.status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    async function _handleAtualizar(){
        try {
            setError(false)
            setLoading(true);
            await updateTarefa({
                id: tarefa.id,
                titulo,
                descricao,
                status: selectedIndex
            });
            setMessage('A tarefa foi alterada com sucesso!');
        } catch (error) {
            setMessage('Ocorreu algum erro, por favor tente novamente!');
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    const CadastroIcon = (props) => (
        <Icon name='plus-outline' {...props} />
    );
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation 
                accessoryLeft={() => MenuAction(navigation)} 
                title={() => <Text category="h5">Alterar Tarefa</Text>}
                alignment="center"
            />
            <Divider />
            <Layout level="2" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Layout level="2" style={{ flexDirection: "column", justifyContent: 'center', width: '85%', height: '90%' }}>
                    <Input
                        style={{ marginBottom: 10 }}
                        value={titulo}
                        disabled={loading}
                        label="Título"
                        onChangeText={setTitulo}
                        placeholder="Digite o título da sua tarefa"
                    />
                    <Input
                        style={{ marginBottom: 10 }}
                        value={descricao}
                        disabled={loading}
                        onChangeText={setDescricao}
                        label="Descrição"
                        placeholder="Digite uma breve descrição para a sua tarefa"
                    />
                    <Text category="p2" status={error ? "danger" : "success" }>
                        {message}
                    </Text>
                </Layout>
            </Layout>
            <Layout style={{ position: 'absolute', bottom: 5, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                    accessoryLeft={CadastroIcon}
                    onPress={_handleAtualizar}
                    disabled={loading}
                    style={{
                        width: '85%'
                    }}
                >
                    Alterar Tarefa
                </Button>
            </Layout>
        </SafeAreaView>
    )
}