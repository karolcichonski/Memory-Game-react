class CardItem extends React.Component{
    render(){
        const {number} = this.props;
        const idDiv="card"+number;
        const idFig="fig"+number;
        const idCov="cover"+number;
        return(
            <div id={idDiv} className="card" onClick={() => console.log({idDiv})}>
                <figure>
                    <div id={idFig} className="photo"></div>
                </figure>
                <div id={idCov} className="cover"> </div>
            </div>
        );
    }
}

function AppHeader(){
    return(
        <div>
            <header>MEMORY</header>
        </div>
    );
}

class App extends React.Component {
    render() {
        return (
            <div>
                <AppHeader />
                <div id="container">
                    <CardItem number={0}/>
                    <CardItem number={1}/>
                    <CardItem number={2}/>
                    <CardItem number={3}/>
                    <CardItem number={4}/>
                    <CardItem number={5}/>
                    <CardItem number={6}/>
                    <CardItem number={7}/>
                    <CardItem number={8}/>
                    <CardItem number={9}/>
                    <CardItem number={10}/>
                    <CardItem number={11}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);