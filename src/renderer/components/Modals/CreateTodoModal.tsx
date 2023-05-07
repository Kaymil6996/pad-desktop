import { Button, MenuItem, Modal, Select, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useCreateTodoMutation } from 'renderer/store/rtk/todos';
import * as yup from 'yup';

interface CreateTodoModalProps {
  isOpen: boolean;

  onClose: Function;
}

const priorityLevels = [
  'High priority',
  'Urgent priority',
  'Medium priority',
  'Low priority',
  'Optional priority',
].reverse();

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  tags: yup.string().optional(),
  priority: yup.number().optional().default(0),
});

export default function CreateTodoModal(props: CreateTodoModalProps) {
  const [createTodo, { error }] = useCreateTodoMutation();

  return (
    <Modal open={props.isOpen} onClose={() => props.onClose()}>
      <section className="modal">
        <h1 className="modal__title">Create todo</h1>

        <Formik
          validationSchema={validationSchema}
          onSubmit={(values) =>
            createTodo({
              ...values,
              priority: +values.priority,
            }).then(() => props.onClose())
          }
          initialValues={{
            title: '',
            content: '',
            tags: '',
            priority: 0,
          }}
        >
          {(f) => (
            <>
              <TextField
                label="Title"
                sx={{ width: '100%', marginTop: '10px' }}
                error={f.touched.title && !!f.errors.title}
                value={f.values.title}
                onChange={f.handleChange('title')}
                onBlur={f.handleBlur('title')}
                helperText="Name of your task"
              />
              <TextField
                multiline
                label="Content"
                sx={{ width: '100%', marginTop: '10px' }}
                error={f.touched.content && !!f.errors.content}
                value={f.values.content}
                onChange={f.handleChange('content')}
                onBlur={f.handleBlur('content')}
                helperText="Content of your task (no character limit)"
              />
              <TextField
                label="Tags"
                sx={{ width: '100%', marginTop: '10px' }}
                error={f.touched.tags && !!f.errors.tags}
                value={f.values.tags}
                onChange={f.handleChange('tags')}
                onBlur={f.handleBlur('tags')}
                helperText="Tags will help you sort your todos"
              />

              <Select
                //@ts-ignore
                onChange={f.handleChange('priority')}
                value={f.values.priority}
              >
                {priorityLevels.map((level, index) => (
                  <MenuItem value={index} key={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>

              <Button
                onClick={() => f.handleSubmit()}
                disabled={!(f.dirty && f.isValid)}
                sx={{ width: '100%', marginTop: '10px', padding: '15px' }}
                variant="contained"
                color="primary"
              >
                Create todo
              </Button>
            </>
          )}
        </Formik>
      </section>
    </Modal>
  );
}
