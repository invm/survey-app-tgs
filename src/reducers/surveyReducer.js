import { CREATE_SURVEY, EDIT_SURVEY, DELETE_SURVEY, ADD_CATEGORY } from '../actions/types';

const initialState = {
    categories: ['Sports', 'Politics', 'Hobbies', 'Programming', 'Web Development'],
    surveys: [
        {
            id: 1,
            category: 'Politics',
            name: 'UEFA Champions League',
            voted: true,
            questions: [
                {
                    id: 1,
                    question: 'question test1',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 2,
                    question: 'question test2',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 3,
                    question: 'question test3',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                }
            ]
        },
        {
            id: 2,
            category: 'Politics',
            name: 'UEFA Champions League',
            voted: true,
            questions: [
                {
                    id: 1,
                    question: 'question test1',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 2,
                    question: 'question test2',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 3,
                    question: 'question test3',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                }
            ]
        },
        {
            id: 3,
            category: 'Politics',
            name: 'UEFA Champions League',
            voted: true,
            questions: [
                {
                    id: 1,
                    question: 'question test1',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 2,
                    question: 'question test2',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: 3,
                    question: 'question test3',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                }
            ]
        }
    ]
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_SURVEY:
            return {
                ...state,
                surveys: [...state.surveys, action.payload]
            };
        case EDIT_SURVEY:
            return {
                ...state,
                surveys: state.surveys.map(survey => {
                    if (survey.id === action.payload.id) {
                        return action.payload;
                    }
                    return survey;
                })
            };
        case DELETE_SURVEY:
            return {
                ...state,
                surveys: state.surveys.filter(survey => survey.id !== action.payload)
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            };
        default:
            return state;
    }
}
