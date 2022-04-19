import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
import { call } from "./service/ApiService";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //1-1. item -> items 배열로
            items: [
                { id: "ID-0", title: "Hello React", done: true },
            ],
        };
    }

    //2-1. 함수 추가
    componentDidMount() {
        call("/todo", "GET", null).then((response) => 
            this.setState({ item: response.data })
        );
    }

    add = (item) => {
        call("/todo", "POST", item).then((response) => 
            this.setState({ item: response.data })
        );
    };

    delete = (item) => {
        call("/todo", "DELETE", item).then((response) => 
            this.setState({ item: response.data })
        );
    };

    update = (item) => {
        call("/todo", "PUT", item).then((response) => 
            this.setState({ item: response.data })
        );
    };

    render() {
        //1-2. 자바스크립트가 제공하는 map 함수를 이용해 배열을 반복하여 Todo 컴포넌트 생성
        var todoItems = this.state.items.length > 0 && (
            <Paper style={{ margin: 16 }}>
                <List>
                    {this.state.items.map((item, idx) => (
                        <Todo 
                            item={item} 
                            key={item.id} 
                            delete={this.delete} 
                            update={this.update}
                        />
                    ))}
                </List>
            </Paper>
        );
        
        //1-3. 생성된 컴포넌트 리턴
        //2-2. 함수 연결
        return (
            <div className="App">
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className="TodoList">{todoItems}</div>
                </Container>    
            </div>
        );
    }
}

export default App;
