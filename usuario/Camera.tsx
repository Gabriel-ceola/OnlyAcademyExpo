import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Camera = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <CameraView style={styles.camera} facing={facing}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraFacing}>
                    <Text style={styles.flipCameraButtonText}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    camera: {
        flex: 1,
    },
    cameraButtonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    flipCameraButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    flipCameraButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Camera;
