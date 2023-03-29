import { Button, Space } from "antd";
import { FC } from "react";



type UrlType = string | null;
interface PaginationProps {
    next: UrlType;
    prev: UrlType;
    onPrevClick?: (prev: UrlType) => void;
    onNextClick?: (next: UrlType) => void;
}
const Pagination: FC<PaginationProps> = ({ next, prev, onNextClick, onPrevClick }) => {

    const handlePrev = () => {
        onPrevClick?.(prev);
    }

    const handleNext = () => {
        onNextClick?.(next);
    }

    return (
        <Space
            style={{ display: 'flex', justifyContent: 'end' }}
            align={'end'}
        >
            <Button
                onClick={handlePrev}
                disabled={!prev}
            >Prev</Button>
            <Button
                onClick={handleNext}
                disabled={!next}
            >
                Next
            </Button>
        </Space>
    )
}

export default Pagination;