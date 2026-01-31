const Fuse = require('fuse.js');

/**
 * matches participants from a transcript to existing CRM entries.
 * @param {Array<string>} transcriptNames - List of names extracted from transcript.
 * @param {Array<Object>} crmPeople - List of people from Notion [{id, name, email, company}].
 * @returns {Object} result - { matches: [], needsReview: [] }
 */
function matchParticipants(transcriptNames, crmPeople) {
    const options = {
        includeScore: true,
        keys: ['name', 'email', 'company'],
        threshold: 0.4 // 0.0 is perfect match, 1.0 is no match
    };

    const fuse = new Fuse(crmPeople, options);
    const result = {
        matches: [],
        needsReview: []
    };

    transcriptNames.forEach(name => {
        const searchResult = fuse.search(name);

        if (searchResult.length > 0) {
            const bestMatch = searchResult[0];
            if (bestMatch.score < 0.3) {
                // High confidence match
                result.matches.push({
                    transcriptName: name,
                    crmId: bestMatch.item.id,
                    confidence: 1 - bestMatch.score
                });
            } else {
                // Low confidence - needs review
                result.needsReview.push({
                    transcriptName: name,
                    potentialMatches: searchResult.slice(0, 3).map(m => ({
                        name: m.item.name,
                        id: m.item.id,
                        score: m.score
                    }))
                });
            }
        } else {
            // No match found - needs review or create new
            result.needsReview.push({
                transcriptName: name,
                potentialMatches: []
            });
        }
    });

    return result;
}

/**
 * Checks if a call has already been processed.
 * @param {string} callId - Unique ID from Fireflies.
 * @param {Array<string>} existingIds - List of IDs from Notion Automation Log or Interactions.
 * @returns {boolean} - True if duplicate.
 */
function checkIdempotency(callId, existingIds) {
    return existingIds.includes(callId);
}

module.exports = {
    matchParticipants,
    checkIdempotency
};
