import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class StockPortfolio extends React.Component {
    render() {
        return(
            <div className="l-portfolio">
            </div>
        );
    }
}

class NavLinks extends React.Component {
    render(){
        return(
            <div className="links">
                <ul>
                    <li><a href="#">Balance</a></li>
                    <li><a href="#">Notifications</a> <button type="button">{this.props.notif}</button></li>
                </ul>
            </div>
        );
    }
}

class PersonalizedView extends React.Component {
    render(){
        if (this.props.isBalance === true) {
            return(
                <div className="balance">Balance</div>
            )
        }
        else {
            return(
                <div className="notifications">Notifications</div>
            )
        }
    }
}

class PersonalBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBalanceTab : true
        }
    }

    render() {
        return(
            <div className="l-personal-balance">
                <NavLinks notif={this.props.notif} />
                <PersonalizedView isBalance={this.state.isBalanceTab} />
            </div>
        );
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '$0',
            notifications: '0'
        }
    }
    
    async getData(){
        const _self = this;
        await fetch('./mock_data/personal_data.json',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((responseText) => {
            const resp = responseText.json();
            resp.then((response) => {
                _self.setState({
                    balance: response.data[0].balance,
                    notifications: response.data[0].notification_number
                })
            })
        });
    }

    componentDidMount(){
        this.getData();
    }

    render(){
        return(
            <div className="l-dashboard">
                <StockPortfolio />
                <PersonalBalance balance={this.state.balance} notif={this.state.notifications}/>
            </div>
        );
    }
}

ReactDOM.render(<Dashboard/>, document.getElementById('root'));