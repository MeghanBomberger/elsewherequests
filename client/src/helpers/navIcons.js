import QuestGiverIcon from '../assets/peasant.png'
import QuestIcon from '../assets/quest.png'
import MobsIcon from '../assets/cthulhu.png'
import ItemsIcon from '../assets/diamonds.png'
import ModsIcon from '../assets/tools.png'
import EntityShapes from '../assets/shapes.png'

export const navIcons = [
  {
    icon: QuestGiverIcon,
    path: '/questgivers',
    title: 'Quest Givers',
  },
  {
    icon: EntityShapes,
    path: '/entityshapes',
    title: 'Entity Shapes',
  },
  {
    icon: QuestIcon,
    path: '/quests',
    title: 'Quests',
  },
  {
    icon: MobsIcon,
    path: '/mobs',
    title: 'Mobs',
  },
  {
    icon: ItemsIcon,
    path: '/items',
    title: 'Items',
  },
  {
    icon: ModsIcon,
    path: '/mods',
    title: 'Mods',
  }
]
