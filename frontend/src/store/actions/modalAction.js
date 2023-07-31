import { actions } from '../../utils/constants'

export const openModal = ({ component, size = 'md', title, confirmText = "Submit", resetText = "Cancel", onCancle, onConfirm }) => {
  return { type: actions.OPEN_MODAL, component, size , title, confirmText, resetText, onCancle, onConfirm}
}
export const closeModal = () => {
  return { type: actions.CLOSE_MODAL }
}
