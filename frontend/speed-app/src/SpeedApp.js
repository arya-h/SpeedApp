import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import { loadIdeas } from './helpers/loadIdeas';
import { AppRouter } from './router/AppRouter'
import { store } from './store/store';

export const SpeedApp = () => {

    return (
        <Provider store={ store }>
            <AppRouter/>
        </Provider>
    )
}
