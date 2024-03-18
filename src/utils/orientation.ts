import store from 'store'

export const isEventsMate = (): boolean => {
    const CURRENT_PROJECT = store.get('PROJECT_NAME');
    return CURRENT_PROJECT === 'Events-Mate';
};