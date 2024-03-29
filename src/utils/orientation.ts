export const isEventsMate = (): boolean | null => {
    return process.env.NEXT_PUBLIC_PROJECT_NAME === 'Events-Mate'
}
