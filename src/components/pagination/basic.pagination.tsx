import { Button, Space } from "antd";


const Pagination = () => {
    return (
        <Space
            style={{ display: 'flex', justifyContent: 'end' }}
            align={'end'}
        >
            <Button>Prev</Button>
            <Button>Next</Button>
        </Space>
    )
}

export default Pagination;