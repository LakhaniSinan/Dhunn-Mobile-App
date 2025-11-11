import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UpdatePlaylistModal from './UpdatePlaylistModalProps ';
import {PlaylistData} from '../../redux/slice/PlayList/types';
import {AppDispatch, RootState} from '../../redux/store';
import {createPlaylist} from '../../redux/slice/PlayList/createPlayList';
import Icon from '../atoms/Icon';
import {COLORS, FONTS, SCREENS} from '../../constants';
import {Typography} from '../atoms';
import {navigate} from '../../navigation/RootNavigation';

interface TabContentProps {
  items: PlaylistData[];
}

const PlayListContent: React.FC<TabContentProps> = ({items}) => {
  const dispatch = useDispatch<AppDispatch>();
  const playlists = useSelector((state: RootState) => state.playList.playlists);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(
    null,
  );
  const [currentPlaylistName, setCurrentPlaylistName] = useState<string>('');

  const handleCreatePlaylist = () => {
    const formData = new FormData();
    formData.append('name', playlistName);
    dispatch(createPlaylist(formData));
    setModalOpen(false);
    setPlaylistName('');
  };

  const handleEditPlaylist = (playlistId: number, playlistName: string) => {
    setSelectedPlaylistId(playlistId);
    setCurrentPlaylistName(playlistName);
    setPlaylistModalOpen(true);
  };

  const closeModal = () => {
    setPlaylistModalOpen(false);
    setSelectedPlaylistId(null);
    setCurrentPlaylistName('');
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      {playlists.length === 0 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
          <Text style={{fontSize: 16, color: '#555'}}>No playlists found.</Text>
          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={{
              marginTop: 20,
              backgroundColor: '#007BFF',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff'}}>Add Playlist</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              // navigate(SCREENS.PLAYLIST_DETAILS, {id: item.id});
              navigate(SCREENS.STACK, {
                screen: SCREENS.PLAYLIST_DETAILS,
                params: {id: item.id},
              });
            }}
            style={{flex: 1, alignItems: 'center', margin: 10}}>
            <View style={{position: 'relative'}}>
              <TouchableOpacity
                onPress={() => handleEditPlaylist(item.id, item.name)}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  zIndex: 10,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 100,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon vector="FontAwesome6" name="pen" color="#fff" size={15} />
              </TouchableOpacity>
              <Image
                source={{
                  uri: item.cover_image || 'fallback_image_url', // Provide a fallback URL for empty images
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                }}
              />
            </View>
            <Typography textType="bold" align="center" size={15}>
              {item.name}
            </Typography>
          </TouchableOpacity>
        )}
      />

      {/* Modal for creating playlist */}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalOpen(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
              width: '80%',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>
              Create New Playlist
            </Text>
            <TextInput
              value={playlistName}
              onChangeText={setPlaylistName}
              placeholder="Playlist Name"
              style={{
                height: 40,
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 10,
                marginBottom: 20,
              }}
            />
            <TouchableOpacity
              onPress={handleCreatePlaylist}
              style={{
                backgroundColor: '#007BFF',
                paddingVertical: 10,
                borderRadius: 5,
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>Create Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              style={{
                marginTop: 10,
                alignItems: 'center',
                paddingVertical: 5,
                backgroundColor: '#ccc',
                borderRadius: 5,
              }}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for updating playlist */}
      {isPlaylistModalOpen && selectedPlaylistId && (
        <UpdatePlaylistModal
          isOpen={isPlaylistModalOpen}
          onClose={closeModal}
          playlistId={selectedPlaylistId}
          currentName={currentPlaylistName}
        />
      )}
    </View>
  );
};

export default PlayListContent;
