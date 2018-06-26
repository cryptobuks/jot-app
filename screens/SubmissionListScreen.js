import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import _ from 'lodash';
import { fetchSubmissions } from "../actions";
import BackButton from "../components/BackButton";

@withMappedNavigationProps()
class SubmissionListScreen extends Component {
  componentWillMount() {
    const { fetchSubmissions, prompt, token } = this.props;

    fetchSubmissions({ prompt, token });
    this.data = this.props.submissions;
  }

  componentWillReceiveProps(nextProps) {
    this.data = nextProps.submissions;
  }

  onBackPress = () => {
    this.props.navigation.goBack();
  }

  renderItem = ({ item }) => {
    return <ListItem onPress={() => {}} title={item.user.name}/>
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor='#7dc99f'
          leftComponent={<BackButton text='Back' onPress={this.onBackPress}/>}
        />
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => String(i)}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  const submissions = _.map(state.submission.submittedList, (val) => {
    return { ...val };
  });

  console.log(submissions);

  return {
    submissions,
    token: state.auth.token
  };
}

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionListScreen);