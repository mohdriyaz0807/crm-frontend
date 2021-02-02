const INITIAL_STATE = {usertype : JSON.parse(localStorage.getItem("userDetails")) }

const userReducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case "SET_USER_TYPE" :
            return {
                ...state ,
                usertype : action.payload
            }
        default :
            return state
        }
}

export default userReducer