import { StyleSheet, Text, View, Pressable, Image , TouchableOpacity , FlatList } from "react-native";
import React, {  useContext, useEffect , useState } from "react";
import { ProductContext } from "../product/ProductContext";
import { UserContext } from "../user/UserContext";

const ListComment = (props) => {
  const {
    navigation,
    route: {
      params: { _id },
    },
  } = props;
  const [comment, setComment] = useState([]);
  const {onGetCommentByID} =  useContext(ProductContext);

  const fetchData = async () => {
    const res = await onGetCommentByID(_id);
    setComment(res);
  };
  useEffect(() => {
    fetchData();
  }, [_id]);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
     fetchData();
    });
    return focusHandler;
}, [navigation]);

  const goComment = () => {
    navigation.navigate('Comment' , {_id});
  };

  const renderItem = ({ item }) => {
    const { _id,name , text , product_id , date} = item;
    return (
      <View  style= {{width: "100%" , paddingHorizontal: 16 , paddingVertical: 8}}>
      <View style = {styles.ViewComment } >
        <View style = {{flexDirection: "row" , marginBottom: 18}} >
          <Text style = {{fontSize: 16, fontWeight: "500"}}>{name}</Text>
          <Text style= {{right: 16 , position: "absolute"}}>{date}</Text>
        </View>
        <View>
          <Text>{text}</Text>
        </View>
      </View>
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#FF785B",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{left: 16 , position: "absolute"}} >
          <Pressable 
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{ with: 16, height: 24 }}
              source={require("../assets/images/backwhite.png")}
            ></Image>
          </Pressable>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
            Bình luận đánh giá
          </Text>
        </View>
      </View>
    
      <FlatList
       style={styles.flatList}
       data={comment}
       renderItem={renderItem}
       showsVerticalScrollIndicator={false}
       keyExtractor={(item) =>item._id}
      ></FlatList>
      <View style = {{width: "100%" , paddingHorizontal: 16 , bottom: 12 , position: "absolute"}}>
        <TouchableOpacity onPress={goComment} style = {styles.butttoncomment}>
          <Text style = {{fontSize: 18 , fontWeight: "500" , color: "white"}}>Viết bình luận đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
    

  );
};

export default ListComment;
  const styles = StyleSheet.create({
    flatList:{
      marginBottom: 60
    },
    butttoncomment:{
      height: 46,
      backgroundColor: "#FF785B",
      borderRadius: 10, 
      alignItems:"center",
      justifyContent:"center",
      fontSize: 18,
      fontWeight: "500",
      color: "white",
      onPressIn: {
        backgroundColor: "#E65C44"
      },
      onPressOut: {
        backgroundColor: "#FF785B"
      }
    },
    ViewComment: {
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: "white",
      paddingVertical: 8,
    },
    Container: {
      flex: 1,
      backgroundColor: "#F4F6F8",
    },
  });
