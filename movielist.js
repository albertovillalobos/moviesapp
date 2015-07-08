var React = require('react-native');
var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  ScrollView
} = React;

// var TimerMixin = require('react-timer-mixin');

// var invariant = require('invariant');




var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
// var REQUEST_URL = 'http://haxw.me/api/users/';
var LOADING = {};

var movielist = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },



  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },



  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );

   },



   selectMovie: function(movie: Object) {
     this.props.navigator.push({
       title: movie.title,
       component: moviescreen,
       passProps: {movie},
     });
   },



   renderLoadingView: function() {
     return (
       <View style={styles.container}>
         <Text>
           Loading users...
         </Text>
       </View>
     );
   },

   renderMovie: function(movie) {
     return (
       <TouchableHighlight
        onPress={()=> this.selectMovie(movie)}
        movie={movie}>

         <View style={styles.container} >
           <Image
             source={{uri: movie.posters.thumbnail}}
             style={styles.thumbnail}
           />
           <View style={styles.rightContainer}>
             <Text style={styles.title}>{movie.title}</Text>
             <Text style={styles.year}>{movie.year}</Text>
           </View>
         </View>
       </TouchableHighlight>
     );
   },
});

var moviescreen  = React.createClass({

  render: function() {
    console.log(this.props.movie);
    var movie=this.props.movie;
    return (
      <ScrollView>
        <View style={styles.moviescreen}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <Text>{movie.title}</Text>

        </View>
      </ScrollView>
    )
  }
})


// var MovieScreen = React.createClass({
//   render: function() {
//     return (
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <View style={styles.mainSection}>
//           {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
//             * omit a property or set it to undefined if it's inside a shape,
//             * even if it isn't required */}
//           <Image
//             source={getImageSource(this.props.movie, 'det')}
//             style={styles.detailsImage}
//           />
//           <View style={styles.rightPane}>
//             <Text style={styles.movieTitle}>{this.props.movie.title}</Text>
//             <Text>{this.props.movie.year}</Text>
//             <View style={styles.mpaaWrapper}>
//               <Text style={styles.mpaaText}>
//                 {this.props.movie.mpaa_rating}
//               </Text>
//             </View>
//             <Ratings ratings={this.props.movie.ratings} />
//           </View>
//         </View>
//         <View style={styles.separator} />
//         <Text>
//           {this.props.movie.synopsis}
//         </Text>
//         <View style={styles.separator} />
//         <Cast actors={this.props.movie.abridged_cast} />
//       </ScrollView>
//     );
//   },
// });



var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 5,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  moviescreen: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  }


});


module.exports = movielist;
