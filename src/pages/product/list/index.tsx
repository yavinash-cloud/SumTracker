import { Button, Space, Table } from "antd";
import { FC, useEffect, useState } from "react";
import Heading from "../../../components/heading/basic.heading";
import Pagination from "../../../components/pagination/basic.pagination";
import { listProducts } from "../../../services/products";
import ProductsTable from "./components/products.table";


const fixedListParams = {
    paginate: true
}

type PaginateType = {
    next: string | null,
    prev: string | null,
    count: number | null,
}

const ProductList: FC = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [pagination, setPagination] = useState<PaginateType>({
        next: null,
        prev: null,
        count: null,
    });

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        try {
            const res = await listProducts({
                query: { ...fixedListParams }
            });

            setProducts(res.data.results);
            setPagination({
                next: res.data.next,
                prev: res.data.prev,
                count: res.data.count
            });

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div style={{ marginBottom: '1rem' }}>
                <Heading
                    titleLevel={2}
                >
                    Products
                </Heading>
            </div>
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '0.5rem',
                }}
            >
                <div style={{ marginBottom: '1rem' }}>
                    <Pagination
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <ProductsTable
                        list={products}
                    />
                </div>
                <div>
                    <Pagination
                    />
                </div>
            </div>
        </>)
}

export default ProductList;