export const CURRENT_PROJECT: string | undefined = process.env.PROJECT_NAME
export const isEventsMate: boolean = (`${CURRENT_PROJECT}` === 'Events-Mate')