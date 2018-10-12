import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            requestAddress : 'https://demo5894054.mockable.io/Prod',
            searchIndex : ''
        };

        this.onChange = this.onChange.bind(this);
    }

    loadData() {
        fetch(this.state.requestAddress).then(results => { return results.json() }).then(data => {
            this.setState({products: data["products"]});
        }).catch(() => {
            alert('Ошибка!');
        });
    }

    componentWillMount() {
        this.loadData();
    }

    onChange(event) {
        this.setState({
            searchIndex : event.target.value
        });
    }

    render() {
        let products = this.state.products;
        if (this.state.searchIndex) {
            products = this.state.products.filter(item => item.asin == this.state.searchIndex);
        }
        return (
            <div>
                <input value={this.state.searchIndex} onChange={this.onChange} />
                <table cellspacing="0">
                    <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Asin</th>
                        <th>Price</th>
                        <th>Votes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => {
                        return(
                            <tr>
                                <td><img src ={product.img}/></td>
                                <td>{product.asin}</td>
                                <td>{product.price} {product.currency}</td>
                                <td>{product.votes_count}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
