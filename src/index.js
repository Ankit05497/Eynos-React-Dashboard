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
                    <li onClick={() => this.props.tabClicked(true)}><a href="#">Balance</a></li>
                    <li onClick={() => this.props.tabClicked(false)}><a href="#">Notifications</a> <button type="button">{this.props.notif}</button></li>
                </ul>
            </div>
        );
    }
}

class Accordion extends React.Component {
    render(){
        if(this.props.isOpen) return(
            <span onClick={()=> this.props.isClicked(false)}><img src="./assets/collapse-arrow.png"/></span>
        )
            
        else return(
            <span onClick={() => this.props.isClicked(true)}><img src="./assets/expand-arrow.png"/></span>
        )
    }
}

class PersonalizedView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccordionOpen : false
        }
    }

    handleClick = (isOpen) => {
        this.setState({
            isAccordionOpen: isOpen
        })
    }

    render(){
        var listItems = this.props.notifications.map((notification, index) => <li key={index}>{notification}</li>)
        if (this.props.isBalance === true) {
            return(
                <div className="balanceView">
                    <p>
                        <span className="balance">{this.props.balance}</span>
                        <Accordion  isClicked={this.handleClick} isOpen={this.state.isAccordionOpen}/>
                    </p>
                </div>
            )
        }
        else {
            return(
                <div className="notifications">
                    <ul>{listItems}</ul>
                </div>
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

    handleTab = (isBalanceTabClicked) => {
        this.setState({
            isBalanceTab: isBalanceTabClicked
        })
    }

    render() {
        return(
            <div className="l-personal-balance">
                <NavLinks notif={this.props.notif} tabClicked={this.handleTab} />
                <PersonalizedView isBalance={this.state.isBalanceTab} notifications={this.props.notifications} balance={this.props.balance} />
            </div>
        );
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '$0',
            notification_number: '0',
            notifications: []

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
                    notification_number: response.data[0].notification_number,
                    notifications: response.data[0].notifications
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
                <PersonalBalance balance={this.state.balance} notif={this.state.notification_number} notifications={this.state.notifications}/>
            </div>
        );
    }
}

ReactDOM.render(<Dashboard/>, document.getElementById('root'));