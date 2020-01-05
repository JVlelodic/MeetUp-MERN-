import React from 'react';

const URL = 'http://127.0.0.1:5468'
class Home extends React.Component{

    state = {
        loading: true, 
        header: null,
        body: null,
    }

    async componentDidMount(){

        const options = {
            headers: { "Content-Type": "application/json" }
        };

        const response = await fetch(URL,options);
        const value = await response.json(); 
        console.log(value);
        this.setState({
            loading: false, 
            header: value.header,
            body: value.body
        }); 
    }

    render(){
        return(
            <div>
                {this.state.loading || !this.state.header ? (
                    <div>Loading...</div>
                ):(
                    <div>
                        <h1>{this.state.header}</h1>
                        <div>{this.state.body}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default Home; 