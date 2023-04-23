export function useVerb () {
    function verbConjugation (currentTense, currentVerbData) {
        const verbs = [];

        Object.keys(currentVerbData).forEach((tense) => {
            if (tense === currentTense) {
                const fullTense = currentVerbData[tense];
                Object.keys(fullTense).forEach((person) => {
                    verbs.push({
                        person,
                        verb: fullTense[person]
                    });
                });
            }
        });
        return verbs;
    }

    return { verbConjugation };
}
