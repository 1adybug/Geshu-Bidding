export default function extractAnnouncementData(html) {
    const regex = /<[^>]+>([^<]+)<\/[^>]+>/g
    const matches = html.match(regex)

    const result:string[] = [] 

    if (matches) {
        let count = 0 
        for (const match of matches) {
            let content = match.replace(regex, "$1")
            content = content.replace(/&nbsp;/g, "")
            content = content.replace(/&gt;/g, "")
            content = content.replace(/附件:.*$/, "")
            const trimmedContent = content.trim()

            if (count >= 11 && count < matches.length - 5) {
                result.push(trimmedContent)
            }

            count++
        }
    }
    return result 
}