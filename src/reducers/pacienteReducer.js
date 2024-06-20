export const pacienteReducer = (state = [], action) =>{
    switch (action.type) {
        case "crear":
            return [...state, action.payload]
        case "borrar":
            return state.filter(paciente => paciente.id !== action.payload)
        default:
            return state;
    }
}