export function fuzzySearch(query, data, headers) {
    const queryLower = query.toLowerCase();
    const baseThreshold = 0.95;
    const minThreshold = 0.8;
    const threshold = Math.max(minThreshold, baseThreshold - (queryLower.length > 10 ? 0.15 : queryLower.length * 0.05));

    return data.reduce((results, item) => {
        let totalScore = 0;
        let matches = 0;

        headers.forEach(header => {
            if (item[header]) {
                const itemValue = item[header].toString().toLowerCase();
                const similarity = getJaroWinklerSimilarity(queryLower, itemValue);
                if (similarity >= threshold || itemValue.includes(queryLower)) {
                    totalScore += similarity;
                    matches++;
                }
            }
        });

        if (matches > 0) {
            results.push({ item, score: totalScore / matches });
        }

        return results;
    }, []).sort((a, b) => b.score - a.score); // Higher scores are better
}

/**
 * Calculates the Jaro-Winkler similarity between two strings
 * @param {string} s1 - First string
 * @param {string} s2 - Second string
 * @param {number} [prefixScale=0.1] - Scaling factor for prefix matches (default 0.1)
 * @param {number} [maxPrefixLength=4] - Maximum prefix length to consider (default 4)
 * @return {number} - Similarity score between 0 and 1
 */
function getJaroWinklerSimilarity(s1, s2, prefixScale = 0.1, maxPrefixLength = 4) {
    if (s1 === s2) return 1.0;
    if (s1.length === 0 || s2.length === 0) return 0.0;

    const matchInfo = getMatchInfo(s1, s2);
    if (matchInfo.matches === 0) return 0.0;

    const jaroSimilarity = (
        matchInfo.matches / s1.length + 
        matchInfo.matches / s2.length + 
        (matchInfo.matches - matchInfo.transpositions / 2) / matchInfo.matches
    ) / 3;

    const prefixLength = getCommonPrefixLength(s1, s2, maxPrefixLength);

    return jaroSimilarity + prefixLength * prefixScale * (1 - jaroSimilarity);
}

/**
 * Gets matching characters and transpositions count between two strings
 * @param {string} s1 - First string
 * @param {string} s2 - Second string
 * @return {Object} - Object containing matches and transpositions
 */
function getMatchInfo(s1, s2) {
    const maxLength = Math.max(s1.length, s2.length);
    const matchDistance = Math.floor(maxLength / 2) - 1;
    const s2Matched = new Array(s2.length).fill(false);
    const s1Matches = [];
    const s2Matches = [];
    
    for (let i = 0; i < s1.length; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, s2.length);
        
        for (let j = start; j < end; j++) {
            if (!s2Matched[j] && s1[i] === s2[j]) {
                s1Matches.push(s1[i]);
                s2Matches.push(s2[j]);
                s2Matched[j] = true;
                break;
            }
        }
    }

    let transpositions = 0;
    for (let i = 0; i < s1Matches.length; i++) {
        if (s1Matches[i] !== s2Matches[i]) {
            transpositions++;
        }
    }
    
    return {
        matches: s1Matches.length,
        transpositions: transpositions
    };
}

/**
 * Calculates the length of the common prefix between two strings
 * @param {string} s1 - First string
 * @param {string} s2 - Second string
 * @param {number} maxLength - Maximum prefix length to consider
 * @return {number} - Length of common prefix, up to maxLength
 */
function getCommonPrefixLength(s1, s2, maxLength) {
    const minLength = Math.min(maxLength, s1.length, s2.length);
    let prefixLength = 0;
    
    for (let i = 0; i < minLength; i++) {
        if (s1[i] === s2[i]) {
            prefixLength++;
        } else {
            break;
        }
    }
    
    return prefixLength;
}