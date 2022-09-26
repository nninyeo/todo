function Input(props){
    return(


        // 원래 {insertTodo}
        <form onSubmit={props.handleSubmit}>    
            <label>
                Todo &nbsp; 
                <input type="text" required={true} value={props.input} onChange={props.handleChange} />
                <input type="submit" value="Create"/>
            </label>
        </form>

    )
}


export default Input;