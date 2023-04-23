import { createStore } from "vuex";
import { find, forEach } from "lodash";

const store = createStore({
    state: () => ({
        practicedVerbs: [],
        currentVerb: "",
        currentTense: "",
        currentVerbData: {},
        currentAnswersPerTense: [],
        enablePractice: false,
        verbList: []
    }),

    getters: {
        getVerbList: (state) => state.verbList,
        getPracticedVerbs: (state) => state.practicedVerbs,
        getCurrentVerb: (state) => state.currentVerb,
        getCurrentVerbData: (state) => state.currentVerbData,
        getCurrentTense: (state) => state.currentTense,
        getCurrentVerbExamples: (state) => {
            return state.currentVerbData?.voorbeelden
                ? state.currentVerbData?.voorbeelden
                : [];
        },
        getCurrentVerbTranslations: (state) => {
            return state.currentVerbData?.vertalingen
                ? state.currentVerbData?.vertalingen
                : [];
        },
        getEnablePractice: (state) => state.enablePractice,
        getCurrentAnswersPerTense: (state) => state.currentAnswersPerTense,
        getCurrentAnswersPerTensePerPerson: (state) => (person) => {
            const element = find(state.currentAnswersPerTense, (item) => item.person === person);
            return element && element.verb ? element.verb : "no answer available";
        },
        getVerbPerTensePerPerson: (state) => (person, tense) => {
            const element = find(state.currentAnswersPerTense, (item) => item.person === person);
            return element && element.verb ? element.verb : "no answer available";
        }
    },

    mutations: {
        SET_ENABLE_PRACTICE (state) {
            if (state.currentTense !== "" && state.currentVerb !== "") {
                state.enablePractice = true;
            } else {
                state.enablePractice = false;
            }
        },

        SET_CURRENT_VERB (state, verb) {
            if (verb && verb !== state.currentVerb) {
                state.currentVerb = verb;
            }
        },

        SET_CURRENT_VERB_DATA (state, data) {
            state.currentVerbData = data;
        },

        SET_CURRENT_ANSWERS_PER_TENSE (state, answers) {
            state.currentAnswersPerTense = answers;
        },

        SET_CURRENT_TENSE (state, tense) {
            if (tense && tense !== state.currentTense) {
                state.currentTense = tense;
            }
        },

        ADD_PRACTICE_VERB (state, verb) {
            if (find(state.practicedVerbs, (item) => item === verb) === undefined) {
                state.practicedVerbs.push(verb);
            }
        },

        SET_VERB_LIST (state, verbs) {
            state.verbList = verbs;
        }
    },

    actions: {
        async setVerbList ({ commit }) {
            const fileNameUrl = "data/_verbList.json";
            try {
                let verbJson = {};
                fetch(fileNameUrl)
                    .then(response => response.json())
                    .then(jsonData => {
                        verbJson = jsonData;
                        const verbs = [];
                        forEach(verbJson.verbs, (verb) => {
                            verbs.push(verb);
                        });
                        commit("SET_VERB_LIST", verbs);
                    });
            } catch {
                commit("SET_CURRENT_VERB_DATA", {});
            }
        },

        async setCurrentVerb ({ commit }, verb) {
            if (verb && verb !== {}) {
                commit("SET_CURRENT_VERB", verb);
                commit("SET_ENABLE_PRACTICE");

                const fileNameUrl = `data/${verb}.json`;

                try {
                    const response = await fetch(fileNameUrl);
                    const data = await response.json();

                    commit("SET_CURRENT_VERB_DATA", data);
                } catch {
                    commit("SET_CURRENT_VERB_DATA", {});
                }
            }
        },

        setCurrentTense ({ commit }, tense) {
            commit("SET_CURRENT_TENSE", tense);
            commit("SET_ENABLE_PRACTICE");
        },

        addPracticeVerb ({ commit }, verb) {
            commit("ADD_PRACTICE_VERB", verb);
        },

        setCurrentAnswers ({ commit }, answers) {
            commit("SET_CURRENT_ANSWERS_PER_TENSE", answers);
        },

        resetData ({ commit }) {
            commit("SET_CURRENT_VERB", "");
            commit("SET_CURRENT_TENSE", "");
            commit("SET_CURRENT_VERB_ANSWERS", {});
            commit("SET_CURRENT_ANSWERS_PER_TENSE", []);
            commit("SET_ENABLE_PRACTICE");
        },

        resetCurrentVerb ({ commit, dispatch }, verb) {
            dispatch("setCurrentVerb", verb);
            commit("SET_CURRENT_TENSE", "");
            commit("SET_CURRENT_ANSWERS_PER_TENSE", []);
            commit("SET_ENABLE_PRACTICE");
        },

        resetTense ({ commit }, tense) {
            commit("SET_CURRENT_TENSE", tense);
            commit("SET_CURRENT_VERB_ANSWERS", {});
            commit("SET_CURRENT_ANSWERS_PER_TENSE", []);
            commit("SET_ENABLE_PRACTICE");
        }
    }
});

export default store;
