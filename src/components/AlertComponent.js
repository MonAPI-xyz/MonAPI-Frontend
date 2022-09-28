import { h, Fragment } from 'preact';
import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Link,
  useDisclosure
} from '@chakra-ui/react'

function AlertComponent({isButton, displayText, header, body, buttonLeftText, buttonLeftLink, buttonRightText, ButtonRightLink, buttonRightColor}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      { isButton ? (<Button id='button-alert' onClick={onOpen}>{displayText}</Button>) : (<div role='clickable-text' onClick={onOpen}>{displayText}</div>)}
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button id='leftButton-popup' ref={cancelRef} onClick={onClose}>
              <Link href={buttonLeftLink}>{buttonLeftText}</Link>
            </Button>
            <Button id='rightButton-popup' colorScheme={buttonRightColor} ml={3}>
              <Link href={ButtonRightLink}>{buttonRightText}</Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AlertComponent;