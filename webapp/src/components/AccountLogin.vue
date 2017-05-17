<template>
    <div class="wrap">
        <div class="login-container">
            <p class="login-title">番茄时间管理</p>

            <p class="login-login">用户登陆</p>
            <div class="input-wrap">
                <input type="text" placeholder="请输入登录邮箱">
            </div>
            <div class="input-wrap">
                <input type="text" placeholder="请输入登录密码">
            </div>
            <div class="login-msg hidden">
                <p>账号不存在</p>
            </div>
            <div class="input-wrap">
                <button>登录</button>
            </div>

            <div>
                尚未注册? 点击<router-link class="link-sigin" :to="{ name: 'AccountSigin'}">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccountLogin',
        data () {
            return {

            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        padding: 50px;
        width: 100%;
        height: 100%;
    }

    .login-container {
        margin: 0 auto;
        width: 400px; 

        .login-title {
            padding: 30px; 
            margin-bottom: 50px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

        .login-login {
            font-size: 18px;
            color: lightcoral;    
        }
        
        .link-sigin {
            color: lightcoral;
            font-size: 16px;
            outline: 0;
            text-decoration: none;

            &:hover {
                color: lightcoral;
            }
        }

        .login-msg {
            //height: 20px;
        }
    }

    .input-wrap {
        margin-top: 10px;
        margin-bottom: 10px;

        input {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            outline: 0;
            border: 1px solid #ccc;
            border-radius: 4px;
            transition: all .3s;

            &:focus {
                border-color: #2194E6;
                box-shadow: 0 0 5px 0 #ccc;
            }
        }

        button {
            width: 100%;
            padding: 8px;
            font-size: 16px;
            outline: 0;
            color: white;
            border: 1px solid transparent;
            border-radius: 4px;
            transition: all .3s;
            background-color: lightcoral;

            &:hover {
                background-color: #da5454;
                box-shadow: 0 0 5px 0 #ccc;
            }
        }
    }
</style>