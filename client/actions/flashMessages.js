export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'
export const DELETE_ALL_FLASH_MESSAGES = 'DELETE_ALL_FLASH_MESSAGES'

export function addFlashMessage (message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function deleteFlashMessage (id) {
  return {
    type: DELETE_FLASH_MESSAGE,
    id
  }
}
