import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import { call, signout } from "./service/ApiService";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //1-1. item -> items 배열로
            items: [],
            /* (1) 로딩 중이라는 상태를 표현할 변수. 생성자에 상태 변수를 추가한다. */
            loading: true,
        };
    }

    //2-1. 함수 추가
    componentDidMount() {
        /* (2) componentDidMount에서 Todo 리스트를 가져오는 GET 요청이 성공적으로 리턴하는 경우 loading을 false로 고친다.
        더 이상 로딩 중이 아니라는 뜻이다. */
        call("/todo", "GET", null).then((response) =>
          this.setState({ items: response.data, loading: false })
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
        
        //navigationBar 추가
        var navigationBar = (
            <AppBar position='static'>
                <Toolbar>
                    <Grid justify="space-between" container>
                        <Grid item>
                            <Typography variant='h6'>오늘의 할 일</Typography>
                        </Grid>
                        <Grid>
                            <Button color="inherit" onClick={signout}>
                                로그아웃
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )  

        /* 로딩 중이 아닐 때 렌더링할 부분 */
        var todoListPage = (
            <div>
                {navigationBar}
                <Container maxWidth="md">
                    <AddTodo add={this.add} />
                    <div className='TodoList'>{todoItems}</div>
                </Container>
            </div>
        )

        /* 로딩 중일 때 렌더링할 부분 */
        var loadingPage = <h1>로딩중...</h1>

        var content = loadingPage;
        if (!this.state.loading) {
            /* 로딩 중이 아니라면 todoListPage를 선택 */
            content = todoListPage;
        }

        /* 선택한 content 렌더링 */
        return <div className='App'>{content}</div>;
    }
}

export default App;
