/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'
import { todoList, TodoData, getAllTypes } from '../utils/utils'
import Todo from './Todo'

type timeoutData = {
  name: string,
  timeoutID: number
}

function TodoTest() {
  const [allTodoList, setTodoList] = useState<TodoData[]>(todoList);
  const [selectedTodoList, setSelectedTodoList] = useState<TodoData[]>([]);
  const prevSelectedTodoList = useRef(null);
  const [timeoutData, setTimeoutData] = useState<timeoutData[]>([]);

  useEffect(() => {
    const prevData = prevSelectedTodoList.current;
    if (prevData?.length > selectedTodoList.length) {
      const dataRemoved = prevData?.find((data: TodoData) => !selectedTodoList.includes(data))
      const targetTimeout = timeoutData.find((data: timeoutData) => data.name === dataRemoved?.name)
      if (targetTimeout) {
        setTimeoutData(timeoutData.filter(data => data.name !== targetTimeout.name))
        clearTimeout(targetTimeout.timeoutID);
      }
    }
    prevSelectedTodoList.current = selectedTodoList;
  }, [selectedTodoList])

  const removeItem = (item: TodoData) => {
    setSelectedTodoList((prevDatas) => prevDatas.filter((data: TodoData) => data !== item));
    setTodoList((prevDatas) => {
      const updatedList = prevDatas.filter((data: TodoData) => data !== item);
      return [...updatedList, item];
    });
  };
  const addItem = (item: TodoData) => {
    setSelectedTodoList((prevDatas) => [...prevDatas, item]);
    setTodoList((prevDatas) => prevDatas.filter((data: TodoData) => data !== item));
    const timeoutID = setTimeout(() => {
      removeItem(item);
    }, 5000);
    setTimeoutData([...timeoutData, { name: item.name, timeoutID: timeoutID }])
  };

  return (
    <div className='container'>
      <div className="column-space">
        Todo List
        {
          allTodoList.map((todo: TodoData, index) =>
            <button
              className='todo-button'
              key={`todo-${index}`}
              onClick={() => addItem(todo)}>
              {todo.name}
            </button>)
        }
      </div>
      {
        getAllTypes(todoList).map((todoType, index) =>
          <div className='container column-space' key={`todo-type-${index}`}>
            {todoType}
            <div>
              {selectedTodoList.filter((selectedTodo) => selectedTodo.type === todoType).map((todo, index) =>
                <Todo todo={todo} className='todo-button' key={`todo-type-button-${index}`} removeItem={removeItem} />
              )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default TodoTest
