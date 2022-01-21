import {render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import App from '../App'
import store from '../store/store'


const component = <Provider store={store}><App/></Provider>

test('existence of snackbar & app renders', () => {
    render(component)
    expect(screen.getByText(/create a new task/i)).toBeInTheDocument();
})