export const isEventsMate = (): boolean | null => {
  return process.env.NEXT_PUBLIC_PROJECT_NAME === 'Events-Mate'
}

export const getWeddmateUserCountryViaName = (): string | null => {
  const name = process.env.NEXT_PUBLIC_PROJECT_NAME?.split('-')[1]
  if (name === 'com') return 'GB'
  return name?.toUpperCase() as string | null
}