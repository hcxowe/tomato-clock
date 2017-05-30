<template>
    <div class="wrap">
        <p class="activity-title">活动清单</p>
        
        <div class="input-wrap">
            <input type="text" placeholder="输入项目名称, 输入enter确认添加" @keyup.enter="onAddProject">
        </div>

        <div class="activity-list">
            <div class="activity-prject" v-for="(activity, index) in activityList">
                <a href="javascript:void(0);" @click="onProjectClick(index);" class="project-title">
                    {{ activity.description }}
                    <i class="fa fa-angle-down pull-right" :style="{ transform: 'rotate('+ (expands[index] ? 180 : 0) +'deg)' }" aria-hidden="true"></i>
                </a>
                <slide-transition>
                    <ul v-show="expands[index]">
                        <li v-for="item in activity.taskList" v-if="item.status==0">
                            <a href="javascript:void(0);">{{ item.description }}</a>
                            <button @click="onExcuteTask(activity.projectID, item.taskID)" class="btn btn-warning pull-right">执行</button>
                        </li>
                        
                        <input type="text" :style="{ 'font-size': '14px' }" @keyup.enter="onTaskCreate($event, activity.projectID)" placeholder="输入具体任务, 输入enter确认添加">
                    </ul>
                </slide-transition>
            </div>
        </div>
    </div>
</template> 

<script>

    import * as types from '../store/types.js'

    export default {
        name: 'ActivityList',
        data () {
            return {
                expands: []
            }
        },
        computed: {
            activityList: function() {
                this.$store.state.userInfo.activity.forEach(function(item, index) {
                    if (typeof this.expands[index] === 'undefined') {
                        this.expands.push(false);
                    }
                }, this);

                return this.$store.state.userInfo.activity;
            }
        },
        methods: {
            onProjectClick: function(index) {
                this.$set(this.expands, index, !this.expands[index]);
            },
            onAddProject: function(evt) {
                let value = evt.target.value;

                if (value.length === 0) {
                    return;
                }

                this.$store.dispatch(types.ADDPROJECT, { userID: this.$store.state.userInfo.userID, description: value }).then(() => {
                    evt.target.value = '';
                }, (msg) => {
                    alert(msg);
                });
            },
            onTaskCreate: function(evt, projectID) {
                let value = evt.target.value;

                if (!value) {
                    return;
                }

                this.$store.dispatch(types.ADDTASK, { userID: this.$store.state.userInfo.userID, projectID, description: value }).then(() => {
                    evt.target.value = '';
                    evt.target.parentNode.style.height = 'auto';
                }, (msg) => {
                    alert(msg);
                });
            },
            onExcuteTask: function(projectID, taskID) {
                console.log(`projectID: ${projectID}, taskID: ${taskID}`);
                this.$store.dispatch(types.EXCUTETASK, {projectID, taskID});
            }
        },
        components: {
            'slide-transition': {
                template:   '<transition name="slide-list" \
                                v-on:before-enter="beforeEnter" \
                                v-on:enter="enter" \
                                v-on:after-enter="afterEnter" \
                                v-on:leave="leave"> \
                                <slot></slot> \
                            </transition>',
                data: function() {
                    return {
                        height: 0
                    }
                },
                methods: {
                    beforeEnter: function(el) {
                        el.style.height = '0px';
                    },
                    enter: function(el, done) {
                        el.style.height = 'auto';
                        var height = el.getBoundingClientRect().height;

                        el.style.height = '0px';
                        var f = document.body.offsetHeight;
                        el.style.height = height + 'px';

                        done();
                    },
                    afterEnter: function(el) {
                        console.log('afterEnter');
                        setTimeout(()=>{el.style.height = 'auto'}, 600);
                    },
                    beforeLeave: function(el) {
                        console.log('beforeLeave');
                    },
                    leave: function(el, done) {
                        var height = el.getBoundingClientRect().height;
                        el.style.height = height + 'px';
                        var f = document.body.offsetHeight;
                        el.style.height = '0px';
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .wrap {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
    }
    .activity-title {
        padding: 5px;
        text-align: center;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        margin: 0;
    }

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

    .input-wrap {
        padding-bottom: 1px;
        margin: 1px;
        border-bottom: 1px solid #ccc;
    }

    .activity-list {
        padding: 1px;

        .activity-prject {
            border: 1px solid #ccc;
            position: relative;
            margin-bottom: 2px;

            .project-title {
                display: block;
                padding: 5px;
                color: #000;
                font-size: 16px;
                text-decoration: none;
                border-bottom: 1px solid #ccc;
                z-index: 2;
                
                &:hover {
                    background-color: #E6E6E6;
                }

                .fa-angle-down {
                    font-size: 18px;
                    vertical-align: middle;
                    line-height: 23px;
                    transform: rotate(0deg);
                    transition: all .5s;
                }

                
            }
            ul {
                margin: 0;
                overflow: hidden;
                transition: all .5s;
                list-style: none;
                padding: 0;

                li {
                    padding: 5px;
                    border-bottom: 1px solid #ccc;

                    &:hover {
                        background-color: #E6E6E6;
                    }

                    a {
                        display: inline-block;
                        width: 285px;
                        line-height: 40px;
                        text-decoration: none;
                        color: #000;
                        text-align: center;
                    }

                    button {
                        width: 54px;
                        color: #fff;
                        background-color: #f0ad4e;
                        border-color: #eea236;

                        &:hover {
                            color: #fff;
                            background-color: #ec971f;
                            border-color: #d58512;
                        }
                    }
                }
            }
        }
    }
</style>