import { EOrderStatus, EDishStatus } from '../type'

export const categoriesOptions = [
  {
    label: '饺子混沌',
    value: 1,
  },
  {
    label: '汉堡薯条',
    value: 2,
  },
  {
    label: '意面披萨',
    value: 3,
  },
  {
    label: '包子粥店',
    value: 4,
  },
  {
    label: '快餐便当',
    value: 5,
  },
  {
    label: '米粉面馆',
    value: 6,
  },
  {
    label: '麻辣烫冒菜',
    value: 7,
  },
  {
    label: '川湘菜',
    value: 8,
  },
]

export const orderStatusMap = {
  [EOrderStatus.Paid]: '已支付', 
  [EOrderStatus.Production]: '制作中', 
  [EOrderStatus.Delivering]: '配送中', 
  [EOrderStatus.ToBeDelivered]: '待送达',
  [EOrderStatus.Delivered]: '已送达',
  [EOrderStatus.Canceled]: '已取消',
  [EOrderStatus.Refunded]: '已退款',
  [EOrderStatus.Rejected]: '已拒绝',
  [EOrderStatus.Treat]: '待付款',
}

export const dishStatusMap = {
  [EDishStatus.OffShelf]: '已下架',
  [EDishStatus.Sale]: '在售',
}