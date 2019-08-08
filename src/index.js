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
                <div class="button-wrapper"><button type="button"><img src="./assets/maestro.png"/><span>{this.props.card}</span></button></div>
                <div class="window-icon"><img src="./assets/windows-client.png"/></div>
            </div>
        )
    }
}

class PortfolioView extends React.Component {
    render(){
        return (
            <div class="portfolio-view-wrapper">
                <div className="mobile-app-ad"><img alt="mobileAd" src="./assets/crypto-image.jpg"/></div>
                <div className="portfolio-description"></div>
            </div>
        )
    }
}

class Select extends React.Component {
    render(){
        var listItems = this.props.options.map((option, index) => <option key={index}>{option}</option>)
        return(
            <select onChange={(e)=> this.props.currencySelected(e.target.value)}>
                {listItems}
            </select>
        )
    }
}

class AcccordionCurrentTrend extends React.Component {
    render(){
        if(this.props.view) return (
            <div className="accordion-content-trend">
                <input type="text" placeholder={this.props.content.number + this.props.content.currency1}/>
                <input type="text" placeholder={"=" + this.props.content.rate + " " + this.props.content.currency2}/>
                <button type="button" className="buy-button">Buy</button>
                <button type="button" className="sell-button">Sell</button>
            </div>
        )
        else return null
    }
}

class CurrentTrend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAccordionOpen : Array(2).fill(false)
        }
    }

    handleClick = (isOpen) => {
        const tempState = this.state.isAccordionOpen.slice();
        tempState[isOpen[1]] = isOpen[0];
        this.setState({
            isAccordionOpen: tempState
        })
    }
    
    render(){
        if(this.props.trends){
            const value = this.props.trends;
            const exchangeValue = Object.keys(value).map((key,index) => (
                <li key={key} className={this.state.isAccordionOpen[index] ? "list-open exchange-list" : "exchange-list"}>
                    <div class="exchange-list-wrapper">
                        <div class="exchange-container">
                            <p className="exchange-method">{key}</p>
                            <p class="currency-convert bold">{value[key].currency1}/{value[key].currency2}</p>
                        </div>
                        <div class="average-container">
                            <div class="average-container-wrapper">
                                <span className="average">Average</span><span className="average-value bold">{value[key].average}</span>
                                <Accordion isOpen={this.handleClick} index={index}/>
                            </div>
                        </div>
                    </div>
                    <AcccordionCurrentTrend view={this.state.isAccordionOpen[index]} content={this.props.trends[key]}/>
                </li>
                
            ))
            return (
                <div className="current-trend-wrapper">
                    <div className="current-trend-heading"><span className="bold">Current Trend</span> this week</div>
                    <ul>{exchangeValue}</ul>
                </div>
            )
        }
        else
        return(
            <p>Nothing to show</p>
        )
    }
}
  
class ExchangeCurrency extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currencySelected: "USD",
            currencies: [],
            rates: [],
            currentTrends: []
        }
    }
    async getData(){
        const _self = this;
        await fetch('./mock_data/rates.json',{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((responseText) => {
            const resp = responseText.json();
            resp.then((response) => {
                _self.setState({
                    currencies: response.data[0].currencies,
                    rates: response.data[0].currency_rates,
                    currentTrends:response.data[0].currentTrends
                })
            })
        });
    }
    componentDidMount(){
        this.getData();
    }
    handleCurrency = (currency) => {
        this.setState({
            currencySelected:currency
        })
    }
    render(){
        return(
            <div className="exchange">
                <div className="exchange-wrapper">
                    <div className="exchange-currency-wrapper">
                        <div className="rate-heading">
                            Rates
                        </div>
                        <div className="currency-selector">
                            <Select label="Price" placeholder={this.state.currencySelected} options={this.state.currencies} currencySelected={this.handleCurrency}/>
                        </div>
                    </div>
                    <RateTable currency={this.state.currencySelected} rates={this.state.rates[0]}/>
                </div>
                <div className="current-trends">
                    <CurrentTrend trends={this.state.currentTrends[0]}/>
                </div>
            </div>
        )
    }
}

class AccordionContentExchange extends React.Component {
    render(){
        if(this.props.view) return (<p>Accordion content when open</p>)
        else return null
    }
}
class RateTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccordionOpen : Array(3).fill(false)
        }
    }

    handleClick = (isOpen) => {
        const tempState = this.state.isAccordionOpen.slice();
        tempState[isOpen[1]] = isOpen[0];
        this.setState({
            isAccordionOpen: tempState
        })
    }
    render(){
        if(this.props.rates){
            const value = this.props.rates;
            const currency = this.props.currency;
            const exchangeValue = Object.keys(value).map((key,index) => (
                <li key={key} className="currency-list">
                    <div>
                        <span class="crypto-currency">{key} = </span>
                        <span class="currency-amount">{currency === 'INR' ? value[key].INR : value[key].USD}</span>
                        <span className={value[key].changeType === "positive"? "positive change" : "negative change"}>{value[key].change}
                        <Accordion isOpen={this.handleClick} index={index}/>
                        </span>
                    </div>
                    <AccordionContentExchange view={this.state.isAccordionOpen[index]} transactionDetails={this.props.details}/>
                </li>
                
            ))
            return(
                <ul>{exchangeValue}</ul>
            )
        }
        else return(<p>Nothing to show</p>)
    }
}

class NavigationContent extends React.Component {
    render(){
        if(this.props.isBuySell) {
            return (
                <div class="navigation-content-wrapper">
                    <CardView card={this.props.card} />
                    <PortfolioView />
                    <ExchangeCurrency />
                </div>
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
    constructor(props){
        super(props);
        this.state = {
            isOpen : true
        }
    }
    handleClick(){
        this.setState({
            isOpen : !this.state.isOpen
        })
        this.props.isOpen([this.state.isOpen,this.props.index]);
    }
    render(){
        if(!this.state.isOpen) return(
            <span onClick={()=> this.handleClick()}><img src="./assets/collapse-arrow.png" alt="Collapse"/></span>
        )    
        else return(
            <span onClick={() => this.handleClick()}><img src="./assets/expand-arrow.png" alt="Expand"/></span>
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
            isAccordionOpen: isOpen[0]
        })
    }

    render(){
        var listItems = this.props.notifications.map((notification, index) => <li key={index}>{notification}</li>);
        const index = 0;
        if (this.props.isBalance === true) {
            return(
                <div className="balanceView">
                    <p>
                        <span className="balance">{this.props.balance}</span>
                        <Accordion  isOpen={this.handleClick} index={index}/>
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