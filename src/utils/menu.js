// 递归整理菜单结构
export function handleMenus (children, target) {
  let menus = []
  recursiveMenus(children, menus)
  return menus
}
function recursiveMenus (children, arr, key) {
  children.forEach((child, index) => {
    arr.push({
      title: child.title,
      icon: child.icon ? child.icon : 'table',
      path: child.activeRule ? '/' + child.target : '',
      key: (key ? key + '-' + index : index).toString(),
      children: []
    })
    // 当存在次级菜单，继续递归处理
    if (child.children && child.children.length) {
      recursiveMenus(child.children, arr[index].children, arr[index].key)
    }
  })
}
// 计算各个微应用路由
export function generateRoutes (data) {
  let routes = {}
  recursiveRoutes(data, routes)
  return routes
}
function recursiveRoutes (data, map) {
  data.forEach((item, index) => {
    // 如果当前数据存在activeRule，则证明其为子应用的页面
    let key = item.activeRule.replace(/[/]/g, '')
    if (key) {
      if (!map[key]) map[key] = []
      map[key].push(item)
    }
    // 如果当前存在
    if (item.children && item.children.length) {
      recursiveRoutes(item.children, map)
    }
  })
}
// 计算菜单openKeys
export function generateOpenKeys (key) {
  let openKeys = []
  let keys = key.split('-')
  for (let i = 0; i < keys.length; i++) {
    let temp = _.cloneDeep(keys)
    openKeys.push(temp.splice(0, i + 1).join('-'))
  }
  return openKeys
}
// 过滤当前系统的菜单
export function filterMenus (data, activeRule) {
  // console.log(data, activeRule)
  // let menus = []
  return data
}
