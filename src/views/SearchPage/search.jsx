import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import searchService from "../../api/searchService";
import { searchAction } from "../../store/actions";
import DefaultImage from "../../assets/images/default-tile.png";
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      city: []
    };
    
  }

  acHandleSearch = async (query) => {
    this.setState({
      acLoading: true,
    });

    await searchService
      .getCities(query)
      .then((res) => {
        if (res.data && res.data.location_suggestions.length) {

          this.setState({
            acLoading: false,
            destinations: res.data.location_suggestions
          });
        }
      })
      .catch((error) => {
        this.setState({
          acLoading: false,
        });
      });
  };

  acHandleChange = (selected, field) => {
    this.setState({[field]: selected});
  }

  handleResSearch = async() => {
    const { getRestaurants } = this.props;
    const {city} = this.state;
    console.log(city)
    var params = {
      entity_id: city[0].id
    }
    await getRestaurants(params);
    const {resTaurantListData, error} = this.props;
    console.log(resTaurantListData)
    if(resTaurantListData){
      this.setState({resTaurantListData: resTaurantListData.restaurants});
    }
  }

  render() {
    const { destinations, resTaurantListData } = this.state;
    const {
      isLoading
    } = this.props;
    return (
      <div className="container">
        <div className="row searchBar">
          <div className="col-md-6">
            <AsyncTypeahead
              name="city"
              labelKey={option => option.name }
              filterBy={['name', 'state_name']}
              inputValueMatcher={() => null}
              isLoading={isLoading}
              minLength={3}
              onSearch={(query) => this.acHandleSearch(query)}
              options={destinations}
              placeholder="Search City"
              cache={false}
              onChange={(selected) => {
                this.acHandleChange(selected, "city");
              }}
              searchText="Searching..."
              id="destination"
              useCache={false}
              ref="typeahead"
            />
          </div>
          <div className="col-md-4">
            <button type="button" className="btn btn-success" onClick={() => this.handleResSearch()}>Search</button>
          </div>
        </div>
        {resTaurantListData && resTaurantListData.length && (<div className="row resList">
            {resTaurantListData.map((element) => {
              var restaurant = element.restaurant;
              return (
                <div className="col-md-4">
                  <div className="imageWrapper">
                    <img src={restaurant.thumb.length ? restaurant.thumb : DefaultImage} />
                  </div>
                  <h5>{restaurant.name}</h5>
                  <p>Average Cost for 2 : <strong>{restaurant.currency + restaurant.average_cost_for_two}</strong></p>
                </div>
              )
            })}
        </div>)}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const {
    isLoading,
    error,
    resTaurantListData
  } = state.searchReducer;

  return {
    isLoading,
    error,
    resTaurantListData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurants: (query) =>
      dispatch(searchAction.getRestaurants(query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);

