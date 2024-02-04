import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
    width: "100%",
    textAlign: "center",
    height: 60,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const AppHeader = () => {
    const [select, setSelect] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coin, setCoin] = useState("");
    const { crypto } = useCrypto();

    const handleSelect = (value) => {
        setCoin(crypto.find((c) => c.id === value));
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === "/") {
                setSelect((prev) => !prev);
            }
        };
        document.addEventListener("keypress", keypress);
        return () => document.removeEventListener("keypress", keypress);
    }, []);
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: "250px",
                }}
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                value='press / to open'
                options={crypto.map((item) => ({
                    label: item.name,
                    value: item.id,
                    icon: item.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.label}
                        />
                        {option.data.label}
                    </Space>
                )}
            />
            <Button
                type='primary'
                onClick={() => setDrawer(true)}
            >
                Add Asset
            </Button>
            <Modal
                open={isModalOpen}
                footer={null}
                onCancel={handleCancel}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
            <Drawer
                title='Add Asset'
                width={600}
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose
            >
                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    );
};

export default AppHeader;
