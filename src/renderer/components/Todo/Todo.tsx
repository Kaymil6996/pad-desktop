import { Button, Snackbar, Typography } from '@mui/material';
import { useRemoveTodoMutation } from 'renderer/store/rtk/todos';

export default function Todo(el: any) {
  const [removeTodo] = useRemoveTodoMutation();

  return (
    <div className="todo">
      <Typography fontSize={25} fontWeight={'bold'} color={'primary'}>
        {el.title}
      </Typography>
      <Typography sx={{ marginBottom: '5px' }}>{el.content}</Typography>
      <Button
        onClick={() => removeTodo(el.todoId)}
        color="error"
        variant="outlined"
      >
        Remove
      </Button>
    </div>
  );
}
