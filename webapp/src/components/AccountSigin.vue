<template>
    <div class="login-container">
        <p>用户注册</p>
        <div>
            <input type="text" placeholder="请输入注册用户名">
        </div>
        <div>
            <input type="text" placeholder="请输入注册邮箱">
        </div>
        <div>
            <input type="text" placeholder="请输入注册密码">
        </div>
        <div>
            <button>注册</button>
        </div>

        <div>
            <router-link :to="{ name: 'AccountLogin'}">登录</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccountSigin',
        data () {
            return {

            }
        }
    }
</script>