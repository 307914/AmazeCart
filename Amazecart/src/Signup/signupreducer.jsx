
export const ACTION_TYPES = {
    NAME: 'name',
    USERNAME: 'username',
    EMAIL: 'email',
    PASSWORD: 'password',
}
export const intialState = {
    name: {
        value: null,
        isValid: null
    },
    username: {
        value: null,
        isValid: null
    },
    email: {
        value: null,
        isValid: null
    },
    password: {
        value: null,
        validation: {
            hasUpperCase: null,
            hasLowerCase: null,
            hasNumber: null,
            hasSpecialCharacter: null,
            meetsMinChReq: null

        }
    }
}
const NAME_PATTERN = /^[A-Z][a-z]+$/
const USERNAME_PATTERN = /^[a-z\d]+$/
const EMAIL_PATTERN = /^[\w_-]+([.+]\w+)?@[a-z]{3,}\.[a-z]{2,}$/

const SignupReducer = (state = intialState, action) => {
    const { type, payload } = action || {};

    switch (type) {
        case ACTION_TYPES.NAME:
            return { ...state, name: { value: payload, isValid: NAME_PATTERN.test(payload) } }

        case ACTION_TYPES.USERNAME:
            return { ...state, username: { value: payload, isValid: USERNAME_PATTERN.test(payload) } }

        case ACTION_TYPES.EMAIL:
            return { ...state, email: { value: payload, isValid: EMAIL_PATTERN.test(payload) } }

        case ACTION_TYPES.PASSWORD:
            return {
                ...state,
                password: {
                    value: payload,
                    validation: {

                        hasUpperCase: /[A-Z]/.test(payload),
                        hasLowerCase: /[a-z]/.test(payload),
                        hasNumber: /[\d]/.test(payload),
                        hasSpecialCharacter: /[\W_]/.test(payload),
                        meetsMinChReq: payload.length >= 8
                    }
                }
            }
        default:
            return state
    }
}
export default SignupReducer;

