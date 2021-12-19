import React, {useState} from "react";
import s from './TodoList.module.css'
import Task, {TaskType} from "../Task/Task";
import EditableSpan from "../EditableSpan/EditableSpan";
import InputText from "../Input/InputText";
import Button from "../Button/Button";
import {Select, SelectStateType} from "../Select/Select";
import {FilterType} from "../../App";

export type TodoListType = {
   todoList_ID: string
   title: string
   tasks: TaskType[]
   addTaskCallback: (todoList_ID: string, value: string) => void
   removeTaskCallback: (todoList_ID: string, task_ID: string) => void
   removeTodoListCallback: (todoList_ID: string) => void

   stateSelect: SelectStateType
   onClickSelectedItem: () => void
   setSelectItemCallback: (title: FilterType) => void
   onBlurSelectBlockItems: () => void
   setNextValueCallBack: (key: string) => void
   setHoveredItem: (title: FilterType) => void
}

export const TodoList: React.FC<TodoListType> = (
   {
      todoList_ID,
      title,
      tasks,
      addTaskCallback,
      removeTaskCallback,
      removeTodoListCallback,

      setHoveredItem,
      onClickSelectedItem,
      stateSelect,
      onBlurSelectBlockItems,
      setSelectItemCallback,
      setNextValueCallBack
   }
) => {

   const [valueTitle, setValueTitle] = useState<string>(title)
   const [valueTask, setValueTask] = useState<string>("")

   const onChangeTextTitle = (value: string) => setValueTitle(value)
   const onChangeTextTask = (value: string) => setValueTask(value)
   const onClickAddTask = () => {
      addTaskCallback(todoList_ID, valueTask)
      setValueTask("")
   }
   const onClickRemoveTodoList = () => removeTodoListCallback(todoList_ID)

   return (
      <div className={s.todoList}>
         <div className={s.todoList_title_block}>
            <EditableSpan value={valueTitle}
                          spanProps={{children: title ? undefined : valueTitle}}
                          onChangeText={onChangeTextTitle}
                          className={s.title_input}/>
            <Button className={s.title_btn}
                    onClick={onClickRemoveTodoList}>X</Button>
         </div>
         <div className={s.add_task_block}>
            <InputText value={valueTask}
                       onChangeText={onChangeTextTask}
                       className={s.add_task_input}/>
            <Select todoList_ID={todoList_ID}
                    onClickSelectedItem={onClickSelectedItem}
                    setSelectItemCallback={setSelectItemCallback}
                    onBlurSelectBlockItems={onBlurSelectBlockItems}
                    setNextValueCallBack={setNextValueCallBack}
                    setHoveredItem={setHoveredItem}
                    stateSelect={stateSelect}
                    key={todoList_ID}/>
         </div>
         <Button onClick={onClickAddTask}
                 className={s.add_task_button}>Add</Button>
         {tasks.map(t => {

            const onClickRemoveTask = () => removeTaskCallback(todoList_ID, t.task_ID)

            return (
               <div className={s.task_block}>
                  <Task key={t.task_ID}
                        task_ID={t.task_ID}
                        task_title={t.task_title}
                        task_priority={t.task_priority}/>
                  <Button className={s.task_button}
                          onClick={onClickRemoveTask}>X</Button>
               </div>
            )
         })}
      </div>
   )
}