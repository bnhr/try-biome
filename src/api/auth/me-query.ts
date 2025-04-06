import { useQuery } from '@tanstack/react-query'

import { kyAPI } from '~/api/fetchers/ky'
import { authApi } from '~/api/fetchers/list'
import { SuccessResult } from '~/types'

interface Me {
	username: string
}

export function useMeQuery() {
	return useQuery({
		queryKey: ['me'],
		staleTime: Infinity,
		queryFn: async () => {
			try {
				const result = await kyAPI.get(authApi.me).json<SuccessResult<Me>>()
				return result
			} catch (error) {
				console.log('🚀 ~ mutationFn: ~ error:', error)
				throw error
			}
		},
	})
}
