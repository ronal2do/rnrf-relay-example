import React, { Component } from 'react';

import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Relay from 'react-relay';

import CountryHeadBanner from '../Country/CountryHeadBanner';
import CityListItem from '../City/CityListItem';

class CountryInfoScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', marginTop: 24}}>
        <View style={{flex: 7}}>
          <ScrollView style={{flex: 1}}>
            {this.props.viewer.country.cities.map(city => <CityListItem key={city.id} city={city} />)}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Relay.createContainer(CountryInfoScreen, {
  initialVariables:{
    countryId: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on ViewerQueryType {
        country (id: $countryId) {
          id,
          name,
          cities {
            id,
            ${CityListItem.getFragment('city')}
          },
        }
      }
    `,
  },
});