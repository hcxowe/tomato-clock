import * as data from './mock-data'

const delay = 1000;

export const siginUser = (userName, email, password, callback) => {
    setTimeout(()=>{

        let userList = data.userList;
        for (let i=0, size=data.userList.length; i < size; i++) {
            if (userList[i].email === email) {
                callback({
                    ret: -1,
                    message: '邮箱已注册'
                });

                return;
            }
        }

        userList.push({
            userID: userList.length,
            userName,
            email,
            password
        });

        callback({
            ret: 0,
            message: 'success'
        })
    }, delay);
}

export const login = (email, password, callback) => {
    setTimeout( () => {
        let userList = data.userList;
        for (let i=0, size=data.userList.length; i < size; i++) {
            if (userList[i].email === email) {
                if (userList[i].password === password) {
                    callback({
                        ret: 0,
                        message: 'success',
                        body: {
                            userInfo: userList[i]
                        }
                    });
                }
                else {
                    callback({
                        ret: 100,
                        message: '密码输入错误'
                    });
                }

                return;
            }
        }

        callback({
            ret: 404,
            message: '账号不存在'
        });
    }, delay);
}