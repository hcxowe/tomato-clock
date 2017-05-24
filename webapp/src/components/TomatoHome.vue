<template>
    <div class="wrap">
        <div class="header">
            <a href="#" class="header-title">番茄时间管理</a>

            <div class="pull-right">
                <a href="#" class="header-user"></a>
            </div>
        </div>

        <div class="tomato-container">
            <div class="main-content">
                <div class="activity-list">
                    <ActivityList></ActivityList>
                </div>

                <div class="today-tasks">
                    <TodayTask></TodayTask>
                </div>

                <div class="current-task">
                    <CurrentTask></CurrentTask>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types.js'
    import ActivityList from './ActivityList.vue'
    import TodayTask from './TodayTask.vue'
    import CurrentTask from './CurrentTask.vue'

    export default {
        name: 'TomatoHome',
        data () {
            return {

            }
        },
        components: {
            ActivityList,
            TodayTask,
            CurrentTask
        },
        created: function() {
            this.$store.dispatch(types.GETACTIVITYLIST, { userID: this.$store.state.userInfo.userID }).then(()=>{
                
            }, (msg) => {
                alert(msg);
            });
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

    .tomato-container {
        position: absolute;
        top: 65px; left: 0; right: 0; bottom: 0;

        .main-content {
            margin: 0 auto;
            width: 1200px;
            height: 100%;

            .activity-list {
                float: left;
                width: 30%;
                height: 100%;
            }

            .today-tasks {
                float: left;
                width: 40%;
                height: 100%;
            }

            .current-task {
                float: left;
                width: 30%;
                height: 100%;
            }
        }
    }
</style>