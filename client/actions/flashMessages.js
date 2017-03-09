export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'

export function addFlashMessage (message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}
