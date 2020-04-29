import React, { useState } from 'react'
import { Layout, Button, TopNavigation, Divider, Icon, Text, Input, Spinner } from '@ui-kitten/components';
import { postTarefas } from '../../../utils/requesters/tarefas'
import { SafeAreaView } from 'react-native';
import { MenuAction } from '../../../components/menu';

const statusEnum = {
    TODO: "TODO",
    DOING: "DOING",
    DONE: "DONE"
}

export default function Create ({ navigation }){
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(statusEnum.TODO);
    const [loading, setLoading] = useState(false);
    
    async function _handleCadastro(){
        try {
            setLoading(true);
            console.warn({
                titulo,
                descricao,
                status: selectedIndex
            })
            await postTarefas({
                titulo,
                descricao,
                status: selectedIndex
            });
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const CadastroIcon = (props) => (
        <Icon name='plus-outline' {...props} />
    );
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <TopNavigation accessoryLeft={() => MenuAction(navigation)} title={() => <Text category="h5">Tarefa</Text>} alignment="center" />
            <Divider />
            <Layout level="2" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                {
                    loading ? 
                        (
                            <Spinner />
                        )
                    :
                        (
                            <Layout level="2" style={{ flexDirection: "column", width: '85%', height: '100%'  }}>
                                <Layout level='2' style={{ height: '20%', justifyContent: 'center'}}>
                                    <Text category="h2" style={{ textAlign: 'center' }}>Cadastrar Tarefa</Text>
                                </Layout>
                                <Input 
                                    style={{ marginBottom: 10 }}
                                    value={titulo}
                                    label="Título"
                                    onChangeText={setTitulo}
                                    placeholder="Digite o título da sua tarefa"
                                />
                                <Input
                                    style={{ marginBottom: 10 }}
                                    value={descricao}
                                    onChangeText={setDescricao}
                                    label="Descrição"
                                    placeholder="Digite uma breve descrição para a sua tarefa"
                                />

                                <Input 
                                    style={{ marginBottom: 10 }}
                                    value={selectedIndex}
                                    label="Status"
                                    onChangeText={setSelectedIndex}
                                    placeholder="Descrição"
                                />
                                {/* <SelectSimpleUsageShowcase />  */}
                                <Button accessoryLeft={CadastroIcon} onPress={_handleCadastro}>Cadastrar Tarefa</Button>
                            </Layout>
                        )
                }
            </Layout>
        </SafeAreaView>
    )
}