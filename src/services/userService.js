import { apiCredentials } from "../utilities/api";

export const fetchUser = async () => {
    const response = await fetch(
        `${apiCredentials.BASE_URL}/users`,
        {
            credentials: "include",
        }
    );
    return response;
}

export const searchUser = async (query) => {
    const response = await fetch(
        `${apiCredentials.BASE_URL}/users/search?query=${query}`,
        {
            credentials: "include",
        }
    );
    return response;
};

export const addUser = async (user) => {
    const { username, role } = user;

    const response = await fetch(
        `${apiCredentials.BASE_URL}/users/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, role }),
            credentials: "include",
        }
    );
    return response;
}

export const updateUser = async (user, id) => {
    const { username, password, role } = user;

    const response = await fetch(
        `${apiCredentials.BASE_URL}/users/update/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, role }),
            credentials: "include",
        }
    );
    return response;
}

export const deleteUser = async (id) => {
    const response = await fetch(
        `${apiCredentials.BASE_URL}/users/delete/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        }
    );
    return response;
}

export const changePassword = async (currentPassword, newPassword) => {
    const response = await fetch(
        `${apiCredentials.BASE_URL}/users/change-password`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentPassword, newPassword }),
            credentials: "include",
        }
    );
    return response;
}