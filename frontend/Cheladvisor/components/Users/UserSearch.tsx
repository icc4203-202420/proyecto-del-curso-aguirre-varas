import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-elements";

import { getItem } from "../../util/Storage";
import { fetchUsers } from "../../services/users/users";
import {
  fetchFriendships,
  createFriendship,
} from "../../services/friendships/friendships";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  age: number;
  email: string;
  jti: string;
  handle: string;
};

type Friend = {
  created_at: string;
  event_id: number;
  friend_id: number;
  id: number;
  updated_at: string;
  user_id: number;
};

function Users({ searchQuery }: { searchQuery: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedUserId, setExpandedUserId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const filterUsers = (users: User[], searchQuery: string) => {
    return users.filter((user) => {
      return (
        user.id.toString() !== userId &&
        (user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.handle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  const addFriend = async (
    friendId: number,
    token: string | null,
    event_id: number
  ) => {
    try {
      await createFriendship(userId, token, event_id, friendId);
      const friendsResponse = await fetchFriendships(userId, token);
      setFriends(friendsResponse);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedToken, fetchedUserId] = await Promise.all([
          getItem("token"),
          getItem("userId"),
        ]);

        if (!fetchedToken || !fetchedUserId) {
          throw new Error("Token or userId is missing.");
        }

        setToken(fetchedToken);
        setUserId(fetchedUserId);

        const usersResponse = await fetchUsers();
        setUsers(usersResponse);

        const friendsResponse = await fetchFriendships(fetchedUserId, fetchedToken);
        setFriends(friendsResponse);
      } catch (error) {
        setErrorMessage("An error occurred while fetching data.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fileteredUsers = filterUsers(users, searchQuery);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <FlatList
          data={fileteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() =>
                  setExpandedUserId(expandedUserId === item.id ? null : item.id)
                }
              >
                <Text style={styles.userName}>
                  {item.first_name} {item.last_name}
                </Text>
                {expandedUserId === item.id && (
                  <>
                    <View>
                      <Text>Email: {item.email}</Text>
                      <Text>Handle: {item.handle}</Text>
                      <Text>Age: {item.age}</Text>
                    </View>
                    {friends.some((friend) => friend.friend_id === item.id) ? (
                      <Text style={styles.buttonText}>Friend</Text>
                    ) : (
                      <Button
                        title="Add Friend"
                        onPress={() => addFriend(item.id, token, 1)}
                        color="#8B0000" // Dark red color
                      />
                    )}
                  </>
                )}
              </TouchableOpacity>
            </Card>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userName: {
    fontSize: 24, // Larger font size for the name and surname
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#008B00", // Dark red color for the 'Add Friend' text
  },
});

export default Users;
