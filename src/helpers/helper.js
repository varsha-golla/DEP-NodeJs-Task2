const getNewId = (usersArray) => {
    if (usersArray.length > 0) {
        return usersArray[usersArray.length - 1].id + 1;
    }
    return 1;
};

const findUser = (usersArray, id) => {
    return new Promise((resolve, reject) => {
        const user = usersArray.find(userData => userData.id === id);
        if (!user) {
            reject({
                message: `User with ID ${id} is not found!`,
                status: 404
            });
        }
        resolve(user);
    });
};

const sortOnLoginName = (users) => {
    users.sort((user1, user2) => {
        return user1.login.localeCompare(user2.login);
    });
};

const update = (user, newUser) => {
    if (newUser.login) {
        user.login = newUser.login;
    }
    if (newUser.password) {
        user.password = newUser.password;
    }
    if (newUser.age) {
        user.age = newUser.age;
    }
    return user;
};

module.exports = {
    getNewId,
    findUser,
    sortOnLoginName,
    update
};
