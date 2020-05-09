import React, { useEffect, useState } from 'react'
import { Layout, TopNavigation, Divider, Spinner, List, Text } from '@ui-kitten/components'
import { SafeAreaView } from 'react-native';
import { getTarefas } from '../../../../utils/requesters/tarefas';
import { Card } from '../../../../components/card';
import { MenuAction, ReloadAction } from '../../../../components/menu';



export default function Doing ({ navigation }){
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, [navigation]);

    async function getData (){
        try {
            setLoading(true);
            const tarefas = await getTarefas("DOING")
            setTarefas(tarefas)
        } catch (error) {
            ToastAndroid.show("ERROR", 1000)
        } finally {
            setLoading(false); 
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <TopNavigation 
                accessoryLeft={() => MenuAction(navigation)} 
                title={() => <Text category="h5">Doing</Text>} 
                alignment="center" 
                accessoryRight={() => ReloadAction(getData)}
            />
            <Divider />
            <Layout level="2" style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {
                    loading ?
                        (
                            <Spinner animating />
                        )
                    : 
                        (
                            tarefas.length == 0 ?
                                (
                                    <Text category="h3">Lista Vazia!</Text>

                                )
                            :
                                (
                                    <List
                                        style={{ flex: 1, width: '100%', padding: 10 }}
                                        data={tarefas}
                                        renderItem={(props) => <Card setList={setTarefas} {...props} />}
                                    />
                                )
                        )
                }
            </Layout>
        </SafeAreaView>
    )
}