import {render, screen} from "@testing-library/react";
import {MessageInput} from "./MessageInput";
import userEvent from "@testing-library/user-event";
import {ON_SEND_MESSAGE, ON_SET_PRIV_MESSAGE, ON_SET_SELECTED_USER} from "../../modules/threads";

test('should render an element with "Private Message", "User1" and "How you doin?"', () => {
  const _useSelector = (fn) => fn({selectedUser: "User1"})
  const dispatch = () => {}

  render(<MessageInput _useSelector={_useSelector} _useDispatch={dispatch}/>)

  expect(screen.getByText("To: User1")).toBeInTheDocument()
  expect(screen.getByText("Private Message")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("How you doin?")).toBeInTheDocument()
})

test('should render a "Send" and "Cancel button', () => {
  const _useSelector = () => {}
  const dispatch = () => {}

  render(<MessageInput _useSelector={_useSelector} _useDispatch={dispatch}/>)

  expect(screen.getByText("Send").tagName).toBe("BUTTON")
  expect(screen.getByText("Cancel").tagName).toBe("BUTTON")
})

test('should dispatch ON_SET_PRIV_MESSAGE with "Z"', () => {
  const _useSelector = () => {}
  const dispatch = jest.fn()

  render(<MessageInput _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const input = screen.getByPlaceholderText("How you doin?")
  userEvent.type(input, "Z")

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_PRIV_MESSAGE,
    value: "Z"
  })
})


test('should dispatch ON_SEND_MESSAGE when "Send" is clicked', () => {
  const _useSelector = () => {}
  const dispatch = jest.fn()
  const date = new Date().toISOString().substring(0, 10)

  render(<MessageInput _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText("Send")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SEND_MESSAGE,
    value: date
  })


})

test('should dispatch ON_SET_SELECTED_USER with null when "Cancel is pressed', () => {
  const _useSelector = () => {}
  const dispatch = jest.fn()

  render(<MessageInput _useSelector={_useSelector} _useDispatch={() => dispatch}/>)

  const button = screen.getByText("Cancel")
  userEvent.click(button)

  expect(dispatch).toHaveBeenCalledWith({
    type: ON_SET_SELECTED_USER,
    value: null
  })
})