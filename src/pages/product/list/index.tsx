import { FC, useEffect, useState } from "react";
import Heading from "../../../components/heading/basic.heading";
import Pagination from "../../../components/pagination/basic.pagination";
import { UrlType } from "../../../interface/common";
import { listProducts } from "../../../services/products";
import { getQueryFromUrl } from "../../../utils/common.utils";
import ProductsTable from "./components/products.table";


const fixedListParams = {
    paginate: true
}

type PaginateType = {
    next: UrlType,
    prev: UrlType,
    count: number | null,
}

const ProductList: FC = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoding] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginateType>({
        next: null,
        prev: null,
        count: null,
    });

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        loadProducts();
    }

    const loadProducts = async (queryParams?: Record<string, any>) => {
        let query = queryParams || {};
        setLoding(true);
        try {
            const res = await listProducts({
                query: { ...fixedListParams, ...query }
            });

            setProducts(res.data.results);
            console.log(res.data.results);
            setPagination({
                next: res.data.next,
                prev: res.data.previous,
                count: res.data.count
            });

        } catch (err) {
            console.log(err);
        }
        setLoding(false);
    }

    const handleNext = (next: UrlType) => {
        if (next === null) {
            return;
        }
        let query = getQueryFromUrl(next);
        console.log('handleNext', query);
        loadProducts(query);
    }

    const handlePrev = (prev: UrlType) => {
        if (prev === null) {
            return;
        }
        let query = getQueryFromUrl(prev);
        loadProducts(query);
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
                        next={pagination.next}
                        prev={pagination.prev}
                        onNextClick={handleNext}
                        onPrevClick={handlePrev}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <ProductsTable
                        list={products}
                        loading={loading}
                    />
                </div>
                <div>
                    <Pagination
                        next={pagination.next}
                        prev={pagination.prev}
                    />
                </div>
            </div>
        </>)
}

export default ProductList;