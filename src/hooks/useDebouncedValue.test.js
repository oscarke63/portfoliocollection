import { renderHook, act } from '@testing-library/react'
import { useDebouncedValue } from './useDebouncedValue'

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('a', 200))
    expect(result.current).toBe('a')
  })

  it('only updates after the delay elapses', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(199)
    })
    expect(result.current).toBe('a')

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe('ab')
  })

  it('resets the timer when the value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, 200),
      { initialProps: { value: 'a' } },
    )

    rerender({ value: 'ab' })
    act(() => jest.advanceTimersByTime(100))
    rerender({ value: 'abc' })
    act(() => jest.advanceTimersByTime(100))

    // 200ms total but the timer restarted at 'abc', so still 'a'.
    expect(result.current).toBe('a')

    act(() => jest.advanceTimersByTime(100))
    expect(result.current).toBe('abc')
  })
})
