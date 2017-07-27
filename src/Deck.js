import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  UIManager,
  LayoutAnimation
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5

class Deck extends Component{
  static defaultProps = {
    onSwipeLeft: ()=> {},
    onSwipeRight: ()=> {}
  }
  constructor(props){
    super(props);
    this.state = {
      index: 0
    }

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy})
      },
      onPanResponderRelease: (event,gesture) => {
        if(gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        }
        else if ( gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        }
        else {
          this.resetPosition();
        }
      } 
    });
    this.position = position;
    this.panResponder = panResponder
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position,{
      toValue: { x , y: 0 },
      duration: 250
    }).start(()=> this.onSwipeComplete(direction))
  }

  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    direction === 'right' ? this.onSwipeRight(item) : this.onSwipeLeft(item);
    this.position.setValue({x: 0, y: 0});
    this.setState({index: this.state.index + 1});
  }

  onSwipeRight(item) {
    alert(`Card swipe Right`)
  }  

  onSwipeLeft(item) {
    alert(`Card swipe Left`)
  }

  resetPosition() {
    Animated.spring(this.position,{
      toValue: {x: 0, y: 0}
    }).start()
  }

  getCardStyle() {
    const rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    }
  }

  renderCards() {
    if(this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return(
       this.props.data.map((item, cardIndex)=> {
        if(cardIndex < this.state.index) { return null };
        if (cardIndex === this.state.index){
          return(
            <Animated.View
              style={[styles.cardStyle,this.getCardStyle(),{ zIndex: 10,marginTop: 10 }]}
              {...this.panResponder.panHandlers} 
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return(
          <Animated.View style={[styles.cardStyle,{ zIndex: 1 }]}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }).reverse()
    );
  }

  render(){
    return(
      <View>
        {this.renderCards()}
      </View>

    );
  }
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
}

export default Deck;