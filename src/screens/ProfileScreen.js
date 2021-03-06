import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components'
import {ScrollView, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native'
import { UserContext } from '../context/UserContext'
import { FirebaseContext } from '../context/FirebaseContext'
import Text from '../components/Text'
import { StatusBar } from 'expo-status-bar';



const DissmissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress = {() => Keyboard.dismiss()}>
        {children}
        </TouchableWithoutFeedback>
)


export default ProfileScreen = () => {

    const [user, setUser] = useContext(UserContext)
    const firebase = useContext(FirebaseContext)
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const uid = firebase.getCurrentUser().uid



    const updatez = async (uid) => {
        const updated = await firebase.updateUser(uid, userData)
    }

    useEffect(() => {
        firebase.getUserInfo();
      }, [])


    return (
        <DissmissKeyboard>
        <Container>
            
        <StatusBar style = 'dark' />
            <ProfilePhotoContainer>
                <ProfilePhoto source ={{ uri: user.profilePhotoUrl === 'default'
                  ?'https://firebasestorage.googleapis.com/v0/b/cmse322.appspot.com/o/profilePhotos%2FFW6FissAKyRAMy80YZvyIm0lJbt2?alt=media&token=36a87151-298a-4d54-a447-869158e43ede'
                  :user.profilePhotoUrl }}
                     />
            </ProfilePhotoContainer>
            <Text medium bold center margin ='16px 0 32px 0'>
                {userData ? userData.name : user.name}<Text medium center bold margin ='16px 0 32px 0'>{userData ? userData.surname : user.surname}</Text>
            </Text>
            <View style={{height: 250}} >
            <ScrollView>
                <ProfileInfo>
                
                        <ProfileInfoContainer>
                        <ProfileTitle>Name</ProfileTitle>
                            <ProfileField   
                                value={userData ? userData.name : ''}
                                placeholder = {user.name}
                                autoCapitalize = 'words' 
                                placeholderTextColor="#646464"
                                onChangeText={(txt) => setUserData({...userData, name: txt})}
                            />
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                        <ProfileTitle>Surname</ProfileTitle>
                            <ProfileField value={userData ? userData.surname : ''}
                                placeholder = {user.surname}
                                autoCapitalize = 'words' 
                                placeholderTextColor="#646464"
                            onChangeText={(txt) => setUserData({...userData, surname: txt})}
                                />
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                        <ProfileTitle>Age</ProfileTitle>
                            <ProfileField value={userData ? userData.age : ''}
                                placeholder = {user.age}
                                keyboardType='numeric'
                                placeholderTextColor="#646464"
                            onChangeText={(txt) => setUserData({...userData, age: txt})}
                                />
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                        <ProfileTitle>Previous Institution</ProfileTitle>
                            <ProfileField value={userData ? userData.prevInst : ''}
                                placeholder = {user.prevInst}
                                autoCapitalize = 'words' 
                                placeholderTextColor="#646464"
                            onChangeText={(txt) => setUserData({...userData, prevInst: txt})}
                                />
                        </ProfileInfoContainer>
                        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} keyboardVerticalOffset={75} behavior={"padding"}>
                        <ProfileInfoContainer>
                        
                        <ProfileTitle>Country</ProfileTitle>
                            <ProfileField value={userData ? userData.country : ''}
                                placeholder = {user.country}
                                autoCapitalize = 'words' 
                                placeholderTextColor="#646464"
                            onChangeText={(txt) => setUserData({...userData, country: txt})}
                                />
                                
                        </ProfileInfoContainer>
                        </KeyboardAvoidingView>
                        
                </ProfileInfo>

            </ScrollView>
            

            </View>
            
            <UpdateProfileContainer onPress = {(updatez)}>
               
                <Text bold center color = '#ffffff'>Update</Text>
           </UpdateProfileContainer>
            
        </Container>

        </DissmissKeyboard>
        
    )
}



const Container = styled.View`
    flex: 1;

`

const ProfilePhotoContainer = styled.View`
    shadow-opacity: 0.5;
    shadow-radius: 30px;
    shadow-color: #222222;
    align-items: center;
    margin-top: 30px;

`


const ProfilePhoto = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 64px;

`


const ProfileInfo = styled.View`
    margin: 20px 32px 32px;
`;

const ProfileInfoContainer = styled.View`
    margin-bottom: 20px;
`;


const ProfileTitle = styled(Text)`
    color: #8E93A1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;


const ProfileField = styled.TextInput`
    border-bottom-color: #8E93A1; 
    border-bottom-width: 0.5px;
    height: 32px;
`;


const UpdateProfileContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #222222;
    border-radius: 24px;
    margin-top: 75px;
    shadow-opacity: 0.2;
    shadow-radius: 30px;
    shadow-color: #222222;
`;

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: '#ffffff',
    size: 'small'
}))``