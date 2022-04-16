import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //1. item -> items 배열로
            items: [
                { id: "0", title: "Hello World 1", done: true },
                { id: "1", title: "Hello World 2", done: false },
            ],
        };
    }

    render() {
        //2. 자바스크립트가 제공하는 map 함수를 이용해 배열을 반복하여 Todo 컴포넌트 생성
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo item={item} key={item.id} />
                    ))}
                </List>
            </Paper>
        );
        
        //3. 생성된 컴포넌트 리턴
        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo />
                    <div className="TodoList">{todoItems}</div>
                </Container>    
            </div>
        );
    }
}

export default App;
