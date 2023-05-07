import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'renderer/constants/links';

function getToken() {
  const str = localStorage.getItem('usr');

  if (str == null) return '';

  return JSON.parse(str).token;
}

export const todosApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API + '/todos',
    headers: {
      authentication: getToken(),
    },
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodo: builder.query({
      query: (token) => ({
        url: '',
        headers: {
          authentication: token,
        },
      }),
      providesTags: ['Todos'],
    }),

    getTodoById: builder.query({
      query: (todoId: string) => `/${todoId}`,
    }),

    createTodo: builder.mutation({
      query: (props) => ({
        method: 'POST',
        url: '',
        body: props,
      }),
      invalidatesTags: ['Todos'],
    }),

    removeTodo: builder.mutation<any, number>({
      query: (todoId) => ({
        method: 'DELETE',
        url: '/' + todoId,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodoByIdQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useRemoveTodoMutation,
  useLazyGetTodoQuery,
} = todosApi;
