<template>
    <div class="wrap">
        <p class="today-title">今日任务</p>

        <div class="today-list">
            <ul v-show="type == 'unfinished'">
                <li v-for="task in unfinishList" @click="onTaskClick(task)" :class="{ 'task-active': selTaskID === task.taskID }">
                    <button @click.stop="onBackoutTask(task.projectID, task.taskID)" class="btn btn-danger">撤销</button>
                    <a href="javascript:void(0);">{{ task.description }}</a>
                    <button @click.stop="onFinishTask(task.projectID, task.taskID)" class="btn btn-success pull-right">完成</button>
                </li>
            </ul>
            <ul v-if="type == 'finish'">
                <li v-for="task in finishList" @click="onTaskClick(task)" :class="{ 'task-active': selTaskID === task.taskID }">
                    <a class="text-finish" href="javascript:void(0);">{{ task.description }}</a>
                </li>
            </ul>
        </div>

        <div class="today-type">
            <span :class="{ 'active-type': type == 'unfinished' }" @click="type='unfinished'">未完成</span>
            <span :class="{ 'active-type': type == 'finish' }" @click="type='finish'">已完成</span>
        </div>
    </div>
</template>

<script>
    import * as types from '../store/types.js'

    export default {
        name: 'TodayTask',
        data () {
            return {
                type: 'unfinished',
                selTaskID: null
            }
        },
        computed: {
            finishList: function() {
                let todayTask = [];
                let activity = this.$store.state.userInfo.activity;

                if (activity.length === 0) {
                    return [];
                }

                activity.forEach(function(item) {
                    if (item.taskList) {
                        todayTask = todayTask.concat(item.taskList.filter(function(value) {
                            return value.status == 2 && value.complete == true;   
                        }))
                    }
                }, this);

                return todayTask;
            },
            unfinishList: function() {
                let todayTask = [];
                let activity = this.$store.state.userInfo.activity;

                if (activity.length === 0) {
                    return [];
                }

                activity.forEach(function(item) {
                    if (item.taskList) {
                        todayTask = todayTask.concat(item.taskList.filter(function(value) {
                            return value.status == 1;   
                        }));


                    }   
                }, this);

                return todayTask;
            }
        },

        methods: {
            onBackoutTask: function(projectID, taskID) {
                if (this.$store.state.userInfo.isExecuting) {
                    alert('正在执行番茄钟, 请勿三心二意!');
                    return;
                }
                
                this.$http.post('/api/activity/backoutTask', { 
                    userID: this.$store.state.userInfo.userID, 
                    projectID: projectID,
                    taskID: taskID
                }).then((ret) => {
                    if (ret.body.code != 200) {
                        console.error(ret.body.msg);
                        return;
                    }

                    this.$store.commit(types.BACKOUTTASK, {
                        projectID: projectID,
                        taskID: taskID
                    });
                }, (err) => {
                    console.error(err);
                });

                //this.$store.dispatch(types.BACKOUTTASK, { taskID });
            },

            onFinishTask: function(projectID, taskID) {
                if (this.$store.state.userInfo.isExecuting) {
                    alert('正在执行番茄钟, 请勿三心二意!');
                    return;
                }

                this.$http.post('/api/activity/finishTask', { 
                    userID: this.$store.state.userInfo.userID, 
                    projectID: projectID,
                    taskID: taskID
                }).then((ret) => {
                    if (ret.body.code != 200) {
                        console.error(ret.body.msg);
                        return;
                    }

                    this.$store.commit(types.FINISHTASK, {
                        projectID: projectID,
                        taskID: taskID
                    });
                }, (err) => {
                    console.error(err);
                });

                //this.$store.dispatch(types.FINISHTASK, { taskID });
            },
            onTaskClick: function(task) {
                if (this.$store.state.userInfo.isExecuting) {
                    alert('正在执行番茄钟, 请勿三心二意!');
                    return;
                }

                this.selTaskID = task.taskID;
                this.$store.commit(types.SELECTTASK, task);
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }

    .today-title {
        padding: 5px;
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        margin: 0;
    }

    .task-active {
        background-color: #E6E6E6;
    }

    .today-list {
        position: absolute;
        top: 36px;
        bottom: 40px;
        left: 0;
        right: 0;
        overflow: auto;

        ul {
            list-style: none;
            padding: 0;

            li {
                padding: 5px;
                width: 100%;
                border-bottom: 1px solid #ccc;

                &:hover {
                    background-color: #E6E6E6;
                }
            }
            
            a {
                display: inline-block;
                width: 350px;
                color: #000;
                line-height: 40px;
                text-align: center;
                text-decoration: none;
            }

            button {
                
                height: 40px;
            }
        }

        .text-finish {
            text-decoration: line-through;
            width: 100%;
        }
    }

    .today-type {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        height: 40px;
        border-top: 1px solid #ccc;
        cursor: default;

        span {
            float: left;
            width: 50%;
            height: 100%;
            line-height: 40px;
            text-align: center;

            &:hover {
                background-color: #E6E6E6;
            }
        }

        span + span {
            border-left: 1px solid #ccc;
        }

        .active-type {
            background-color: #E6E6E6;
        }
    }
</style>


