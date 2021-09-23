export function handleMenus (children, target) {
  let menus = []
  recursiveMenu(children, menus)
  return menus
}

function recursiveMenu (children, arr, key) {
  children.forEach((child, index) => {
    arr.push({
      title: child.title,
      icon: child.icon ? child.icon : 'table',
      path: child.activeRule ? child.activeRule + child.target : '',
      key: (key ? key + '-' + index : index).toString(),
      children: []
    })
    // 当存在次级菜单，继续递归处理
    if (child.children && child.children.length) {
      recursiveMenu(child.children, arr[index].children, arr[index].key)
    }
  })
}

export function generateOpenKeys (key) {
  let openKeys = []
  let keys = key.split('-')
  for (let i = 0; i < keys.length; i++) {
    let temp = _.cloneDeep(keys)
    openKeys.push(temp.splice(0, i + 1).join('-'))
  }
  return openKeys
}
