import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { postEventPicture } from "../../services/event_pictures/eventPictures";
import { getItem } from "../../util/Storage";
import { palette } from "../../assets/palette";

const UploadEventPicture = ({
  selectedEvent,
}: {
  selectedEvent: string | string[];
}) => {
  const [open, setOpen] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
    setPictureUrl("");
    setDescription("");
    setBase64Image(null);
  };

  const handleFileChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setPictureUrl(asset.uri);
      setFile(asset);
      setBase64Image(asset.base64 ?? null);
    }
  };

  const handleUpload = async () => {
    if (!base64Image || !description) {
      console.error("Please provide a valid image and description.");
      return;
    }
    const token = await getItem("token");
    console.log(base64Image.substring(0, 100));
    const base64ImageWithPrefix = `data:image/png;base64,${base64Image}`;
    try {
      const response = await postEventPicture(
        selectedEvent,
        base64ImageWithPrefix,
        token,
        description
      );
      console.log(response);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Add Picture" onPress={handleOpen} />
      <Modal visible={open} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "#db9",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              Upload Picture
            </Text>
            <TouchableOpacity onPress={handleFileChange}>
              <Text style={{ color: palette.amber, marginBottom: 10 }}>
                Choose Picture
              </Text>
            </TouchableOpacity>
            {file && (
              <Image
                source={{ uri: file.uri }}
                style={{ width: 100, height: 100, marginBottom: 10 }}
              />
            )}
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button color={palette.amber} title="Cancel" onPress={handleClose} />
              <Button color={palette.amber} title="Upload" onPress={handleUpload} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UploadEventPicture;
