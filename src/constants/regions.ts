/**
 * Available regions for club filtering
 */
export const REGIONS = ['전체', '강남', '홍대', '이태원', '부산', '대구'] as const;

export type Region = typeof REGIONS[number];
