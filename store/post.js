// 同步修改数据 mutations

export const state = () => {
    return {
        draft: []
    }
}

// 同步修改数据 mutations
export const mutations = {
    
    // state就是上面的state，这个参数是固定默认的
    // data使用调用该方法时候传入的数据
    setDraft(state, data){
        state.draft  = data;
    },

    // 清除用户数据
    clearDraft( state ){
        state.draft = []
    }
}


// 异步修改数据 actions
export const actions = {
    
}
