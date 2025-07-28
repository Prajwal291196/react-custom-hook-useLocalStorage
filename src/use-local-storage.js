import { useEffect, useState } from "react";
export default function useLocalStorage(keyName, initialValue) {
  // Add your solution here
  const [todos, setTodos] = useState(()=>{
    const a = localStorage.getItem(keyName)
    return a ? JSON.parse(a): initialValue
  })

  useEffect(()=>{
    localStorage.setItem(keyName, JSON.stringify(todos))
  },[todos])

  return [todos, setTodos];
}
