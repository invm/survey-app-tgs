import { CREATE_SURVEY } from '../actions/types';
import uuid from 'uuid';

const initialState = {
    surveys: [
        {
            id: uuid.v4(),
            category: 'Football',
            name: 'UEFA Champions League',
            voted: true,
            questions: [
                {
                    id: uuid.v4(),
                    question: 'question test1',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: uuid.v4(),
                    question: 'question test2',
                    answers: [
                        { id: 0, answer: '1', count: 1 },
                        { id: 1, answer: '2', count: 2 },
                        { id: 2, answer: '3', count: 3 },
                        { id: 3, answer: '4', count: 4 }
                    ]
                },
                {
                    id: uuid.v4(),
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
    ],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_SURVEY:
            return {
                ...state,
                surveys: [...state.surveys, action.payload],
                loading: false
            };
        default:
            return state;
    }
}
