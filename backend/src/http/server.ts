import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod";
import {createGoal} from '../features/create-goal';
import z from 'zod'
import { getWeekPendingGoals } from '../features/getWeekPendingGoals';
import { createGoalCompletion } from '../features/create-goal-completion';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionsRoute } from './routes/create-completion';
import { getPendingGoalsRoute } from './routes/get-pending-goals';

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createCompletionsRoute)
app.register(getPendingGoalsRoute)

app
    .listen({
        port: 3333
    })
    .then(()=>{
        console.log('HTTP server running!')
    })