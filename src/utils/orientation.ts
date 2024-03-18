import store from 'store'

export const isEventsMate = async (): Promise<boolean> => {
    const CURRENT_PROJECT: string | undefined = await store.get('PROJECT_NAME')
    return CURRENT_PROJECT === 'Events-Mate'
}