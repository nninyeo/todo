function Todo(props){
    return (
        
        <div className="todo" key={props.todo.id}>  {/* 키 안걸면 작동은되나 에러뜸 (key prop 어쩌구에러) */}           
        <h3>
          <label 
            className= {props.todo.completed ? "completed" : null}
            onClick={props.handleClick}> {/* 빈 함수로 실행되게해줘야 실행됨 */}  
            {props.todo.todoName}
          </label>
          <label onClick={props.handleDelete}>&nbsp;&nbsp;&nbsp;❌ </label>
        </h3>
        
      </div>
    )
}
export default Todo;