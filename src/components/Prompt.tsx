import React from 'react'
import {View, PressableProps} from 'react-native'
import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {useTheme, atoms as a} from '#/alf'
import {Text} from '#/components/Typography'
import {Button} from '#/components/Button'

import * as Dialog from '#/components/Dialog'

export {
  useDialogControl as usePromptControl,
  type DialogControl as PromptControl,
} from '#/components/Dialog'

const Context = React.createContext<{
  titleId: string
  descriptionId: string
}>({
  titleId: '',
  descriptionId: '',
})

export function Outer({
  children,
  control,
}: React.PropsWithChildren<{
  control: Dialog.DialogOuterProps['control']
}>) {
  const titleId = React.useId()
  const descriptionId = React.useId()

  const context = React.useMemo(
    () => ({titleId, descriptionId}),
    [titleId, descriptionId],
  )

  return (
    <Dialog.Outer control={control}>
      <Context.Provider value={context}>
        <Dialog.Handle />

        <Dialog.Inner
          accessibilityLabelledBy={titleId}
          accessibilityDescribedBy={descriptionId}
          style={[{width: 'auto', maxWidth: 400}]}>
          {children}
        </Dialog.Inner>
      </Context.Provider>
    </Dialog.Outer>
  )
}

export function Title({children}: React.PropsWithChildren<{}>) {
  const {titleId} = React.useContext(Context)
  return (
    <Text nativeID={titleId} style={[a.text_2xl, a.font_bold, a.pb_sm]}>
      {children}
    </Text>
  )
}

export function Description({children}: React.PropsWithChildren<{}>) {
  const t = useTheme()
  const {descriptionId} = React.useContext(Context)
  return (
    <Text
      nativeID={descriptionId}
      style={[a.text_md, a.leading_snug, t.atoms.text_contrast_high, a.pb_lg]}>
      {children}
    </Text>
  )
}

export function Actions({children}: React.PropsWithChildren<{}>) {
  return (
    <View style={[a.w_full, a.flex_row, a.gap_sm, a.justify_end]}>
      {children}
    </View>
  )
}

export function Cancel({
  children,
}: React.PropsWithChildren<{onPress?: PressableProps['onPress']}>) {
  const {_} = useLingui()
  const {close} = Dialog.useDialogContext()
  return (
    <Button
      variant="solid"
      color="secondary"
      size="small"
      label={_(msg`Cancel`)}
      onPress={close}>
      {children}
    </Button>
  )
}

export function Action({
  children,
  onPress,
}: React.PropsWithChildren<{onPress?: () => void}>) {
  const {_} = useLingui()
  const {close} = Dialog.useDialogContext()
  const handleOnPress = React.useCallback(() => {
    close()
    onPress?.()
  }, [close, onPress])
  return (
    <Button
      variant="solid"
      color="primary"
      size="small"
      label={_(msg`Confirm`)}
      onPress={handleOnPress}>
      {children}
    </Button>
  )
}
