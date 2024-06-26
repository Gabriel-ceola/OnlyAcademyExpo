import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} />
            <Text style={styles.username}>Nome do Usuário</Text>
            <Text style={styles.bio}>Descrição do perfil do usuário. Aqui você pode escrever algo interessante sobre você.</Text>
            <View style={styles.statsContainer}>
                <Text style={styles.stats}>Seguindo: 9856</Text>
                <Text style={styles.stats}>Seguidores: 1M</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
                    <Text style={styles.editButtonText}>{isEditing ? 'Salvar' : 'Editar Perfil'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.settingsButtonText}>Configurações</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.photosContainer}>
                <Image style={styles.photo} />
                <Image style={styles.photo} />
                <Image style={styles.photo} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        textAlign: 'center',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    stats: {
        marginRight: 20,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    settingsButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    settingsButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10, // Espaço interno horizontal
        marginTop: 20, // Espaço acima do container
    },
    photo: {
        width: 100,
        height: 100,
        marginVertical: 5, // Espaço vertical entre as fotos
        borderRadius: 5, // Borda arredondada
    },
});

export default UserProfile;
