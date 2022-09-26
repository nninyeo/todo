import React, { useState, useEffect } from "react"; //필수. hook을 위해 useState . useEffect는 첨실행시 뭔가해주는거.
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {  //앱실행시 가장먼저 App()만들어주는 컴퐇넌트
  const baseurl = "http://localhost:8080"

  //이건 입력되는걸 상태로 받기위해
  const [input, setInput] = useState(""); //인풋 받아서 상태관리.
  const [todos, setTodos] = useState([]); //할일들 받아서 상태관리.

  useEffect(() => { //앱 실행시 처음에 1번만 실행되게해. 
    getTodos();     //즉, 이거 주석처리시 처음에 목록이 안나옴,.
  }, []);

  async function getTodos() {
    await axios //axios를 호출해서 await해줌.
      .get(baseurl + "/todo") //아래처럼 계속 이어주는게 체인징메소드.
      .then((response) => {
        console.log(response.data)
        setTodos(response.data);  //받은걸 상태관리할수있게 그쫙에 넣어줌.
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function insertTodo(e){
    e.preventDefault(); //(여기서는)html자체submit기능을 막음.

    const insertTodo = async () => {
      await axios
          .post(baseurl + "/todo", {
            todoName: input   //json형식의 객체넣어줌, 아까 저 input을 넣으면됨
          })
          .then((response) => {
            console.log(response.data)
            setInput("");//칸 비워주기
            getTodos(); //F5
          })
          .catch((error) => {
            console.error(error);
          })
    }
      
    insertTodo();
    console.log("할일추가됨");
  }

  function updateTodo(id){
    const updateTodo = async() => {
      await axios
        .put(baseurl + "/todo/" + id, {})
        .then((response) => {
          console.log(response.data)
          //getTodos(); //F5는 서버쪽에서는 노필요. 클라단에서 F5할건데 setTodos로 화면에서만 바꿔줄거임.
          setTodos(
            todos.map((todo) => 
              todo.id === id ? { ...todo, completed: !todo.completed} : todo
              //루프돌려서 id끼리 비교해서 맞으면, { todo는 냅두고,, todo에 상태가 완료면 미완료로 그 반대로..}
            )
          )
        })
        .catch((error) => {
          console.error(error);
        })
        
    }
    updateTodo();
    console.log("할일변경됨");
  }

  
  function deleteTodo(id){
    const deleteTodo = async() => {
      await axios
        .delete(baseurl + "/todo/" + id, {})
        .then((response) => {
          console.log(response.data)
          //getTodos(); //F5는 서버쪽에서는 노필요. 클라단에서 F5할건데 setTodos로 화면에서만 바꿔줄거임.
          setTodos(
            todos.filter((todo) => todo.id !== id) 
          )
        })
        .catch((error) => {
          console.error(error);
        })
        
    }
    deleteTodo();
    console.log(id + "번이가 삭제됨");
  }

  function changeText(e){ //이벤트를 e로받고
    e.preventDefault();   //이건 e이벤트가 따른짓을 못하게 막아주는거고
    setInput(e.target.value)  //state를 통해 바뀐것만 밸류로 들어오게하는것. const [input, setInput] = useState("");
    //state에 e.target.value를 받아서 셋해주면 상태가 변경됨.

   // console.log(value)
  }

  return (  //여기가 이제 html요소 들어가는곳
    <div className="App">
      <h1>TODO LIST</h1>
      
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText} />
      {/* input폼 있던 자리, props를 통해 속성을 input.js로 내려줄거다. */}

      {
        todos 
        ? todos.map((todo) => { //map으로 반복하면서 배열갯수만큼 찍어줌.
          return (
            // 반복출력부분 분리를 위해 뺌
            <Todo key={todo.id} todo={todo} handleClick={() => updateTodo(todo.id)} handleDelete={() => deleteTodo(todo.id)} />
          )
        })
         : null
      }

    </div>
  );
}

export default App;
