/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const UserProfile = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(prevState => !prevState);
    };

    const openCamera = () => {
        setIsCameraOpen(true);
    };

    const closeCamera = () => {
        setIsCameraOpen(false);
    };

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} />
            <Text style={styles.username}>Nome</Text>
            <Text style={styles.bio}>Bio do usuário</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.stats}>Seguindo 9856</Text>
                <Text style={styles.stats}>Seguidores 1M</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.followButton,
                    { backgroundColor: isFollowing ? 'gray' : 'blue' },
                ]}
                onPress={toggleFollow}>
                <Text style={styles.followButtonText}>
                    {isFollowing ? 'Deixar de Seguir' : 'Seguir'}
                </Text>
            </TouchableOpacity>
            <CameraView style={styles.camera}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    bio: {
        marginTop: 5,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    stats: {
        marginRight: 20,
    },
    followButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    bottomButtonsContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'column',
    },
    openCameraButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    openCameraButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeCameraButton: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    closeCameraButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    flipCameraButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    flipCameraButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 128,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        marginBottom: 100,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default UserProfile;
