import * as React from 'react'
import { faPlusSquare, faCopy } from '@fortawesome/free-solid-svg-icons'

import ButtonGroup from '../../../../../editor/components/ui/button-group/button-group'

// Note :: I have just realised this shouldn't be a ButtonGroup because that
//         acts as more of a dropdown list replacement for small lists of icons.
//
//         This should be just regular boring buttons instead.

export default () => {
  return <ButtonGroup icons={[faPlusSquare, faCopy]} selected={1} />
}
