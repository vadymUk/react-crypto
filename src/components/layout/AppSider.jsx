import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";

const siderStyle = {
    padding: "1rem",
};

const AppSider = () => {
    const { loading, assets } = useContext(CryptoContext);

    if (loading)
        return (
            <Spin
                size='large'
                fullscreen
            />
        );
    return (
        <Layout.Sider
            width='25%'
            style={siderStyle}
        >
            {assets.map((asset) => (
                <Card
                    style={{ marginBottom: "1rem" }}
                    key={asset.id}
                >
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{
                            color: asset.grow ? "#3f8600" : "#cf1322",
                        }}
                        prefix={
                            asset.grow ? (
                                <ArrowUpOutlined />
                            ) : (
                                <ArrowDownOutlined />
                            )
                        }
                        suffix='$'
                    />
                    <List
                        size='small'
                        dataSource={[
                            {
                                title: "Total Profit",
                                value: asset.totalProfit,
                                wigthTag: true,
                            },
                            {
                                title: "Asset Amount",
                                value: asset.amount,
                                isPlain: true,
                            },
                            // { title: "Difference", value: asset.growPercent },
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <span>{item.title}</span>
                                <span>
                                    {" "}
                                    {item.wigthTag && (
                                        <Tag
                                            color={asset.grow ? "green" : "red"}
                                        >
                                            {asset.growPercent}%
                                        </Tag>
                                    )}
                                    {item.isPlain && (
                                        <Typography.Text>
                                            {item.value}
                                        </Typography.Text>
                                    )}
                                    {!item.isPlain && (
                                        <Typography.Text
                                            type={
                                                asset.grow
                                                    ? "success"
                                                    : "danger"
                                            }
                                        >
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>
                                    )}
                                </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    );
};

export default AppSider;
