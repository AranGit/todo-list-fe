/* eslint-disable @typescript-eslint/no-explicit-any */
import { TodoData } from '../utils/utils';

function Todo({ todo, removeItem, className }: { todo: TodoData, removeItem: any, className: string }) {

  return (
    <button className={`todo-button ${className}`} onClick={() => removeItem(todo)}>
      {todo.name}
    </button>
  )
}

export default Todo
