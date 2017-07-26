import map from '../../map'
import { IContext, Context } from './context'
import { INamable, Namable } from './namable'
import { IGroup, group } from './group'
import * as helpers from '../helpers/common'

export interface IComp extends INamable {
  index(value?: boolean): this
  indexUnique(value?: boolean): this
  group(value?: boolean): this
  groupSingle(value?: boolean): this
}

export class Comp extends Namable implements IComp {
  contextValue: IContext
  isFakeValue: boolean
  fieldValue: string
  indexValue: boolean
  indexUniqueValue: boolean
  groupValue: IGroup
  isCompValue: boolean = true

  constructor(field?: string, name: string = '') {
    super('', '', 'Component')
    this.fieldValue = field
  }

  index(value: boolean = true) {
    if (!this.fieldValue) helpers.messageRobot.message(`It\'s impossible to create index from flag component`, `${this.moduledClassNameValue}`)
    else this.indexValue = value
    return this
  }

  indexUnique(value: boolean = true) {
    this.index(true)
    if (this.indexValue) this.indexUniqueValue = value

    return this
  }

  group(value: boolean = true) {
    this.groupValue = group(this, this.nameValue)
    return this
  }

  groupSingle(value: boolean = true) {
    this.groupValue = group(this, this.nameValue).single()
    return this
  }
}

export function comp(field?: string, name: string = ''): IComp {
  let el = new Comp(field, name)
  map.AddModule(el.moduleNameValue, 'comps', el, false)
  return el
}
