import React, { useEffect, useState } from 'react';
import { Layout, TopNavigation, Divider, Spinner, List, Text } from '@ui-kitten/components';
import { SafeAreaView, RefreshControl, ScrollView, ToastAndroid, } from 'react-native';
import { getTarefas } from '../../../../utils/requesters/tarefas';
import { Card } from '../../../../components/card';
import { MenuAction, ReloadAction } from '../../../../components/menu';

export default function Todo ({ navigation }){
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, [navigation]);

    async function getData (){
        try {
            setLoading(true);
            const tarefas = await getTarefas("TODO")
            setTarefas(tarefas)
        } catch (error) {
            ToastAndroid.show("ERROR", 1000)
        } finally {
            setLoading(false); 
        }
    }


    return (
        <SafeAreaView style={{flex:1}}>
            <RefreshControl />
            <TopNavigation 
                accessoryLeft={() => MenuAction(navigation)} 
                title={() => <Text category="h5">To do</Text>} 
                alignment="center"
                accessoryRight={() => ReloadAction(getData)}
            />
            <Divider />
            <Layout  style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                {
                    loading ?
                        (
                            <Spinner animating />
                        )
                    : 
                        tarefas.length == 0 ?
                            (
                                <Text category="h3">Lista Vazia!</Text>

                            )
                        :
                            (
                                <List
                                    style={{ flex: 1, width: '95%', paddingTop: 10, backgroundColor: "#FFF" }}
                                    data={tarefas}
                                    renderItem={(props) => <Card setList={setTarefas} {...props} />}
                                />
                            )
                }
            </Layout>
        </SafeAreaView>
    )
}