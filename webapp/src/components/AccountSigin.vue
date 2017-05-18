<template>
    <div class="wrap">
        <div class="login-container">
            <p class="login-title">番茄时间管理</p>

            <p class="login-login">用户注册</p>
            <div class="input-wrap">
                <input type="text" v-model="userName" @keyup="siginUser" placeholder="请输入用户名称">
            </div>
            <div class="input-wrap">
                <input type="text" v-model="email" @keyup="siginUser" placeholder="请输入登录邮箱">
            </div>
            <div class="input-wrap">
                <input type="password" v-model="password" @keyup="siginUser" placeholder="请输入登录密码">
            </div>
            <div class="login-msg hidden">
                <p>注册失败</p>
            </div>
            <div class="input-wrap">
                <button @click="siginUser">注册</button>
            </div>

            <div>
                已有账号? 点击<router-link class="link-login" :to="{ name: 'AccountLogin'}">登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>

    import * as types from '../store/types.js'

    export default {
        name: 'AccountSigin',
        data () {
            return {
                userName: '',
                email: '',
                password: ''
            }
        },
        methods: {
            siginUser: function() {
                var self = this;
                this.$store.dispatch(types.SIGINUSER, { 
                    userName: this.userName, 
                    email: this.email, 
                    password: this.password
                }).then(() => {
                    alert(创建成功);
                    self.$router.replace({ name: 'AccountLogin' });
                }, (msg) => {
                    alert(msg);
                    self.$router.replace({ name: 'AccountLogin' });
                })
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
        
        .link-login {
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