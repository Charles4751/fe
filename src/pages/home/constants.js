import { EMenuItem, ECategorys } from './types'
import { OrderManage, ShopManage } from './components'

export const MenuMap = {
  [EMenuItem.Shop]: <ShopManage />,
  [EMenuItem.Order]: <OrderManage />,
}

export const categoriesOptions = [
  {
    label: '饺子混沌',
    value: ECategorys.DumplingChaos,
  },
  {
    label: '汉堡薯条',
    value: ECategorys.HamburgFries,
  },
  {
    label: '意面披萨',
    value: ECategorys.SpaghettiPizza,
  },
  {
    label: '包子粥店',
    value: ECategorys.SteamedBunCongee,
  },
  {
    label: '快餐便当',
    value: ECategorys.FastFoodBento,
  },
  {
    label: '米粉面馆',
    value: ECategorys.RiceNoodles,
  },
  {
    label: '麻辣烫冒菜',
    value: ECategorys.SpicyHotPotMaocai,
  },
  {
    label: '川湘菜',
    value: ECategorys.SichuanHunanCuisine,
  },
]