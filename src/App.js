import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Animated
} from 'react-native';
import { Card,Button } from 'react-native-elements';
import Deck from './Deck';
const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

export default class App extends React.Component {

  renderCard(item) {
    return(
      <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}
      >
        <Text style={{marginBottom: 20}}>Swipe Card is good animation</Text>
        <Button 
          icon= {{name: 'code' }}
          backgroundColor= "#03A9f4"
          title= "View More"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    return(
      <Card
        title="No More Cards"
      >
        <Text style={{marginBottom: 20}}>Swipe Card is good animation</Text>
      </Card>
    );
  }

  render() {
    return (
      <View>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards= {this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
