import { createStore } from 'vuex'
import login from "./login"
import message from './message'

const store = createStore({

    modules: {
        login,
        message
    }

})

export default store