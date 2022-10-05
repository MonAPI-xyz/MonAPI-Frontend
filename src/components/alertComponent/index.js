import { h, Fragment } from 'preact';
import {useRef} from 'preact/hooks';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react'

function AlertComponent({isButton, displayText, header, body, buttonLeftText, buttonRightText, popupOpen, setPopupOpen, onSubmit, buttonRightColor}) {
  const cancelRef = useRef()
  return (
    <>
      { isButton ? (<Button id='button-alert' onClick={() => {setPopupOpen(true)}}>{displayText}</Button>) : 
        (<div role='clickable-text' onClick={() => {setPopupOpen(true)}}>{displayText}</div>)}
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={() => {setPopupOpen(false)}}
        isOpen={popupOpen}
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
            <Button id='leftButton-popup' ref={cancelRef} onClick={() => {setPopupOpen(false)}}>
              {buttonLeftText}
            </Button>
            <Button id='rightButton-popup' colorScheme={buttonRightColor} onClick={onSubmit} ml={3}>
              {buttonRightText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AlertComponent;