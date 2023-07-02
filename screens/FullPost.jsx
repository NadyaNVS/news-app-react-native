import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  object-fit: cover;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 10px;
  line-height: 24px;
`;

export const FullPostScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const { id, title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      title,
    });
    axios
      .get('https://649f3ff4245f077f3e9d7536.mockapi.io/post/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('error', 'Cannot receive date');
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage
        source={{
          uri: data.imageUrl,
        }}
      />
      <PostText>{data.text}</PostText>
    </View>
  );
};
