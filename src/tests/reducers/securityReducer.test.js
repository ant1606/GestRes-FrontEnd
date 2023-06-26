import securityReducer from "../../reducers/securityReducer.js";
import types from "../../types/types.js";

describe('securityReducer Tests', () =>{
    test("should return the initialState by default", ()=>{
        const initState = {};
        const state = securityReducer(initState, {});
        expect(state).toBe(initState);
    })

    test("should add new message error", () => {
        const initState = {
            error: {},
        };
        const action = {
            type: types.securityAddError,
            payload: { email:"Debe ingresar el email" }
        };
        const expectMock = {
            error: {
                email:"Debe ingresar el email",
            }
        }

        const state = securityReducer(initState, action);
        expect(state).toEqual(expectMock);
    })

    test("should logged an user", () => {
        const initState = {
            userLogged: false,
            user: {}
        };
        const action = {
            type: types.securityUserIsLogged,
            payload: {
                name: "usuario123",
                email: "usuario@mail.com",
                bearerToken: "token"
            }
        };
        const expectMock = {
            userLogged: true,
            user: {
                name: "usuario123",
                email: "usuario@mail.com",
                bearerToken: "token"
            }
        }

        const state = securityReducer(initState, action);
        expect(state).toEqual(expectMock);
    })

    test("should logout an user", () => {
        const initState = {
            userLogged: true,
            user: {
                name: "usuario123",
                email: "usuario@mail.com",
                bearerToken: "token"
            }
        };
        const action = {
            type: types.securityUserIsLogout,
            payload: { }
        };
        const expectMock = {
            userLogged: false,
            user: {}
        }

        const state = securityReducer(initState, action);
        expect(state).toEqual(expectMock);
    })

    test("should not mutate the state", () => {
        const initState ={
            userLogged: true,
            error: {},
            isLoading: false,
            user: {
                name: "usuario123",
                email: "usuario@mail.com",
                bearerToken: "token"
            }
        }

        const action = {
            type: "doesnt exists",
            payload: {
                userLogged: false,
                user: {
                    name: "newuser",
                    email: "newuser@mail.com",
                    bearerToken: "token123456"
                }
            }
        };

        const state = securityReducer(initState, action);
        expect(state).toEqual(initState);
    })
});