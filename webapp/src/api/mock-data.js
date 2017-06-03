export const userList = [
    {
        userID: 0,
        userdescription: 'hcxowe',
        email: 'hcxowe@126.com',
        password: '111111',
        activity: [
            {
                projectID: '000000',
                description: '日常任务',
                taskList: [
                    {
                        taskID: '000000-1',
                        description: '学习ES6之Promise',
                        status: 1, // 0未开始，1处理中，2完成
                        createTime: '2017-05-01 10:10:10',
                        handleTime: '2017-05-02 10:15:10',
                        finishTime: '',
                        potomaTime: [
                            {
                                year: '2017',
                                mouth: '05',
                                day: '02',
                                startTime: '11:11:11',
                                endTime: '11:36:00',
                                status: 0
                            },
                            {
                                year: '2017',
                                mouth: '05',
                                day: '02',
                                startTime: '12:11:11',
                                endTime: '12:36:00',
                                status: 1
                            }
                        ]
                    },
                    {
                        taskID: '000000-2',
                        description: '学习Http',
                        status: 0, // 0未开始，1处理中，2完成
                        createTime: '2017-05-01 10:10:10',
                        handleTime: '',
                        finishTime: ''
                    }
                ]
            },
            {
                projectID: '111111',
                description: '开发个人博客站点',
                taskList: [
                    {
                        taskID: '111111-1',
                        description: '学习Vue',
                        status: 2,
                        createTime: '2017-05-01 10:10:10',
                        handleTime: '2017-05-02 15:10:10',
                        finishTime: '2017-05-02 16:10:10'
                    },
                    {
                        taskID: '111111-2',
                        description: '学习vue-router',
                        status: 1,
                        createTime: '2017-05-01 10:10:10',
                        handleTime: '2017-05-12 15:10:10',
                        finishTime: '',
                        potomaTime: [
                            {
                                year: '2017',
                                mouth: '05',
                                day: '12',
                                startTime: '11:11:11',
                                endTime: '11:36:00',
                                status: 0
                            },
                            {
                                year: '2017',
                                mouth: '05',
                                day: '12',
                                startTime: '12:11:11',
                                endTime: '12:36:00',
                                status: 1
                            }
                        ]
                    },
                    {
                        taskID: '111111-3',
                        description: '学习Vuex',
                        status: 0,
                        createTime: '2017-05-21 10:10:10',
                        handleTime: '',
                        finishTime: ''
                    }
                ]
            }
        ],
        todoList: [
            {
                projectID: '000000',
                taskID: '000000-1',
                description: '学习ES6之Promise',
                status: 0,
                createTime: '2017-05-01 10:10:10',
                handleTime: '2017-05-02 10:15:10',
                finishTime: '',
                potomaTima: [
                    {
                        year: '2017',
                        mouth: '05',
                        day: '02',
                        startTime: '11:11:11',
                        endTime: '11:36:00',
                        status: 0
                    },
                    {
                        year: '2017',
                        mouth: '05',
                        day: '02',
                        startTime: '12:11:11',
                        endTime: '12:36:00',
                        status: 1
                    }
                ]
            },
            {
                projectID: '111111',
                taskID: '111111-1',
                description: '学习vue-router',
                status: 0,
                createTime: '2017-05-01 10:10:10',
                handleTime: '2017-05-12 15:10:10',
                finishTime: '',
                potomaTima: [
                    {
                        year: '2017',
                        mouth: '05',
                        day: '12',
                        startTime: '11:11:11',
                        endTime: '11:36:00',
                        status: 0
                    },
                    {
                        year: '2017',
                        mouth: '05',
                        day: '12',
                        startTime: '12:11:11',
                        endTime: '12:36:00',
                        status: 1
                    }
                ]
            }
        ]
    }
];