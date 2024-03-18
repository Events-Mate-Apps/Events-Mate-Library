export const isEventsMate = (): boolean | null => {
    const metaTag: HTMLMetaElement | null = document.querySelector('meta[property="og:site_name"]');
    console.log(metaTag, 'metaTag')
    console.log(metaTag?.content, 'content')
    if (!metaTag) return null
    return metaTag.content === 'Events-Mate'
}
