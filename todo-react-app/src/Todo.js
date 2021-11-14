import React from "react";
import { 
    ListItem, 
    ListItemText,
    InputBase, 
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import DeleteOutLined from "@material-ui/icons/DeleteForeverOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item };
        this.delete = props.delete;
    }

    // 함수 추가
    deleteEventHandler = () => {
        this.delete(this.state.item);
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} />
                <ListItemText>
                    <InputBase 
                        inputProps={{ "aria-label": "naked" }}
                        type="text"
                        id={item.id}  // 각 리스트를 구분하려고 id를 연결
                        name={item.id} // 각 리스트를 구분하려고 id를 연결
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}>
                        <DeleteOutLined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default Todo; 