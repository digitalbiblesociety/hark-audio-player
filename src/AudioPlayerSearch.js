export function fuzzySearch(query, data, headers) {
    const queryLower = query.toLowerCase();
    const baseThreshold = 0.9;
    const minThreshold = 0.5;
    const threshold = Math.max(minThreshold, baseThreshold - (queryLower.length > 10 ? 0.15 : queryLower.length * 0.05));
    
    return data.reduce((results, item) => {
        let totalScore = 0;
        let matches = 0;
        headers.forEach(header => {
            if (item[header]) {
                const itemValue = item[header].toString().toLowerCase();
                const distance = getLevenshteinDistance(queryLower, itemValue);
                const score = distance / Math.max(queryLower.length, itemValue.length);
                if (score <= threshold) {
                    totalScore += score;
                    matches++;
                }
            }
        });
        if (matches > 0) {
            results.push({item, score: totalScore / matches});
        }
        return results;
    }, []).sort((a, b) => a.score - b.score);
}

function getLevenshteinDistance(a, b) {
    if (a === b) return 0;
    const d = Array.from({length: a.length + 1}, (_, i) => i);
    for (let j = 1; j <= b.length; j++) {
        let prev = d[0];
        d[0] = j;
        for (let i = 1; i <= a.length; i++) {
            const temp = d[i];
            d[i] = Math.min(d[i] + 1, d[i-1] + 1, prev + (a[i-1] !== b[j-1]));
            prev = temp;
        }
    }
    return d[a.length];
}