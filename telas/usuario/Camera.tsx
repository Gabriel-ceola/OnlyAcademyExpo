import React, { useRef, useState } from 'react';
import { CameraView } from 'expo-camera';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import supabase from '../../supabase'; 
import { decode } from 'base64-arraybuffer'

const Camera = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = MediaLibrary.usePermissions();
    const cameraRef = useRef<CameraView>(null);

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

    const enviaFoto = async () => {
        if (cameraRef.current) {
            const photoData = await cameraRef.current.takePictureAsync();
            if (photoData) {
                const formData = new FormData();
                formData.append('photo', {
                  uri: photoData.uri,
                  name: 'photo.jpg',
                  type: 'image/jpeg',
                } as any);

                const fileExt = photoData.uri.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `public/${fileName}`;
                
                const { data, error } = await supabase
                    .storage
                    .from('imagens')
                    .upload(filePath, formData, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: photoData.base64,
                    });
        
                if (error) {
                    console.error('Erro ao enviar a imagem ao Supabase:', error);
                } else {
                    console.log('Imagem salva com sucesso:', data);
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraFacing}>
                        <Text style={styles.flipCameraButtonText}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.takePhotoButton} onPress={enviaFoto}>
                        <Text style={styles.takePhotoButtonText}>Take Photo</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        justifyContent: 'space-around',
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
    takePhotoButton: {
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    takePhotoButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Camera;
