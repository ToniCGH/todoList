import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test("my to-do list header is rendered", () => {
  render(<App />);
  const element = screen.getByText("My To-Do List");
  expect(element).toBeInTheDocument();
});

test("input element is displayed", () => {
  render(<App />)
  let element = screen.getByPlaceholderText("Enter new task...")
  expect(element).toBeInTheDocument()
})

test("input is rendered", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText("Enter new task...")
  fireEvent.change(inputElement, { target : { value: "walk the dog" }})
  expect(inputElement.value).toBe("walk the dog")
})

test("input is added to list when add task button is clicked", () => {
  render(<App />)
  const inputElement = screen.getByPlaceholderText("Enter new task...")
  fireEvent.change(inputElement, { target : { value: "walk the dog" }})
  const submit = screen.getByText("Add task")
  fireEvent.click(submit)
  const submittedInput = screen.getByText("walk the dog")
  expect(submittedInput).toBeInTheDocument()
})

test("item has strikethrough when clicked to mark as complete", () => {
  render(<App />);
  const element = screen.getByText("Change bedding");
  fireEvent.click(element)
  expect(element).toHaveClass("strike")
});

test("items are removed when clear completed tasks button is clicked, if they are marked as complete", () => {
  render(<App />);
  const element = screen.getByText("Feed the cat")
  const element2 = screen.getByText("Clear completed tasks")
  fireEvent.click(element2)
  expect(element).not.toBeInTheDocument()
});
