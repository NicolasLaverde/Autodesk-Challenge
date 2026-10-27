import { describe, it, expect, vi, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useDebouncedValue } from '../useDebouncedValue'

afterEach(() => {
    vi.useRealTimers()
})

describe('useDebouncedValue (S-9)', () => {
    it('updates only after the delay has passed', () => {
        vi.useFakeTimers()
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 300),
            { initialProps: { value: 'a' } }
        )

        rerender({ value: 'ab' })
        act(() => { vi.advanceTimersByTime(299) })
        expect(result.current).toBe('a')

        act(() => { vi.advanceTimersByTime(1) })
        expect(result.current).toBe('ab')
    })

    it('collapses a rapid sequence of changes into one update', () => {
        vi.useFakeTimers()
        const { result, rerender } = renderHook(
            ({ value }) => useDebouncedValue(value, 300),
            { initialProps: { value: 'a' } }
        )

        rerender({ value: 'ab' })
        act(() => { vi.advanceTimersByTime(100) })
        rerender({ value: 'abc' })
        act(() => { vi.advanceTimersByTime(100) })
        expect(result.current).toBe('a')

        act(() => { vi.advanceTimersByTime(200) })
        expect(result.current).toBe('abc')
    })
})
