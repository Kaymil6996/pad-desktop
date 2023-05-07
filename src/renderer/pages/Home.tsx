import { Button, Fab } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateTodoModal from 'renderer/components/Modals/CreateTodoModal';
import Todo from 'renderer/components/Todo/Todo';
import { useGetTodoQuery } from 'renderer/store/rtk/todos';
import { useAppSelector } from 'renderer/store/store';
import { userSlice } from 'renderer/store/user/user';

export default function HomePage() {
  const { token } = useAppSelector((s) => s.user);
  const { data = [] } = useGetTodoQuery(token);

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(userSlice.actions.signout());
    navigate('/landing');
  };

  return (
    <main className="home-container">
      <header className="header">
        <h2 className="header__logo">Todos</h2>

        <Button onClick={() => handleSignout()}>Signout</Button>
      </header>
      <Fab
        sx={{
          position: 'fixed',
          right: 10,
          bottom: 10,
        }}
        variant="extended"
        color="primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        Create todo
      </Fab>

      {data.map((el: any) => (
        <Todo key={el.todoId} {...el} />
      ))}

      <CreateTodoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  );
}
