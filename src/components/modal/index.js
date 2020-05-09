import { updateTarefa } from "../../utils/requesters/tarefas";
import { Input } from "@ui-kitten/components";

export function ModalEdit({ visible, item, setVisible}) {
    const [titulo, setTitulo] = useState(item?.titulo);
    const [descricao, setDescricao] = useState(item?.descricao);
    const [status, setStatus] = useState(item?.status);
    const [loading, setLoading] = useState(false);

    async function _handleEdit() {
        try {
            setLoading(true)
            await updateTarefa({
                id: item.id,
                titulo,
                descricao,
                status
            });
        } catch (error) {
            
        }
    }
    return (
        <Modal visible={visible}>
            <CardKitten disabled={true}>
                <Text>Atualizar a tarefa {`${item.titulo} - ${item.id}`}</Text>
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
                <Button onPress={_handleEdit}>
                    Alterar
                </Button>
            </CardKitten>
        </Modal>
    )
}