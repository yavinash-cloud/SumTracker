import { Typography } from 'antd';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../constants/app.constants';
import { PaginateDataType, ResultStringProps } from '../../interface/common';
import { pluralize } from '../../utils/common.utils';

const defaultPagination: Partial<PaginateDataType> = {
    limit: PAGINATION_LIMIT,
    hasOffset: true,
};

export const getPaginationString = (
    pagination: PaginateDataType,
    loading?: boolean,
    pageString?: string,
) => {
    console.log(pagination);
    const loadingString = 'Loading results';
    pagination = {
        ...defaultPagination,
        ...pagination,
    };

    const limit = Math.min(pagination.limit!, pagination.resultsCount);

    const isNotPaginated = !pagination.next && !pagination.prev;

    const upperLimit = Number(limit ?? 1) + Number(pagination.offset ?? 0);
    const lowerLimit = Number(pagination.offset ?? 0) + 1;

    const nonPaginatedCount = pagination.resultsCount ?? pagination.count ?? limit;
    const paginatedCount = pagination.count ? pagination.count : 'many';

    const nonPaginatedString = `${nonPaginatedCount} of ${nonPaginatedCount} ${pluralize(
        nonPaginatedCount ?? 0,
        `${pageString}`,
    )}`;

    const limitString = pagination.hasOffset ? `${lowerLimit}-${upperLimit}` : limit;

    const paginatedString = `${limitString} of ${paginatedCount} ${pluralize(
        pagination.count ?? 0,
        `${pageString}`,
    )}`;

    const resultString = isNotPaginated ? nonPaginatedString : paginatedString;
    const paginationString = `Showing ${resultString} `;

    return loading ? loadingString : paginationString;
};

const ResultString: FC<ResultStringProps> = ({ pagination, loading, pageString }) => {
    return (
        <div>
            <Typography.Text>{getPaginationString(pagination, loading, pageString)}</Typography.Text>
        </div>
    );
};

export default ResultString;
