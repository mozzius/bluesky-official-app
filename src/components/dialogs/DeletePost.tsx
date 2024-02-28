import React, {memo} from 'react'
import {Trans} from '@lingui/macro'

import * as Prompt from '#/components/Prompt'

let DeletePostPrompt = ({
  control,
  onDeletePost,
}: {
  control: Prompt.PromptControl
  onDeletePost: () => void
}): React.ReactNode => {
  return (
    <Prompt.Outer control={control}>
      <Prompt.Title>
        <Trans>Delete this post?</Trans>
      </Prompt.Title>
      <Prompt.Description>
        <Trans>Are you sure? This cannot be undone.</Trans>
      </Prompt.Description>
      <Prompt.Actions>
        <Prompt.Cancel>
          <Trans>Cancel</Trans>
        </Prompt.Cancel>
        <Prompt.Action onPress={onDeletePost}>
          <Trans>Delete post</Trans>
        </Prompt.Action>
      </Prompt.Actions>
    </Prompt.Outer>
  )
}

DeletePostPrompt = memo(DeletePostPrompt)
export {DeletePostPrompt}
