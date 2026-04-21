import {UserViewModel} from "../models/view/UserViewModel.js";

export const toUserView = (user: any): UserViewModel => {
    return {
        name: user.name,
        email: user.email,
        age: user.age
    }
}