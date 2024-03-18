import store from 'store'

export const isEventsMate = (): boolean => {
    const IS_EVENTS_MATE = store.get('IS_EVENTS_MATE');
    return JSON.parse(IS_EVENTS_MATE);
};