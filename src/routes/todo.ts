
import { Router } from 'express'
import { createTodo, getTodo, updateTodo, getTodoById, deleteTodo } from '../controller/todo'

console.log(getTodo)

const router = Router();

router.post('/', createTodo);

router.get('/', getTodo);

router.delete('/:id', deleteTodo);

router.patch('/:id', updateTodo);

router.get('/:id', getTodoById);


export default router;