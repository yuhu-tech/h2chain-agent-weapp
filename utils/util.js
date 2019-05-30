const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatNumberTime = n => {
  n = n.toString()
  if (Number(n) > 24) {
    n = Number(n) - 24
  }
  return n[1] ? n : '0' + n
}

const formatItemOrigin = item => {
  let temp = new Date(item.originorder.datetime * 1000)
  let tempHour = temp.getHours()
  let tempMinutes = formatNumber(temp.getMinutes())
  let tempTime = `${formatNumber(tempHour)}:${tempMinutes}~${formatNumberTime(tempHour + item.originorder.duration)}:${tempMinutes}`
  item.originorder.date = `${formatTime(temp).slice(0, 10)}`
  item.originorder.time = tempTime
  return item
}

const formatItemModify = item => {
  let temp = new Date(item.modifiedorder[0].changeddatetime * 1000)
  let tempHour = temp.getHours()
  let tempMinutes = formatNumber(temp.getMinutes())
  let tempTime = `${formatNumber(tempHour)}:${tempMinutes}~${formatNumberTime(tempHour + item.modifiedorder[0].changedduration)}:${tempMinutes}`
  item.modifiedorder[0].date = `${formatTime(temp).slice(0, 10)}`
  item.modifiedorder[0].time = tempTime
  return item
}

const selectAvatar = occupation => {
  switch (occupation) {
    case '西餐服务员':
      return '/images/avatar-waiter.jpeg';
    case '西中餐服务员':
      return '/images/avatar-waiter.jpeg';
    case '宴会服务员':
      return '/images/avatar-waiter.jpeg';
    case '大堂吧服务员':
      return '/images/avatar-waiter.jpeg';
    case '迎宾员':
      return '/images/avatar-usher.jpeg';
    case '砧板':
      return '/images/avatar-chef.jpeg';
    case '打荷':
      return '/images/avatar-chef.jpeg';
    case '炒锅':
      return '/images/avatar-chef.jpeg';
    case '凉菜':
      return '/images/avatar-chef.jpeg';
    case '烧腊':
      return '/images/avatar-chef.jpeg';
    case '厨房帮工':
      return '/images/avatar-chef.jpeg';
    case '管事部帮工':
      return '/images/avatar-chef.jpeg';
    default:
      return '/images/avatar-waiter.jpeg'
  }
}

module.exports = {
  formatTime,
  formatNumber,
  formatItemOrigin,
  formatItemModify,
  selectAvatar
}