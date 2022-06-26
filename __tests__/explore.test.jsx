import { render, screen } from '@testing-library/react'
import Explore from '../pages/explore'
import '@testing-library/jest-dom'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'


describe('Explore', () => {
  const initialState = {
    username: "Jake",
    profileImg: "https://i.pravatar.cc/60?img=58",
    following: ["Jake", "Roger", "Eva"],
    bookmarks: [{id: "-N54tbbsTW4zciP6gl_j", username: "Eva"}],
    about: "I'm the creator of this site.",
  };
  const mockStore = configureStore()
  let store


  it('renders a heading', () => {
    store = mockStore(initialState)
    render(<Provider store={store}><Explore /></Provider>)

    const heading = screen.getByRole('heading', {
      name: /Search for Users/i,
    })

    expect(heading).toBeInTheDocument()
  })
})