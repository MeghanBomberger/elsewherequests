import {
  Item
} from './helpers/types'

export const gatherItemCodeTemplate = ({
  id = "UNKNOWN",
  attributes = []
}: Item): string =>`${id}${attributes?.map(attribute => `-${attribute}`)}`

export const rewardItemCodeTemplate = ({
  id = "UNKNOWN",
  mod = "game",
  attributes = [],
  name = "UKNOWN"
}: Item): string => `${mod}:${gatherItemCodeTemplate({id, attributes, name, mod})}`
