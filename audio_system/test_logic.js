const { matchParticipants, checkIdempotency } = require('./logic');

const mockCrmPeople = [
    { id: '1', name: 'John Doe', email: 'john@example.com', company: 'Acme Corp' },
    { id: '2', name: 'Jane Smith', email: 'jane@test.com', company: 'Beta LLC' },
    { id: '3', name: 'Robert Johnson', email: 'bob@xyz.com', company: 'Gamma Inc' }
];

const mockTranscriptNames = [
    "John Doe",        // Exact match
    "Jane Smyth",      // Fuzzy match
    "Alice Wonderland" // No match
];

console.log("Testing matching logic...");
const results = matchParticipants(mockTranscriptNames, mockCrmPeople);
console.log(JSON.stringify(results, null, 2));

console.log("\nTesting Idempotency...");
const existingIds = ['call_123', 'call_456'];
console.log('check call_123 (should be true):', checkIdempotency('call_123', existingIds));
console.log('check call_789 (should be false):', checkIdempotency('call_789', existingIds));
