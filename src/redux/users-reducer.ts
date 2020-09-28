import {ActionsType} from "./store";

enum CONS {
    FOLLOW = 'FOLLOW',
    UNFOLLOW = 'UNFOLLOW',
    SET_USER = 'SET_USER',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
}

type photoType = string | null | undefined

type photosType = {
    large: photoType
    small: photoType
}
export type userType = {
    id: string,
    photo: photosType | null | undefined
    name: string,
    followed: boolean,
    status: string,
}

export type allUsersType = {
    users: Array<userType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number
}





export const FollowAC = (userID: string) => {
    return {
        type: CONS.FOLLOW,
        userID: userID
    } as const
};

export const UnFollowAC = (userID: string) => {
    return {
        type: CONS.UNFOLLOW,
        userID: userID
    } as const
};

export const setUserAC = (users: Array<userType>) => {
    return {
        type: CONS.SET_USER,
        users: users
    } as const
};

export const setCurrentPageAC = (page: number) => {
    return {
        type: CONS.SET_CURRENT_PAGE,
        page: page
    } as const
}

export const setTotalCountAC = (totalCount: number) => {
    return {
        type: CONS.SET_TOTAL_COUNT,
        totalCount: totalCount
    } as const
}


let initialState: allUsersType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1
};

// export type UsersPageActionType =
//     ReturnType<typeof FollowAC> | ReturnType<typeof UnFollowAC> | ReturnType<typeof setUserAC>


const usersReducer = (state: allUsersType = initialState, action: ActionsType) => {
    switch (action.type) {
        case CONS.FOLLOW:
            return (
                {
                    ...state, users: state.users.map(user => {
                        if (user.id === action.userID) {
                            return {...user, followed: true}
                        }
                        return user
                    })
                }
            );
        case CONS.UNFOLLOW:
            return (
                {
                    ...state, users: [...state.users].map(user => {
                        if (user.id === action.userID) {
                            return {...user, followed: false}
                        }
                        return user
                    })
                }
            );
        case CONS.SET_USER: {
            return {...state, users: [...action.users]};
        }
        case CONS.SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.page
            }
        }
        case CONS.SET_TOTAL_COUNT: {
            return {
                ...state, totalUsersCount: action.totalCount
            }
        }
        default:
            return state
    }
}


export default usersReducer;