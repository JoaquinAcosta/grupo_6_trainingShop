const fs = require('fs');
const path = require('path');

const loadUsers = () => {
    const usersFilePath = path.join(__dirname, 'usersDataBase.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
    /* return JSON.parse(fs.readFileSync(path.join(__dirname, 'usersDataBase.json'),'utf-8')); */
};

const storeUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, 'usersDataBase.json'),JSON.stringify(users,null,3),'utf-8');    
}

module.exports = {
    loadUsers,
    storeUsers
}



