import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
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
    add = (item) => {
        const thisItems = this.state.items;
        item.id = "ID-" + thisItems.length; //key를 위한 id 추가
        item.done = false;  //done 초기화
        thisItems.push(item);   //리스트에 아이템 추가
        this.setState({ items: thisItems });    //업데이트는 반드시 this.setState로 해야됨
        console.log("items : ", this.state.items);
    }

    delete = (item) => {
        const thisItems = this.state.items;
            console.log("Before Update Items : ", this.state.items);
        const newItems = thisItems.filter(e => e.id !== item.id);
        this.setState({ items: newItems }, () => {
            //디버깅 콜백
            console.log("Update Items : ", this.state.items)
        });
    }

    componentDidMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        fetch("http://localhost:8080/todo", requestOptions)
            .then((response) => response.json())
            .then(
                (response) => {
                    this.setState({
                        items: response.data,
                    });
                },
                (error) => {
                    this.setState({
                        error,
                    });
                }
            ); 
    }

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
