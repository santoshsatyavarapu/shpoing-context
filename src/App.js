import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {id} = product
    const {cartList} = this.state
    if (cartList.length !== 0) {
      const filteredList = cartList.map(eachElement => {
        if (eachElement.id === id) {
          const objectNow = {...eachElement}
          objectNow.quantity += product.quantity
          return {...objectNow}
        }
        return eachElement
      })
      this.setState({cartList: [...filteredList]})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachElement => eachElement.id !== id)
    this.setState({cartList: [...filteredList]})
  }

  increaseQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.map(eachElement => {
      if (eachElement.id === id) {
        const objectNow = {...eachElement}
        objectNow.quantity += 1
        return {...objectNow}
      }
      return eachElement
    })
    this.setState({cartList: [...filteredList]})
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const filteredList = cartList.map(eachElement => {
      if (eachElement.id === id) {
        const objectNow = {...eachElement}
        objectNow.quantity -= 1
        if (objectNow.quantity !== 0) {
          return {...objectNow}
        }
        return null
      }
      return eachElement
    })
    const finalList = filteredList.filter(eachElement => eachElement !== null)
    this.setState({cartList: [...finalList]})
  }

  render() {
    const {cartList} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            increaseQuantity: this.increaseQuantity,
            decreaseQuantity: this.decreaseQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
