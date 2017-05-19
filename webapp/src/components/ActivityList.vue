<template>
    <div class="wrap">
        <p class="activity-title">活动清单</p>
        
        <div class="input-wrap">
            <input type="text" placeholder="输入项目名称, 输入enter确认添加">
        </div>

        <div class="activity-list">
            <div class="activity-prject">
                <a href="javascript:void(0);" @click="show = !show" class="project-title">
                    日常任务
                    <i class="fa fa-angle-down pull-right" :style="{ transform: 'rotate('+ (show ? 180 : 0) +'deg)' }" aria-hidden="true"></i>
                </a>
                <slide-transition>
                    <ul v-show="show">
                        <li v-for="item in subList">
                            <a href="javascript:void(0);">{{ item }}</a>
                        </li>
                        
                        <input type="text" :style="{ 'font-size': '14px' }" @keyup.enter="onTaskCreate" placeholder="输入具体任务, 输入enter确认添加">
                    </ul>
                </slide-transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActivityList',
        data () {
            return {
                show: false,

                subList: [
                    "一体化指挥管理平台任务",
                    "一体化指挥管理平台任务",
                    "一体化指挥管理平台任务",
                    "一体化指挥管理平台任务"
                ]
            }
        },
        methods: {
            onTaskCreate: function(evt) {
                if (evt.target.value) {
                    this.subList.push(evt.target.value);
                    evt.target.value = '';
                    evt.target.parentNode.style.height = 'auto';
                }
            }
        },
        components: {
            'slide-transition': {
                template:   '<transition name="slide-list"\
                                v-on:before-enter="beforeEnter"\
                                v-on:enter="enter"\
                                v-on:leave="leave">\
                                <slot></slot>\
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
                    },
                    afterEnter: function(el) {
                        console.log('afterEnter');
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

                    a {
                        display: block;
                        text-decoration: none;
                        color: #000;
                        text-align: center;

                        &:hover {
                            color: lightcoral;
                        }
                    }
                }
            }
        }
    }
</style>