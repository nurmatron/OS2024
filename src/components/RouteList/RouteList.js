import React from 'react';
import Route from '../Route'


export default class RouteList extends React.Component {

    durationSort = (a,b) => a.totalDuration - b.totalDuration;
    distanceSort = (a,b) => a.distance - b.distance;
    priceSort = (a,b) => {

        let aPrice;
        let bPrice;
        console.log("a", a);
        if (a.indicativePrices[0]){
            aPrice = a.indicativePrices[0].priceLow;
            aPrice = aPrice ? aPrice : a.indicativePrices[0].price;
        }
        else {
            aPrice = 999999999;
        }

        if (b.indicativePrices[0]){
            bPrice = b.indicativePrices[0].priceLow;
            bPrice = bPrice ? bPrice : b.indicativePrices[0].price;
        }
        else {
            bPrice = 999999999;
        }
        return aPrice - bPrice;
    }
    segmentsSort = (a,b) => {
        return a.segments.length-b.segments.length;
    }

    constructor(props){
        super();
        this.state = {sortFunction: "duration"};
    }

    render(props) {
        const data = this.props.routeData;
        
        let activeSort = null;
        const sortState = this.state.sortFunction;
        console.log("Sort state", sortState);
        switch(sortState){
            case 'duration':
                activeSort = this.durationSort;
                break;
            case "price":
                activeSort = this.priceSort;
                break;
            case "distance":
                activeSort = this.distanceSort;
                break;
            case "segments":
                activeSort = this.segmentsSort;
                break;
        }

        const sortedRoutes = [...data.routes].sort(activeSort);
        
        

        return (
            <div>
                <div className="info">
                    <div>From: {data.places[0].longName}</div>
                    <div>To: {data.places[1].longName}</div>

                    <select className="select" onChange={event => this.setState({ sortFunction: event.target.value })}>
                            <option value="duration">Sort by Duration</option>
                            <option value="price">Sort by Price</option>
                            <option value="distance">Sort by distance</option>
                            <option value="segments">Sort by segments</option>
                    </select> 

                    {data.routes.length ?
                        (<div className="allRoutes">All transports: {sortedRoutes.map(element => 
                            <Route {...element}/>
                        )}</div>)
                    : <div>Sorry, there are no transports for that journey</div>}

                </div>
            </div>
        )
    }
}