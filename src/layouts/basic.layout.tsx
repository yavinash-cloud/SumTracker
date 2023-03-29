import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC } from "react";
import { Outlet } from "react-router-dom";



const BasicLayout: FC = () => {
    return (
        <Layout>
            <Content
                style={{
                    padding: '1rem'
                }}
            >
                <Outlet />
            </Content>
        </Layout>
    )
}

export default BasicLayout;