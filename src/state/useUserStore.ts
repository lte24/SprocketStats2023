import create from 'zustand';

export const useUserStore = create( () => ({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    seed: "",
    color:"",
    eventCode: "",
    eventID : "",
}));

export const setUserName = (newUserName: string) => {
    useUserStore.setState({userName: newUserName})
}

export const setFirstName = (newFirstName: string) => {
    useUserStore.setState({firstName: newFirstName})
}

export const setLastName = (newLastName: string) => {
    useUserStore.setState({lastName: newLastName})
}

export const setEmail = (newEmail: string) => {
    useUserStore.setState({email: newEmail})
}

export const setSeed = (newSeed: string) => {
    useUserStore.setState({seed: newSeed})
}

export const setColor = (newColor: string) => {
    useUserStore.setState({color: newColor})
}