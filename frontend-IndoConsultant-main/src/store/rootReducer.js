import { combineReducers } from "redux";

const portfoliosState = {
    portfolios: [],
    loading: true
}

const ruangLingkupState = {
    ruangLingkup: [],
    loading: true
}

const outputState = {
    output: [],
    loading: true
}

const carouselsState = {
    carousels: [],
    loading: true
}

const newsState = {
    news: [],
    loading: true
}

const portfoliosReducer = (state = portfoliosState, actions) => {
    switch (actions.type) {
        case 'portfolios/get':
            return {
                ...state,
                portfolios: actions.payload,
                loading: false
            }
        case 'portfolios/create':
            return {
                ...state,
                portfolios: [...state.portfolios, actions.payload],
            };
        case 'portfolios/delete':
            return {
                ...state,
                portfolios: state.portfolios.filter(item => item.id !== actions.payload),
            };
        default:
            return state;
    }
}

const ruangLingkupReducer = (state = ruangLingkupState, actions) => {
    switch (actions.type) {
        case 'ruangLingkup/get':
            return {
                ...state,
                ruangLingkup: actions.payload,
                loading: false
            };
        case 'ruangLingkup/create':
            return {
                ...state,
                ruangLingkup: [...state.ruangLingkup, ...actions.payload],
            };
        default:
            return state;
    }
};

const outputReducer = (state = outputState, actions) => {
    switch (actions.type) {
        case 'output/get':
            return {
                ...state,
                output: actions.payload,
                loading: false
            };
        case 'output/create':
            return {
                ...state,
                output: [...state.output, ...actions.payload],
            };
        default:
            return state;
    }
};


const carouselsReducer = (state = carouselsState, actions) => {
    switch (actions.type) {
        case 'carousels/get':
            return {
                ...state,
                carousels: actions.payload,
                loading: false
            }
        case 'carousels/create':
            return {
                ...state,
                carousels: [...state.carousels, actions.payload],
            };

        default:
            return state;
    }
}

const newsReducer = (state = newsState, action) => {
    switch (action.type) {
        case 'news/get':
            return {
                ...state,
                news: action.payload,
                loading: false,
            };
        case 'news/create':
            return {
                ...state,
                news: [...state.news, action.payload],
            };
        case 'news/update':
            return {
                ...state,
                news: state.news.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case 'news/delete':
            return {
                ...state,
                news: state.news.filter(item => item.id !== action.payload),
            };
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    portfolios: portfoliosReducer,
    ruangLingkup: ruangLingkupReducer,
    output: outputReducer,
    carousels: carouselsReducer,
    news: newsReducer
})

export default rootReducer