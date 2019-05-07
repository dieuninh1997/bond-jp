import React from 'react';
import { View, Text, Platform } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: 'data.db',
  location: 'default',
  createFromLocation: '~www/data.db',
},
() => { console.log('Ket noi thanh cong'); },
(error) => {
  console.log(error);
});

class AlphabetScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alphabet: [],
    };

    db.transaction((txn) => {
      txn.executeSql('select * from bao;', [], (tx, results) => {
        const tmp = [];
        if (results.rows.length > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            tmp.push(results.rows.item(i));
          }
          this.setState({ alphabet: tmp });
        }
      });
    });
  }

  render() {
    const { alphabet } = this.state;
    console.log('alphabet:', alphabet);

    return (
      <View>
        <Text>AlphabetScreen</Text>
        <Text>{this.dbTransaction}</Text>
      </View>
    );
  }
}
export default AlphabetScreen;
