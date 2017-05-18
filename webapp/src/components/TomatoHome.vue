<template>
    <div class="wrap">
        <div class="header">
            <a href="#" class="header-title">番茄时间管理</a>

            <div class="pull-right">
                <a href="#" class="header-user"></a>
            </div>
        </div>

        
    </div>
</template>

<script>
    export default {
        name: 'TomatoHome',
        data () {
            return {

            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .header {
        position: fixed;
        top: 0; left: 0;right: 0;
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        box-shadow: 0 0 5px -3px #000;
        background-color: rgba(255, 255, 255, .7);

        .header-title {
            color: #000;
            font-size: 18px;
            text-decoration: none;
            line-height: 40px;
            vertical-align: middle;
        }

        .header-user {
            display: inline-block;
            width: 40px;
            height: 40px;
            background-image: url(/static/user-small.png);
            background-size: contain;

            border-radius: 50%;
            box-shadow: 0 0 5px -1px #000;
        }
    }
</style>