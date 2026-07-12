export function getDelayUntil(date: string | Date): number {
    return Math.max(new Date(date).getTime() - Date.now(), 0)
}
