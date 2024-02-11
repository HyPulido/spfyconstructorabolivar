import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Token = 
    {
        code: string,
        status: number,
        data: {
            error?: {
                error: string,
                error_description: string
            },
            response?: {
                access_token: string,
                token_type: string,
                expires_in: number,
                refresh_token: string,
                scope: string
            }
        }
    }

export const constructoraBolivarApi = createApi({
    reducerPath: 'constructoraBolivarApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/v1/',
    }),
    endpoints: (builder) => ({

        generateTokenByAuthCode: builder.query<Token[], {code: string}>({
            query: ({code}) => `spotify/auth/${code}`
        })
    }),

});

export const { useGenerateTokenByAuthCodeQuery } = constructoraBolivarApi