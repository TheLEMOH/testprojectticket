
const state = {
    message: null
}

const actions = {
    UpdateMessage(ctx, value) {
        ctx.commit('UpdateMessage', value)
    }
}

const mutations = {
    UpdateMessage(state, value) {
        state.message = value
    }
}

const getters = {
    message(state) {
        return state.message
    }
}

export default { state, actions, mutations, getters }