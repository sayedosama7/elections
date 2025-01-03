import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL, CANDITATES } from '../Components/Api';

export const FetchCanditate = createApi({
    reducerPath: 'Canditates',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseURL}`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getCanditates: builder.query({
            query: ({ govId = 0, electoralId = 0 } = {}) => 
                `${CANDITATES}?GovId=${govId}&ElectoralId=${electoralId}`,
                    }),

    }),
});

export const { useGetCanditatesQuery } = FetchCanditate;
