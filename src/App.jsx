import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin2Line } from "react-icons/ri";

const TaskCard = (props) => {
  const labelRefs = useRef({})

  function handleCheck(id, e) {
    const label = labelRefs.current[id]

    if (!label) return

    if (e.target.checked) {
      label.classList.add("line-through", "text-green-400")
    } else {
      label.classList.remove("line-through", "text-green-400")
    }
  }

  return (
    props.task.map((data)=>(
      
        <div key={data.id} className="flex mt-3 px-5 py-2 border border-[#bdb7b7] border-x-white justify-between items-center ">
      <div className="flex gap-3">
        <input onChange={(e)=> handleCheck(data.id, e)} type="checkbox" className="cursor-pointer" />
        <label ref={(el)=>(labelRefs.current[data.id] = el)} htmlFor={data.id} className="">{data.task}</label>
      </div>
      <div className="bg-[#8b8e8f] rounded-full p-2 cursor-pointer">
        <RiDeleteBin2Line  />
      </div>
      </div>
    ))
    
  )
}

export const App = () => {
  const {handleSubmit, register, reset} = useForm()
  const [todo, setTodo] = useState([])

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("todoApps")) || []
    setTodo(savedTask)
  }, [])

  function addTask(value) {
    const newTask = {
      id: todo.length +1,
      task: value.task,
    }

    const updatedTasks = [...todo, newTask]
    setTodo(updatedTasks)
    localStorage.setItem("todoApps", JSON.stringify(updatedTasks))

    reset() 
  }

  return (
    <div className="flex flex-col gap-5 items-center bg-[#5a116f] min-w-screen min-h-screen py-10">

      {/* title  */}
      <div className="w-[70%] bg-white text-black rounded-xl p-10 flex justify-center text-5xl font-bold">
        <h1>Todo List</h1>
      </div>

      {/* container  */}
      <div className="w-[70%] min-h-[60vh] bg-white text-black rounded-xl p-10">

        {/* input todo  */}
        <div className="flex gap-3">
          <input 
          {...register("task")}
          type="text" 
          placeholder="Create your task here" 
          id="addtask" 
          className="w-full border border-[#bdb7b7] px-5 py-2 rounded-xl" />
          {/* add button  */}
          <button onClick={handleSubmit(addTask)} className="bg-[#5a116f] px-4 py-2 text-white rounded-xl cursor-pointer">add</button>
        </div>

        {/* task card  */}
        <TaskCard task={todo} />

      </div>
    </div>
  )
}
