//power = { 1: "查看菜单", 2: "查看详情", 3: "新增", 4: "修改", 5: "删除", 6: "审核", 7: "上传" }
//options = { MENU: "查看菜单", DETAIL: "查看详情", ADD: "新增", UPDATE: "修改", DELETE: "删除", CHECK: "审核", UPLOAD: "上传" }
import _ from 'lodash'

const menu = [
  //dashboard
  {
    id: _.uniqueId(),
    key: 'dashboard',
    name: '主页',
    icon: 'laptop',
    power: [1, 2]
  },
  //system
  {
    id: _.uniqueId(),
    key: 'system',
    name: '系统管理',
    icon: 'user',
    clickable: false,
    power: [1],
    children: [
      {
        id: _.uniqueId(),
        key: 'user',
        name: '用户管理',
        power: [1, 2, 3, 4, 5]
      },
      {
        id: _.uniqueId(),
        key: 'admin',
        name: '管理员管理',
        power: [1, 2, 3, 4, 5]
      },
      {
        id: _.uniqueId(),
        key: 'role',
        name: '权限管理',
        power: [1, 2, 3, 4, 5]
      }
    ]
  }
]

export default menu
