import { useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { progressApi, type ProgressSummary } from '@/lib/api/progress'

interface UseProgressOptions {
  roadmapId: string | null
  totalMonths: number
}

export function useProgress({ roadmapId, totalMonths }: UseProgressOptions) {
  const queryClient = useQueryClient()
  const queryKey = ['progress', roadmapId]

  const { data: summary, isLoading } = useQuery<ProgressSummary>({
    queryKey,
    queryFn: async () => {
      if (!roadmapId) {
        return { entries: [], total_months: totalMonths, completed_months: 0, remaining_months: totalMonths, percentage: 0 }
      }
      const res = await progressApi.getByRoadmap(roadmapId)
      return {
        ...res.data,
        total_months: totalMonths,
        remaining_months: totalMonths - res.data.completed_months,
      }
    },
    enabled: !!roadmapId,
    staleTime: 30_000,
    retry: false,
  })

  const updateMutation = useMutation({
    mutationFn: (data: { month_name: string; completed: boolean }) => {
      if (!roadmapId) throw new Error('No roadmap ID')
      return progressApi.update({ roadmap_id: roadmapId, ...data })
    },
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData<ProgressSummary>(queryKey)
      if (previous) {
        const updatedEntries = previous.entries.map((e) =>
          e.month_name === data.month_name ? { ...e, completed: data.completed } : e,
        )
        const alreadyExists = previous.entries.some((e) => e.month_name === data.month_name)
        const entries = alreadyExists
          ? updatedEntries
          : [...previous.entries, { month_name: data.month_name, completed: data.completed, completed_at: null }]
        const completedMonths = entries.filter((e) => e.completed).length
        queryClient.setQueryData<ProgressSummary>(queryKey, {
          ...previous,
          entries,
          completed_months: completedMonths,
          remaining_months: totalMonths - completedMonths,
          percentage: totalMonths > 0 ? Math.round((completedMonths / totalMonths) * 100) : 0,
        })
      }
      return { previous }
    },
    onError: (_err, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })

  const toggleMonth = useCallback(
    (monthName: string, currentCompleted: boolean) => {
      updateMutation.mutate({ month_name: monthName, completed: !currentCompleted })
    },
    [updateMutation],
  )

  return {
    summary: summary ?? {
      entries: [],
      total_months: totalMonths,
      completed_months: 0,
      remaining_months: totalMonths,
      percentage: 0,
    },
    isLoading,
    toggleMonth,
    isUpdating: updateMutation.isPending,
  }
}
