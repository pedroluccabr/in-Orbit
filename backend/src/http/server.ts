import fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider} from "fastify-type-provider-zod";
import {createGoal} from '../features/create-goal';
import z from 'zod'
import { getWeekPendingGoals } from '../features/getWeekPendingGoals';
import { createGoalCompletion } from '../features/create-goal-completion';
import { createGoalRoute } from './routes/create-goal';
import { createCompletionsRoute } from './routes/create-completion';
import { getPendingGoalsRoute } from './routes/get-pending-goals';
import { getWeekSummaryRoute } from './routes/get-week-summary';
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// configurando cors para nem todos os frontend se conectarem ao meu backend
app.register(fastifyCors, {
    origin: '*',
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createGoalRoute)
app.register(createCompletionsRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app
    .listen({
        port: 3333
    })
    .then(()=>{
        console.log('HTTP server running!')
    })