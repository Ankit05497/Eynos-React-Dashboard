import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Navigation extends React.Component {
    handleClick(val1,val2,val3,val4,val5,val6){
        this.props.buySell(val1);
        this.props.trade(val2);
        this.props.accounts(val3);
        this.props.portfolio(val4);
        this.props.card(val5);
        this.props.home(val6);
    }
    render(){
        return(
            <div className="navigation-wrapper">
                <div className="buy-sell-trade links">
                    <ul>
                        <li onClick={() => this.handleClick(true,false,false,false,false,false)}><a href="#">Buy/Sell</a></li>
                        <li onClick={() => this.handleClick(false,true,false,false,false,false)}><a href="#">Trade</a></li>
                    </ul>
                </div>
                <div className="user-profile links">
                    <ul>
                        <li onClick={() => this.handleClick(false,false,true,false,false,false)}><a href="#">Accounts</a></li>
                        <li onClick={() => this.handleClick(false,false,false,true,false,false)}><a href="#">Portfolio</a></li>
                        <li onClick={() => this.handleClick(false,false,false,false,true,false)}><a href="#">Cards</a></li>
                        <li onClick={() => this.handleClick(false,false,false,false,false,true)}><a href="#">Home</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

class CardView extends React.Component {
    render(){
        return(
            <div class="card-wrapper">
                <button type="button"><img src="./assets/maestro.png"/><span>{this.props.card}</span></button>
            </div>
        )
    }
}

class NavigationContent extends React.Component {
    render(){
        if(this.props.isBuySell) {
            return (
                <CardView card={this.props.card} />
            )
        }
        else {
            return(
                <p>No Design for other tabs given</p>
            )
        }
    }
}

class StockPortfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBuySell: true,
            isTrade: false,
            isAccounts: false,
            isPortfolio:false,
            isCards: false,
            isHome:false
        }

    }
    handleBuySell = (isBuySell) => {
        this.setState({
            isBuySell: isBuySell
        })
    }

    handleTrade = (isTrade) => {
        this.setState({
            isTrade:isTrade
        })
    }

    handlaAccounts = (isAccount) => {
        this.setState({
            isAccounts:isAccount
        })
    }
    
    handlePortfolio = (isPortfolio) => {
        this.setState({
            isPortfolio: isPortfolio
        })
    }
    handleCards = (isCard) => {
        this.setState({
            isCards:isCard
        })
    }
    handleaHome = (isHome) => {
        this.setState({
            isHome: isHome
        })
    }
    render() {
        return(
            <div className="l-portfolio">
                <div className="portfolio-wrapper">
                    <Navigation buySell={this.handleBuySell} trade={this.handleTrade} accounts={this.handlaAccounts} portfolio={this.handlePortfolio} card={this.handleCards} home={this.handleaHome}/>
                    <NavigationContent isBuySell={this.state.isBuySell} card={this.props.card}/>
                </div>
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
            <span onClick={()=> this.props.isClicked(false)}><img src="./assets/collapse-arrow.png" alt="Collapse"/></span>
        )    
        else return(
            <span onClick={() => this.props.isClicked(true)}><img src="./assets/expand-arrow.png" alt="Expand"/></span>
        )
    }
}

class AccordionContent extends React.Component {
    render(){
        if(this.props.view === true) 
        return(
            <p>Accordion Content when open</p>
        )
        else
            return(
                <p className="accordion-view">
                    <span className="amount">{this.props.transactionDetails.transaction_amount}</span>
                    <span className="message">{this.props.transactionDetails.transactions} transacations in process</span>
                </p>
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
                    <div className="accordionView">
                        <AccordionContent view={this.state.isAccordionOpen} transactionDetails={this.props.details}/>
                    </div>
                    <div>
                        <button type="button"> Add a Portfolio</button>
                    </div>
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

class AccountView extends React.Component {
    render(){
        return(
            <div className="links account-view-links">
                <ul>
                    <li onClick={() => this.props.accountTab(true)}><a href="#">Accounts</a></li>
                    <li className="add-funds" onClick={() => this.props.accountTab(false)}><a href="#">Add funds</a></li>
                </ul>
            </div>
        );
    }
}

class AccountStockView extends React.Component {
    render(){
        if(this.props.isAccount) {
            return(<AccountDetails />)
        }
        else {
            return (<p>Add Fund Tab Active</p>)
        }
    }
}

class CreateList extends React.Component {
    render(){
        if(this.props.data) {
            var items = this.props.data;
            const listItems = Object.keys(items).map((key) => (
            <li key={key} className="account-list">
                <div>
                    <p>{items[key].stock}</p>
                    <p class="account-amount">{items[key].amount}</p>
                </div>
                <div class="plus-container">
                    <img src="./assets/plus.png" alt="plus"/>
                </div>
            </li>
            ))
            return (
            <ul className="account">{listItems}</ul>
            )
        }
        else {
            return (<p>Nothing to show</p>)
        }
    }
}

class AccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts : null
        }
    }
    async getData(){
        const _self = this;
        await fetch('./mock_data/account_data.json',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((responseText) => {
            const resp = responseText.json();
            resp.then((response) => {
                _self.setState({
                    accounts: response.data[0]
                })
            })
        });
    }

    componentDidMount(){
        this.getData();
    }

    render() {
         return (
             <CreateList data={this.state.accounts}/>
         )
    }
}

class PersonalBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isBalanceTab : true,
            isAcccountsTab: true
        }
    }

    handleTab = (isBalanceTabClicked) => {
        this.setState({
            isBalanceTab: isBalanceTabClicked
        })
    }

    handleAccountTab = (isAcccountsTab) => {
        this.setState({
            isAcccountsTab: isAcccountsTab
        })
    }

    render() {
        return(
            <div className="l-personal-balance">
                <NavLinks notif={this.props.notif} tabClicked={this.handleTab} />
                <PersonalizedView isBalance={this.state.isBalanceTab} notifications={this.props.notifications} balance={this.props.balance} details={this.props.personalDetails}/>
                <AccountView accountTab={this.handleAccountTab}/>
                <AccountStockView isAccount={this.state.isAcccountsTab}/>
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
            notifications: [],
            transaction_amount: '0',
            transactions: '0',
            cardType: ""
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
                    notifications: response.data[0].notifications,
                    transaction_amount: response.data[0].transaction_amount,
                    transactions:  response.data[0].transaction_number,
                    cardType: response.data[0].cardType
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
                <StockPortfolio balance={this.state.balance} card={this.state.cardType}/>
                <PersonalBalance balance={this.state.balance} notif={this.state.notification_number} notifications={this.state.notifications} personalDetails={this.state}/>
            </div>
        );
    }
}

ReactDOM.render(<Dashboard/>, document.getElementById('root'));